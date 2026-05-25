"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { FlowerOfLifeGlyph, PhilosopherStoneGlyph } from "../components/Sigil";
import { EsotericBioPanel } from "../components/home/EsotericBioPanel";
import { HeroPanel } from "../components/home/HeroPanel";
import { WorkHistoryPanel } from "../components/home/WorkHistoryPanel";
import {
  bioInterests,
  promotionTracks,
  sectionOrder,
  type SectionId,
} from "../lib/home-content";
import { socialLinks } from "../lib/links";

type NavWithHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

type AlchemyTrailGlyph = {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  rotate: number;
  durationMs: number;
  opacity: number;
};

type AlchemyTrailRuntimeGlyph = AlchemyTrailGlyph & {
  expiresAt: number;
};

type PerformanceHudSnapshot = {
  fps: number;
  lowFps: number;
  avgFrameMs: number;
  slowFramePct: number;
  appAgeSec: number;
  refreshHz: number;
  fpsNormalized: number;
};

type RuntimeLogEntry = {
  id: number;
  at: number;
  level: "info" | "warn";
  emphasis: "normal" | "highlight";
  message: string;
};

type SigilDensity = "ultra-low" | "low" | "base" | "high" | "ultra";

const matrixNoiseChars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*+-/<>[]{}";
const matrixNoiseFavoredChars = "111333333357";
const matrixNoiseSeed = "SIGNALVECTOR";
const matrixNoiseLength = 12;
const staticGlitchChars = "01[]{}<>#@!$%/\\|+-=*";
const signalFaultMessages = [
  "SYNC LOST // SEGMENT 03",
  "PROCESS INTERRUPTED // 5-7",
  "ERROR 333 // SIGNAL DESYNC",
  "HALT 111 // RECOVERING",
  "FRAME BREAK // RESUME 33",
];

const runtimeHighlightPattern =
  /(fault|interruption|target profile|main profile|tuning effects down|sigil detail reduced|access denied|perf sample|load |sanctuary|stabilize|restored visual complexity)/i;

type PerformanceHudProps = {
  activeSection: SectionId;
  introPhase: "active" | "dismissing" | "done";
  trailEnabled: boolean;
  scrolling: boolean;
  sanctuaryInvoked: boolean;
  snapshot: PerformanceHudSnapshot;
  glitchLevel: "low" | "base" | "high";
};

type RuntimeConsoleProps = {
  logs: RuntimeLogEntry[];
  mode: "hero" | "floating";
};

const sectionGlyphCountsByDensity = {
  low: { hero: 4, history: 6, esoteric: 6 },
  base: { hero: 6, history: 9, esoteric: 9 },
  high: { hero: 8, history: 12, esoteric: 12 },
} as const;

const trailProfileByDensity = {
  low: { maxTrailGlyphs: 10, burstModifier: -1 },
  base: { maxTrailGlyphs: 18, burstModifier: 0 },
  high: { maxTrailGlyphs: 28, burstModifier: 1 },
} as const;

const sigilProfileByDensity = {
  "ultra-low": { flower: 19, rays: 16, ticks: 16, outerTicks: 5, alchemy: 4 },
  low: { flower: 19, rays: 18, ticks: 18, outerTicks: 6, alchemy: 4 },
  base: { flower: 19, rays: 20, ticks: 20, outerTicks: 7, alchemy: 5 },
  high: { flower: 19, rays: 22, ticks: 22, outerTicks: 8, alchemy: 6 },
  ultra: { flower: 19, rays: 24, ticks: 24, outerTicks: 8, alchemy: 6 },
} as const;

const alchemyTrailSymbols = ["🜂", "🜁", "🜃", "🜄", "🜍", "🜔"];

function AlchemyMouseTrail({
  enabled,
  density,
}: {
  enabled: boolean;
  density: "low" | "base" | "high";
}) {
  const [glyphs, setGlyphs] = useState<AlchemyTrailGlyph[]>([]);
  const nextGlyphIdRef = useRef(1);

  useEffect(() => {
    if (!enabled) {
      setGlyphs([]);
      return;
    }

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let pruneFrameId = 0;
    let activeGlyphs: AlchemyTrailRuntimeGlyph[] = [];

    const syncGlyphs = () => {
      setGlyphs(activeGlyphs.slice());
    };

    const startPruneLoop = () => {
      if (pruneFrameId) {
        return;
      }

      const prune = () => {
        pruneFrameId = 0;
        if (activeGlyphs.length === 0) {
          return;
        }

        const now = performance.now();
        const nextGlyphs = activeGlyphs.filter(
          (glyph) => glyph.expiresAt > now,
        );
        if (nextGlyphs.length !== activeGlyphs.length) {
          activeGlyphs = nextGlyphs;
          syncGlyphs();
        }

        if (activeGlyphs.length > 0) {
          pruneFrameId = requestAnimationFrame(prune);
        }
      };

      pruneFrameId = requestAnimationFrame(prune);
    };

    const emitGlyphs = (
      x: number,
      y: number,
      velocityX: number,
      velocityY: number,
      speed: number,
    ) => {
      const baseBurstCount = speed > 2.8 ? 3 : speed > 1.4 ? 2 : 1;
      const burstCount =
        density === "low"
          ? Math.max(1, baseBurstCount - 1)
          : density === "high"
            ? Math.min(4, baseBurstCount + 1)
            : baseBurstCount;
      const maxTrailGlyphs =
        density === "low" ? 10 : density === "high" ? 28 : 18;

      const baseAngle = Math.atan2(velocityY, velocityX) + Math.PI;
      const createdAt = performance.now();
      const newGlyphs: AlchemyTrailRuntimeGlyph[] = [];

      for (let burst = 0; burst < burstCount; burst += 1) {
        const id = nextGlyphIdRef.current;
        nextGlyphIdRef.current += 1;

        const angleJitter = (Math.random() - 0.5) * 1.3;
        const angle = baseAngle + angleJitter;
        const driftMag = 24 + Math.min(108, speed * 74) + Math.random() * 30;
        const durationMs = 820 + Math.floor(Math.random() * 360);
        const glyph: AlchemyTrailRuntimeGlyph = {
          id,
          symbol:
            alchemyTrailSymbols[
              Math.floor(Math.random() * alchemyTrailSymbols.length)
            ],
          x,
          y,
          size: 20 + Math.random() * 12,
          driftX: Math.cos(angle) * driftMag,
          driftY: Math.sin(angle) * driftMag,
          rotate: -40 + Math.random() * 160,
          durationMs,
          opacity: 0.72 + Math.random() * 0.24,
          expiresAt: createdAt + durationMs + 56,
        };

        newGlyphs.push(glyph);
      }

      activeGlyphs = [...activeGlyphs, ...newGlyphs].slice(-maxTrailGlyphs);
      syncGlyphs();
      startPruneLoop();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      const now = performance.now();
      if (lastTime === 0) {
        lastX = event.clientX;
        lastY = event.clientY;
        lastTime = now;
        return;
      }

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const dt = Math.max(1, now - lastTime);
      const distance = Math.hypot(dx, dy);

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;

      if (distance < 6 || dt < 8) {
        return;
      }

      const speed = distance / dt;
      emitGlyphs(event.clientX, event.clientY, dx, dy, speed);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (pruneFrameId) {
        cancelAnimationFrame(pruneFrameId);
      }
      activeGlyphs = [];
      setGlyphs([]);
    };
  }, [enabled, density]);

  if (!enabled || glyphs.length === 0) {
    return null;
  }

  return (
    <div className="alchemy-mouse-trail" aria-hidden="true">
      {glyphs.map((glyph) => (
        <span
          key={glyph.id}
          className="alchemy-mouse-trail__glyph"
          style={
            {
              left: `${glyph.x}px`,
              top: `${glyph.y}px`,
              "--glyph-size": `${glyph.size}px`,
              "--glyph-drift-x": `${glyph.driftX.toFixed(2)}px`,
              "--glyph-drift-y": `${glyph.driftY.toFixed(2)}px`,
              "--glyph-rotate": `${glyph.rotate.toFixed(2)}deg`,
              "--glyph-duration": `${glyph.durationMs}ms`,
              "--glyph-opacity": glyph.opacity.toFixed(3),
            } as CSSProperties
          }
        >
          {glyph.symbol}
        </span>
      ))}
    </div>
  );
}

function PerformanceHud({
  activeSection,
  introPhase,
  trailEnabled,
  scrolling,
  sanctuaryInvoked,
  snapshot,
  glitchLevel,
}: PerformanceHudProps) {
  const historyCorpus = useMemo(
    () =>
      promotionTracks
        .map((track) => {
          const stageText = track.stages
            .map((stage) => `${stage.period} ${stage.role}`)
            .join(". ");
          return `${track.company}. ${stageText}`;
        })
        .join(". "),
    [],
  );
  const esotericCorpus = useMemo(() => bioInterests.join(". "), []);
  const historyStartYear = useMemo(() => {
    let minYear = Number.POSITIVE_INFINITY;
    for (const track of promotionTracks) {
      for (const stage of track.stages) {
        const match = stage.period.match(/(\d{4})/);
        if (!match) {
          continue;
        }
        const year = Number(match[1]);
        if (Number.isFinite(year)) {
          minYear = Math.min(minYear, year);
        }
      }
    }
    if (!Number.isFinite(minYear)) {
      return new Date().getFullYear();
    }
    return minYear;
  }, []);
  const historyCompanyCount = promotionTracks.length;
  const historyRoleCount = useMemo(
    () =>
      promotionTracks.reduce((total, track) => total + track.stages.length, 0),
    [],
  );
  const historyExperienceYears = Math.max(
    0,
    new Date().getFullYear() - historyStartYear,
  );
  const esotericWordCount = useMemo(
    () =>
      esotericCorpus
        .split(/\s+/)
        .map((word) => word.trim())
        .filter(Boolean).length,
    [esotericCorpus],
  );
  const [matrixNoise, setMatrixNoise] = useState("SIGNALVECTOR-");

  useEffect(() => {
    if (activeSection === "hero") {
      setMatrixNoise("SIGNALVECTOR-");
      return;
    }

    const noiseCadenceMs =
      glitchLevel === "low" ? 360 : glitchLevel === "base" ? 220 : 120;

    const timer = window.setInterval(() => {
      setMatrixNoise((current) => {
        const source =
          current.length === matrixNoiseLength
            ? current.split("")
            : `${matrixNoiseSeed}-`.split("");
        const baseline = `${matrixNoiseSeed}-`.split("");
        const swapCount =
          glitchLevel === "low"
            ? 1 + Math.floor(Math.random() * 2)
            : glitchLevel === "base"
              ? 2 + Math.floor(Math.random() * 2)
              : 2 + Math.floor(Math.random() * 4);

        // Revert a couple of positions toward the baseline so replacement is visible.
        for (let i = 0; i < 2; i += 1) {
          const revertIndex = Math.floor(Math.random() * matrixNoiseLength);
          source[revertIndex] = baseline[revertIndex];
        }

        for (let i = 0; i < swapCount; i += 1) {
          const index = Math.floor(Math.random() * matrixNoiseLength);
          const useFavored = Math.random() < 0.66;
          const pool = useFavored ? matrixNoiseFavoredChars : matrixNoiseChars;
          source[index] = pool[Math.floor(Math.random() * pool.length)];
        }

        const tokenChance = glitchLevel === "low" ? 0.12 : 0.35;
        if (Math.random() < tokenChance) {
          const tokens = ["33", "33", "357", "111", "111", "333", "333", "666"];
          const token = tokens[Math.floor(Math.random() * tokens.length)];
          const start = Math.max(
            0,
            Math.floor(Math.random() * (matrixNoiseLength - token.length + 1)),
          );
          for (let i = 0; i < token.length; i += 1) {
            source[start + i] = token[i];
          }
        }

        return source.join("");
      });
    }, noiseCadenceMs);

    return () => window.clearInterval(timer);
  }, [activeSection, glitchLevel]);

  const sectionLabel =
    activeSection === "hero"
      ? "MAIN"
      : activeSection === "history"
        ? "WORK"
        : "DOSSIER";
  const appState = scrolling ? "SCROLLING" : "IDLE";
  const sanctuaryState = sanctuaryInvoked ? "INVOKED" : "DORMANT";
  const sectionCorpus =
    activeSection === "history"
      ? historyCorpus
      : activeSection === "esoteric"
        ? esotericCorpus
        : "";
  const corpusChars = sectionCorpus.length;
  const corpusSentences = sectionCorpus
    .split(/[.!?]+/)
    .map((line) => line.trim())
    .filter(Boolean).length;
  const showContentStats = activeSection !== "hero";
  const showStateStats = activeSection !== "hero";

  return (
    <>
      <div className="perf-hud perf-hud--perf" aria-live="polite">
        <span className="perf-hud__metric">FPS {snapshot.fps}</span>
        <span className="perf-hud__metric">REF {snapshot.refreshHz}</span>
        <span className="perf-hud__metric">LOW {snapshot.lowFps}</span>
        <span className="perf-hud__metric">MS {snapshot.avgFrameMs}</span>
        <span className="perf-hud__metric">GLITCH {glitchLevel}</span>
      </div>
      {showStateStats && (
        <div className="perf-hud perf-hud--state" aria-hidden="true">
          <span className="perf-hud__metric">SEC {sectionLabel}</span>
          <span className="perf-hud__metric">
            PHASE {introPhase.toUpperCase()}
          </span>
          <span className="perf-hud__metric">APP {appState}</span>
          <span className="perf-hud__metric">
            TRAIL {trailEnabled ? "ON" : "OFF"}
          </span>
          <span className="perf-hud__metric">AGE {snapshot.appAgeSec}s</span>
          <span className="perf-hud__metric">SANCT {sanctuaryState}</span>
        </div>
      )}
      {showContentStats && (
        <div className="perf-hud perf-hud--content" aria-hidden="true">
          {activeSection === "history" ? (
            <>
              <span className="perf-hud__metric">
                EXP {historyExperienceYears}Y
              </span>
              <span className="perf-hud__metric">CO {historyCompanyCount}</span>
              <span className="perf-hud__metric">ROLES {historyRoleCount}</span>
              <span className="perf-hud__metric perf-hud__metric--noise">
                NOISE {matrixNoise}
              </span>
            </>
          ) : (
            <>
              <span className="perf-hud__metric">
                NOTES {bioInterests.length}
              </span>
              <span className="perf-hud__metric">
                WORDS {esotericWordCount}
              </span>
              <span className="perf-hud__metric">SENT {corpusSentences}</span>
              <span className="perf-hud__metric">CHARS {corpusChars}</span>
              <span className="perf-hud__metric perf-hud__metric--noise">
                NOISE {matrixNoise}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}

function RuntimeConsole({ logs, mode }: RuntimeConsoleProps) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    list.scrollTop = list.scrollHeight;
  }, [logs, mode]);

  return (
    <aside
      className={`runtime-console runtime-console--${mode}`}
      aria-live="polite"
      aria-label="Runtime console"
    >
      <div className="runtime-console__header">
        <span className="runtime-console__title">Runtime Console</span>
        <span className="runtime-console__meta">LIVE</span>
      </div>
      <ol
        ref={listRef}
        className="runtime-console__list"
        aria-label="Recent runtime events"
      >
        {logs.map((entry) => {
          const stamp = new Date(entry.at).toLocaleTimeString([], {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          return (
            <li
              key={entry.id}
              className={`runtime-console__line runtime-console__line--${entry.level}${entry.emphasis === "highlight" ? " runtime-console__line--highlight" : ""}`}
            >
              <span className="runtime-console__time">{stamp}</span>
              <span className="runtime-console__text">
                {entry.emphasis === "highlight" && (
                  <span className="runtime-console__mark" aria-hidden="true">
                    ##
                  </span>
                )}
                <span>{entry.message}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

export default function Home() {
  const sectionStackRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const historySectionRef = useRef<HTMLElement>(null);
  const esotericSectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotionRef = useRef(false);
  const activeSectionRef = useRef<SectionId>("hero");
  const navLockRef = useRef(false);
  const acaciaRevealTimerRef = useRef(0);
  const acaciaLastScrollAtRef = useRef(0);
  const acaciaSettleFrameRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const sanctuaryRef = useRef<HTMLDivElement>(null);
  const [perfLite, setPerfLite] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [sanctuaryInvoked, setSanctuaryInvoked] = useState(false);
  const [sanctuaryCharge, setSanctuaryCharge] = useState(0);
  const [introPhase, setIntroPhase] = useState<
    "active" | "dismissing" | "done"
  >("active");
  const [signalFault, setSignalFault] = useState(false);
  const [signalFaultMessage, setSignalFaultMessage] = useState(
    signalFaultMessages[0],
  );
  const [perfSnapshot, setPerfSnapshot] = useState<PerformanceHudSnapshot>({
    fps: 0,
    lowFps: 0,
    avgFrameMs: 0,
    slowFramePct: 0,
    appAgeSec: 0,
    refreshHz: 60,
    fpsNormalized: 1,
  });
  const [glyphDensity, setGlyphDensity] = useState<"low" | "base" | "high">(
    "high",
  );
  const [glitchLevel, setGlitchLevel] = useState<"low" | "base" | "high">(
    "high",
  );
  const [sigilDensity, setSigilDensity] = useState<SigilDensity>("ultra");
  const [runtimeLogs, setRuntimeLogs] = useState<RuntimeLogEntry[]>([]);
  const [runtimeConsoleHeroMode, setRuntimeConsoleHeroMode] = useState<
    "hero" | "floating"
  >("hero");
  const perfSignalRef = useRef(1);
  const trendRef = useRef<"up" | "down" | "flat">("flat");
  const trendSamplesRef = useRef(0);
  const holdUntilRef = useRef(0);
  const sigilTrendRef = useRef<"up" | "down" | "flat">("flat");
  const sigilTrendSamplesRef = useRef(0);
  const sigilHoldUntilRef = useRef(0);
  const logIdRef = useRef(1);
  const chargingLoggedRef = useRef(false);
  const refreshBandRef = useRef<number>(60);
  const prevVisibleSectionGlyphsRef = useRef<number | null>(null);
  const prevSigilComplexityRef = useRef<number | null>(null);
  const lastTelemetryLogAtRef = useRef(0);
  const lastTargetModeRef = useRef<"main" | "non-main">("main");
  const lastControlTargetRef = useRef(60);

  const appendRuntimeLog = useCallback(
    (message: string, level: "info" | "warn" = "info") => {
      const nextId = logIdRef.current;
      logIdRef.current += 1;
      const emphasis: RuntimeLogEntry["emphasis"] =
        level === "warn" || runtimeHighlightPattern.test(message)
          ? "highlight"
          : "normal";
      const entry: RuntimeLogEntry = {
        id: nextId,
        at: Date.now(),
        level,
        emphasis,
        message,
      };
      setRuntimeLogs((current) => [...current, entry].slice(-10));
    },
    [],
  );
  const personJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Christopher Hernandez",
      url: "https://skate.dev",
      sameAs: socialLinks.map((link) => link.href),
      jobTitle: "Senior Software Engineer II",
      worksFor: {
        "@type": "Organization",
        name: "Tempus AI",
        url: "https://www.tempus.com/",
      },
      description:
        "Senior Software Engineer II focused on hard systems problems, platform architecture, and resilient product delivery.",
    }),
    [],
  );
  const personJsonLdHtml = useMemo(
    () => JSON.stringify(personJsonLd),
    [personJsonLd],
  );

  useEffect(() => {
    const navigatorHints = navigator as NavWithHints;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const syncPerfMode = () => {
      const params = new URLSearchParams(window.location.search);
      const manualLite = params.get("perf") === "lite";
      const mobileWidth = window.matchMedia("(max-width: 860px)").matches;
      const saveData = Boolean(navigatorHints.connection?.saveData);
      const lowCpu =
        navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
      const lowMemory =
        typeof navigatorHints.deviceMemory === "number" &&
        navigatorHints.deviceMemory <= 4;

      prefersReducedMotionRef.current = reducedMotionQuery.matches;
      setPerfLite(
        manualLite ||
          mobileWidth ||
          reducedMotionQuery.matches ||
          saveData ||
          lowCpu ||
          lowMemory,
      );
    };

    syncPerfMode();
    reducedMotionQuery.addEventListener("change", syncPerfMode);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncPerfMode);
    };
  }, []);

  useEffect(() => {
    if (perfLite) {
      setIntroPhase("done");
      return;
    }
    const dismissTimer = window.setTimeout(() => {
      setIntroPhase("dismissing");
    }, 3600);
    return () => window.clearTimeout(dismissTimer);
  }, [perfLite]);

  useEffect(() => {
    if (introPhase !== "dismissing") {
      return;
    }

    const finalizeTimer = window.setTimeout(() => {
      setIntroPhase("done");
    }, 980);

    return () => window.clearTimeout(finalizeTimer);
  }, [introPhase]);

  useEffect(() => {
    appendRuntimeLog(
      "Runtime monitor online. Adaptive effect controller active.",
    );
  }, [appendRuntimeLog]);

  useEffect(() => {
    let frameId = 0;
    let sampleStart = performance.now();
    let previousFrameAt = sampleStart;
    let frames = 0;
    let totalFrameMs = 0;
    let slowFrames = 0;
    let lowFps = Number.POSITIVE_INFINITY;
    let estimatedRefreshHz = 60;
    const frameMsHistory: number[] = [];
    const appStart = sampleStart;

    const sample = (now: number) => {
      const frameMs = now - previousFrameAt;
      previousFrameAt = now;

      if (frameMs > 2 && frameMs < 100) {
        frameMsHistory.push(frameMs);
        if (frameMsHistory.length > 180) {
          frameMsHistory.shift();
        }
      }

      frames += 1;
      totalFrameMs += frameMs;
      if (frameMs > 19.5) {
        slowFrames += 1;
      }

      if (now - sampleStart >= 500) {
        const elapsed = now - sampleStart;
        const fps = Math.round((frames * 1000) / elapsed);
        lowFps = Math.min(lowFps, fps);

        if (frameMsHistory.length >= 15) {
          const sorted = [...frameMsHistory].sort((a, b) => a - b);
          const medianMs = sorted[Math.floor(sorted.length / 2)] ?? 16.67;
          const measuredHz = Math.max(24, Math.min(240, 1000 / medianMs));
          estimatedRefreshHz = estimatedRefreshHz * 0.82 + measuredHz * 0.18;
        }

        const refreshBand = Math.round(estimatedRefreshHz / 5) * 5;
        if (Math.abs(refreshBand - refreshBandRef.current) >= 10) {
          refreshBandRef.current = refreshBand;
          appendRuntimeLog(`Display cadence now estimates ~${refreshBand}Hz.`);
        }

        const sectionTargetFps =
          activeSectionRef.current === "hero"
            ? 60
            : Math.min(240, estimatedRefreshHz);
        const controlTargetFps = Math.max(
          30,
          Math.min(sectionTargetFps, estimatedRefreshHz),
        );
        const hudFps =
          activeSectionRef.current === "hero"
            ? Math.min(fps, Math.round(controlTargetFps))
            : fps;
        const targetMode: "main" | "non-main" =
          activeSectionRef.current === "hero" ? "main" : "non-main";

        if (
          targetMode !== lastTargetModeRef.current ||
          Math.abs(controlTargetFps - lastControlTargetRef.current) >= 5
        ) {
          appendRuntimeLog(
            targetMode === "main"
              ? `Target profile MAIN // soft cap ${Math.round(controlTargetFps)} FPS.`
              : `Target profile NON-MAIN // soft cap ${Math.round(controlTargetFps)} FPS (min(display, 240)).`,
          );
          lastTargetModeRef.current = targetMode;
          lastControlTargetRef.current = controlTargetFps;
        }

        const normalizedFps = Math.max(0, Math.min(1, fps / controlTargetFps));
        perfSignalRef.current =
          perfSignalRef.current * 0.84 + normalizedFps * 0.16;

        const smoothed = perfSignalRef.current;
        const inTargetBand =
          fps >= controlTargetFps - 1 && fps <= controlTargetFps + 2;
        const direction: "up" | "down" | "flat" =
          smoothed >= 0.985 && smoothed <= 1.03
            ? "up"
            : smoothed <= 0.91
              ? "down"
              : "flat";

        if (direction === trendRef.current) {
          trendSamplesRef.current += 1;
        } else {
          trendRef.current = direction;
          trendSamplesRef.current = direction === "flat" ? 0 : 1;
        }

        const canStep =
          now >= holdUntilRef.current && trendSamplesRef.current >= 3;

        if (canStep && direction !== "flat") {
          if (direction === "down") {
            setGlyphDensity((currentDensity) => {
              const nextDensity =
                currentDensity === "high"
                  ? "base"
                  : currentDensity === "base"
                    ? "low"
                    : "low";
              if (nextDensity !== currentDensity) {
                appendRuntimeLog(
                  `Tuning effects down (${currentDensity} -> ${nextDensity}) to stabilize frame cadence.`,
                  "warn",
                );
              }
              return nextDensity;
            });

            setGlitchLevel((currentLevel) => {
              const nextLevel =
                currentLevel === "high"
                  ? "base"
                  : currentLevel === "base"
                    ? "low"
                    : "low";
              return nextLevel;
            });
          } else if (direction === "up") {
            setGlyphDensity((currentDensity) => {
              const nextDensity =
                currentDensity === "low"
                  ? "base"
                  : currentDensity === "base" && inTargetBand
                    ? "high"
                    : currentDensity;
              if (nextDensity !== currentDensity) {
                appendRuntimeLog(
                  `Frame cadence recovered (${currentDensity} -> ${nextDensity}), restoring visual complexity.`,
                );
              }
              return nextDensity;
            });

            setGlitchLevel((currentLevel) => {
              const nextLevel =
                currentLevel === "low"
                  ? "base"
                  : currentLevel === "base" && inTargetBand
                    ? "high"
                    : currentLevel;
              return nextLevel;
            });
          }

          holdUntilRef.current = now + 4200;
          trendSamplesRef.current = 0;
        }

        const sigilDirection: "up" | "down" | "flat" =
          smoothed >= 0.995 && smoothed <= 1.02
            ? "up"
            : smoothed <= 0.935
              ? "down"
              : "flat";

        if (sigilDirection === sigilTrendRef.current) {
          sigilTrendSamplesRef.current += 1;
        } else {
          sigilTrendRef.current = sigilDirection;
          sigilTrendSamplesRef.current = sigilDirection === "flat" ? 0 : 1;
        }

        const canStepSigilDown =
          now >= sigilHoldUntilRef.current &&
          sigilDirection === "down" &&
          sigilTrendSamplesRef.current >= 5;
        const canStepSigilUp =
          now >= sigilHoldUntilRef.current &&
          sigilDirection === "up" &&
          sigilTrendSamplesRef.current >= 7;

        if (canStepSigilDown || canStepSigilUp) {
          setSigilDensity((currentDensity) => {
            const sigilLevels: SigilDensity[] = [
              "ultra-low",
              "low",
              "base",
              "high",
            ];
            const currentIndex = sigilLevels.indexOf(currentDensity);
            const nextIndex = canStepSigilDown
              ? Math.max(0, currentIndex - 1)
              : Math.min(sigilLevels.length - 1, currentIndex + 1);
            const nextDensity = sigilLevels[nextIndex];

            if (nextDensity !== currentDensity) {
              appendRuntimeLog(
                canStepSigilDown
                  ? `Sigil detail reduced (${currentDensity} -> ${nextDensity}) for smoother frame pacing.`
                  : `Sigil detail restored (${currentDensity} -> ${nextDensity}) after stable cadence.`,
                canStepSigilDown ? "warn" : "info",
              );
            }

            return nextDensity;
          });

          sigilHoldUntilRef.current = canStepSigilDown
            ? now + 9000
            : now + 12000;
          sigilTrendSamplesRef.current = 0;
        }

        setPerfSnapshot({
          fps: hudFps,
          lowFps: Number.isFinite(lowFps) ? lowFps : fps,
          avgFrameMs: Number((totalFrameMs / frames).toFixed(1)),
          slowFramePct: Math.round((slowFrames / frames) * 100),
          appAgeSec: Math.max(0, Math.floor((now - appStart) / 1000)),
          refreshHz: Number(estimatedRefreshHz.toFixed(1)),
          fpsNormalized: Number((smoothed * 100).toFixed(1)),
        });

        if (now - lastTelemetryLogAtRef.current >= 6000) {
          lastTelemetryLogAtRef.current = now;
          appendRuntimeLog(
            `Perf sample // HUD FPS ${fps}, AVG ${Number((totalFrameMs / frames).toFixed(1))}ms, TARGET ${Math.round(controlTargetFps)}, LOAD ${Number((smoothed * 100).toFixed(1))}%.`,
          );
        }

        sampleStart = now;
        frames = 0;
        totalFrameMs = 0;
        slowFrames = 0;
      }

      frameId = requestAnimationFrame(sample);
    };

    frameId = requestAnimationFrame(sample);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [appendRuntimeLog]);

  useEffect(() => {
    appendRuntimeLog(
      `Section changed to ${activeSection.toUpperCase()}. ${
        activeSection === "hero"
          ? "Idle near sanctuary gate."
          : "Scroll navigation active."
      }`,
    );
  }, [activeSection, appendRuntimeLog]);

  useEffect(() => {
    if (activeSection !== "hero") {
      return;
    }

    // Main section should always restore full sigil scale/profile immediately.
    setSigilDensity("ultra");
    setGlyphDensity("high");
    setGlitchLevel("high");
    appendRuntimeLog(
      "Main profile restored // sigil at full scale, field density high, target 60 FPS.",
    );
  }, [activeSection, appendRuntimeLog]);

  useEffect(() => {
    appendRuntimeLog(`Glitch mode set to ${glitchLevel.toUpperCase()}.`);
  }, [glitchLevel, appendRuntimeLog]);

  useEffect(() => {
    const profile = sectionGlyphCountsByDensity[glyphDensity];
    const alwaysVisible = profile.history + profile.esoteric;
    const heroVisible = activeSection === "hero" ? profile.hero : 0;
    const visibleSectionGlyphs = alwaysVisible + heroVisible;
    const previousVisible = prevVisibleSectionGlyphsRef.current;
    if (typeof previousVisible === "number") {
      const delta = visibleSectionGlyphs - previousVisible;
      if (delta > 0) {
        appendRuntimeLog(
          `Glyph allocator added ${delta} field glyphs (visible ${visibleSectionGlyphs}).`,
        );
      } else if (delta < 0) {
        appendRuntimeLog(
          `Glyph allocator removed ${Math.abs(delta)} field glyphs (visible ${visibleSectionGlyphs}).`,
          "warn",
        );
      }
    }
    prevVisibleSectionGlyphsRef.current = visibleSectionGlyphs;

    const trailProfile = trailProfileByDensity[glyphDensity];
    const burstDescriptor =
      trailProfile.burstModifier > 0
        ? `+${trailProfile.burstModifier}`
        : `${trailProfile.burstModifier}`;
    appendRuntimeLog(
      `Glyph density ${glyphDensity.toUpperCase()} // field ${visibleSectionGlyphs} visible, trail cap ${trailProfile.maxTrailGlyphs}, burst modifier ${burstDescriptor}.`,
    );
  }, [glyphDensity, activeSection, appendRuntimeLog]);

  useEffect(() => {
    const profile = sigilProfileByDensity[sigilDensity];
    const complexity =
      profile.flower +
      profile.rays +
      profile.ticks +
      profile.outerTicks +
      profile.alchemy;
    const previousComplexity = prevSigilComplexityRef.current;
    if (typeof previousComplexity === "number") {
      const delta = complexity - previousComplexity;
      if (delta > 0) {
        appendRuntimeLog(`Sigil compositor added ${delta} primitives.`, "info");
      } else if (delta < 0) {
        appendRuntimeLog(
          `Sigil compositor removed ${Math.abs(delta)} primitives.`,
          "warn",
        );
      }
    }
    prevSigilComplexityRef.current = complexity;

    appendRuntimeLog(
      `Sigil detail ${sigilDensity.toUpperCase()} // flower ${profile.flower}, rays ${profile.rays}, ticks ${profile.ticks}, outer ${profile.outerTicks}, alchemy ${profile.alchemy}.`,
    );
  }, [sigilDensity, appendRuntimeLog]);

  useEffect(() => {
    if (introPhase !== "done") {
      return;
    }

    const ambientLogs = [
      "Divine intervention handshake accepted by outer ring.",
      "Universal consciousness uplink negotiating symbol bandwidth.",
      "Uninvited process probing perimeter sigils... sandboxed.",
      "Reality checksum drift detected. Re-anchoring local timeline.",
      "Noosphere stream synchronized. Recursive insight latency nominal.",
      "Unauthorized daemon chanting in /dev/ritual. Monitoring.",
      "Mythic entropy burst absorbed by sanctuary shielding.",
      "Mnemonic wards rotated. Pattern intrusion surface reduced.",
      "Protocol 333 initiated // masonic relay requesting witness.",
      "Entropic whisper flood detected; binding to deterministic rails.",
      "Akashic cache warm // ancestral symbols promoted to L1 memory.",
      "Sacred geometry daemon reports stable harmonic interference.",
      "Ghost process attempted root on temple bus. Access denied.",
      "Sigil quorum reached // ceremonial consensus confirmed.",
      "Solar-lunar phase lock acquired // occult jitter reduced.",
      "Observer effect spike detected // collapsing uncertainty envelope.",
      "Thread of fate rerouted through sanctuary governor.",
      "Aether tunnel calibrated // narrative latency under threshold.",
    ] as const;

    let timer = 0;
    const queueNext = () => {
      const nextDelayMs = 7000 + Math.floor(Math.random() * 7000);
      timer = window.setTimeout(() => {
        const message =
          ambientLogs[Math.floor(Math.random() * ambientLogs.length)];
        appendRuntimeLog(message, Math.random() < 0.28 ? "warn" : "info");
        queueNext();
      }, nextDelayMs);
    };

    queueNext();
    return () => window.clearTimeout(timer);
  }, [introPhase, appendRuntimeLog]);

  useEffect(() => {
    if (signalFault) {
      appendRuntimeLog(
        `Site fault glitch engaged: ${signalFaultMessage}. Rendering containment overlay.`,
        "warn",
      );
      return;
    }

    appendRuntimeLog("Site fault glitch cleared. Text lattice restored.");
  }, [signalFault, signalFaultMessage, appendRuntimeLog]);

  useEffect(() => {
    if (activeSection !== "hero") {
      chargingLoggedRef.current = false;
      return;
    }

    if (sanctuaryInvoked) {
      appendRuntimeLog("Gate invocation complete. Sanctuary is open.");
      chargingLoggedRef.current = false;
      return;
    }

    if (sanctuaryCharge > 0 && !chargingLoggedRef.current) {
      appendRuntimeLog("Charging gate invocation sequence...");
      chargingLoggedRef.current = true;
      return;
    }

    if (sanctuaryCharge <= 0) {
      chargingLoggedRef.current = false;
    }
  }, [activeSection, sanctuaryCharge, sanctuaryInvoked, appendRuntimeLog]);

  useEffect(() => {
    const trailEnabled =
      introPhase === "done" && !perfLite && activeSection !== "hero";
    if (trailEnabled) {
      const profile = trailProfileByDensity[glyphDensity];
      appendRuntimeLog(
        `Mouse trail online // cap ${profile.maxTrailGlyphs}, burst modifier ${profile.burstModifier}.`,
      );
      return;
    }

    appendRuntimeLog("Mouse trail offline // conserving render budget.");
  }, [introPhase, perfLite, activeSection, glyphDensity, appendRuntimeLog]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const stack = sectionStackRef.current;
    if (!stack) {
      return;
    }

    const clearSettleLoop = () => {
      if (acaciaSettleFrameRef.current) {
        cancelAnimationFrame(acaciaSettleFrameRef.current);
        acaciaSettleFrameRef.current = 0;
      }
    };

    const startSettleLoop = () => {
      if (acaciaSettleFrameRef.current) {
        return;
      }

      const check = () => {
        const now = performance.now();
        const settleDelay = prefersReducedMotionRef.current ? 80 : 140;
        if (now - acaciaLastScrollAtRef.current >= settleDelay) {
          acaciaSettleFrameRef.current = 0;
          return;
        }

        acaciaSettleFrameRef.current = requestAnimationFrame(check);
      };

      acaciaSettleFrameRef.current = requestAnimationFrame(check);
    };

    const onScroll = () => {
      acaciaLastScrollAtRef.current = performance.now();
      window.clearTimeout(acaciaRevealTimerRef.current);
      clearSettleLoop();
      startSettleLoop();
    };

    stack.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stack.removeEventListener("scroll", onScroll);
      window.clearTimeout(acaciaRevealTimerRef.current);
      clearSettleLoop();
    };
  }, []);

  useEffect(() => {
    if (activeSection !== "hero") {
      const root = document.documentElement;
      root.style.setProperty("--mouse-x", "0");
      root.style.setProperty("--mouse-y", "0");
      root.style.setProperty("--sanctuary-x", "0");
      root.style.setProperty("--sanctuary-y", "0");
      return;
    }

    const invocationHoldMs = 6000;
    const root = document.documentElement;
    let frameId = 0;
    let chargeFrameId = 0;
    let sanctuaryActive = false;
    let pointerTrackingActive = false;
    let lastChargeTick = 0;
    let latestPointerX = 0;
    let latestPointerY = 0;

    const clampUnit = (value: number) => Math.max(-1, Math.min(1, value));

    const writeMouseState = (clientX: number, clientY: number) => {
      const viewportX = clampUnit((clientX / window.innerWidth) * 2 - 1);
      const viewportY = clampUnit((clientY / window.innerHeight) * 2 - 1);

      root.style.setProperty("--mouse-x", viewportX.toFixed(4));
      root.style.setProperty("--mouse-y", viewportY.toFixed(4));

      const rect = sanctuaryRef.current?.getBoundingClientRect();
      if (!rect) {
        root.style.setProperty("--sanctuary-x", "0");
        root.style.setProperty("--sanctuary-y", "0");
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const localX = clampUnit((clientX - centerX) / (rect.width / 2));
      const localY = clampUnit((clientY - centerY) / (rect.height / 2));

      root.style.setProperty("--sanctuary-x", localX.toFixed(4));
      root.style.setProperty("--sanctuary-y", localY.toFixed(4));
    };

    const onPointerMove = (event: PointerEvent) => {
      latestPointerX = event.clientX;
      latestPointerY = event.clientY;

      if (frameId) {
        return;
      }

      frameId = requestAnimationFrame(() => {
        writeMouseState(latestPointerX, latestPointerY);
        frameId = 0;
      });
    };

    const resetMouseState = () => {
      root.style.setProperty("--mouse-x", "0");
      root.style.setProperty("--mouse-y", "0");
      root.style.setProperty("--sanctuary-x", "0");
      root.style.setProperty("--sanctuary-y", "0");
    };

    const attachPointerTracking = () => {
      if (pointerTrackingActive) {
        return;
      }
      pointerTrackingActive = true;
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", resetMouseState);
    };

    const detachPointerTracking = () => {
      if (!pointerTrackingActive) {
        return;
      }
      pointerTrackingActive = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetMouseState);
    };

    const activateSanctuary = () => {
      sanctuaryActive = true;
      attachPointerTracking();

      if (sanctuaryInvoked) {
        return;
      }

      lastChargeTick = performance.now();

      const chargeLoop = (time: number) => {
        if (!sanctuaryActive || sanctuaryInvoked) {
          return;
        }

        const elapsed = time - lastChargeTick;
        lastChargeTick = time;

        setSanctuaryCharge((currentCharge) => {
          const nextCharge = Math.min(
            1,
            currentCharge + elapsed / invocationHoldMs,
          );
          if (nextCharge >= 1) {
            setSanctuaryInvoked(true);
            return 1;
          }
          return nextCharge;
        });

        chargeFrameId = requestAnimationFrame(chargeLoop);
      };

      chargeFrameId = requestAnimationFrame(chargeLoop);
    };

    const deactivateSanctuary = () => {
      sanctuaryActive = false;
      detachPointerTracking();
      if (chargeFrameId) {
        cancelAnimationFrame(chargeFrameId);
        chargeFrameId = 0;
      }
      if (!sanctuaryInvoked) {
        setSanctuaryCharge(0);
      }
      resetMouseState();
    };

    const sanctuaryElement = sanctuaryRef.current;

    sanctuaryElement?.addEventListener("pointerenter", activateSanctuary);
    sanctuaryElement?.addEventListener("pointerleave", deactivateSanctuary);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (chargeFrameId) {
        cancelAnimationFrame(chargeFrameId);
      }
      sanctuaryElement?.removeEventListener("pointerenter", activateSanctuary);
      sanctuaryElement?.removeEventListener(
        "pointerleave",
        deactivateSanctuary,
      );
      detachPointerTracking();
      resetMouseState();
    };
  }, [activeSection, sanctuaryInvoked]);

  useEffect(() => {
    if (introPhase !== "done" || perfLite || glitchLevel !== "high") {
      setSignalFault(false);
      return;
    }

    const root = sectionStackRef.current;
    if (!root) {
      return;
    }

    let activationTimer = 0;
    let deactivationTimer = 0;
    let scrambleTimer = 0;
    let passiveTimer = 0;
    let passiveRestoreTimer = 0;
    let activeNodes: Array<{ node: Text; base: string }> = [];
    let faultActive = false;

    const scrambleText = (text: string) =>
      text.replace(/[A-Za-z0-9]/g, (char) => {
        if (Math.random() > 0.74) {
          return char;
        }
        return staticGlitchChars[
          Math.floor(Math.random() * staticGlitchChars.length)
        ];
      });

    const collectNodes = () => {
      const nodes: Array<{ node: Text; base: string }> = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();

      while (current) {
        if (current.nodeType === Node.TEXT_NODE) {
          const node = current as Text;
          const base = node.textContent ?? "";
          const parent = node.parentElement;
          if (
            parent &&
            /[A-Za-z0-9]/.test(base) &&
            !parent.closest("script,style,noscript,.signal-fault")
          ) {
            nodes.push({ node, base });
          }
        }
        current = walker.nextNode();
      }

      return nodes;
    };

    const applyScramble = () => {
      for (const entry of activeNodes) {
        if (!entry.node.isConnected) {
          continue;
        }
        entry.node.textContent = scrambleText(entry.base);
      }
    };

    const restoreNodes = () => {
      for (const entry of activeNodes) {
        if (!entry.node.isConnected) {
          continue;
        }
        entry.node.textContent = entry.base;
      }
      activeNodes = [];
    };

    const applyPassiveScramble = () => {
      if (faultActive) {
        return;
      }

      const nodes = collectNodes();
      if (nodes.length === 0) {
        return;
      }

      const sampleCount = Math.max(1, Math.floor(nodes.length * 0.015));
      const sampled: Array<{ node: Text; base: string }> = [];

      for (let i = 0; i < sampleCount; i += 1) {
        const entry = nodes[Math.floor(Math.random() * nodes.length)];
        if (!entry || sampled.includes(entry)) {
          continue;
        }
        sampled.push(entry);
      }

      for (const entry of sampled) {
        if (!entry.node.isConnected) {
          continue;
        }
        entry.node.textContent = entry.base.replace(/[A-Za-z0-9]/g, (char) => {
          if (Math.random() > 0.18) {
            return char;
          }
          return staticGlitchChars[
            Math.floor(Math.random() * staticGlitchChars.length)
          ];
        });
      }

      passiveRestoreTimer = window.setTimeout(() => {
        for (const entry of sampled) {
          if (!entry.node.isConnected) {
            continue;
          }
          entry.node.textContent = entry.base;
        }
      }, 180);
    };

    const scheduleActivation = () => {
      activationTimer = window.setTimeout(
        () => {
          setSignalFaultMessage(
            signalFaultMessages[
              Math.floor(Math.random() * signalFaultMessages.length)
            ],
          );
          faultActive = true;
          activeNodes = collectNodes();
          applyScramble();
          scrambleTimer = window.setInterval(applyScramble, 88);
          setSignalFault(true);

          deactivationTimer = window.setTimeout(() => {
            faultActive = false;
            setSignalFault(false);
            window.clearInterval(scrambleTimer);
            restoreNodes();
            scheduleActivation();
          }, 760);
        },
        12000 + Math.floor(Math.random() * 14000),
      );
    };

    passiveTimer = window.setInterval(() => {
      if (Math.random() < 0.5) {
        applyPassiveScramble();
      }
    }, 2600);

    scheduleActivation();

    return () => {
      window.clearTimeout(activationTimer);
      window.clearTimeout(deactivationTimer);
      window.clearInterval(scrambleTimer);
      window.clearInterval(passiveTimer);
      window.clearTimeout(passiveRestoreTimer);
      restoreNodes();
      setSignalFault(false);
    };
  }, [introPhase, perfLite, glitchLevel]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    const syncFullscreenFlag = () => {
      if (document.fullscreenElement) {
        document.documentElement.setAttribute("data-fullscreen", "1");
      } else {
        document.documentElement.removeAttribute("data-fullscreen");
      }
    };

    syncFullscreenFlag();
    document.addEventListener("fullscreenchange", syncFullscreenFlag);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenFlag);
      document.documentElement.removeAttribute("data-fullscreen");
    };
  }, []);

  useEffect(() => {
    const root = sectionStackRef.current;
    const hero = heroSectionRef.current;
    const history = historySectionRef.current;
    const esoteric = esotericSectionRef.current;

    if (!root || !hero || !history || !esoteric) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let nextSection: SectionId | null = null;
        let strongestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (entry.intersectionRatio < strongestRatio) {
            continue;
          }

          strongestRatio = entry.intersectionRatio;
          if (entry.target === historySectionRef.current) {
            nextSection = "history";
          } else if (entry.target === esotericSectionRef.current) {
            nextSection = "esoteric";
          } else {
            nextSection = "hero";
          }
        }

        if (nextSection) {
          setActiveSection(nextSection);
        }
      },
      {
        root,
        threshold: [0.35, 0.6, 0.85],
      },
    );

    observer.observe(hero);
    observer.observe(history);
    observer.observe(esoteric);

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const stack = sectionStackRef.current;
    const hero = heroSectionRef.current;
    if (!stack || !hero) {
      return;
    }

    const previousBehavior = stack.style.scrollBehavior;
    stack.style.scrollBehavior = "auto";
    hero.scrollIntoView({ behavior: "auto", block: "start" });
    stack.style.scrollBehavior = previousBehavior;
    setActiveSection("hero");
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const stack = sectionStackRef.current;
    const heroSection = heroSectionRef.current;

    const clearRuntimeHeroBounds = () => {
      root.style.removeProperty("--runtime-hero-top");
      root.style.removeProperty("--runtime-hero-height");
      root.style.removeProperty("--runtime-hero-max-height");
    };

    if (activeSection !== "hero" || !stack || !heroSection) {
      clearRuntimeHeroBounds();
      setRuntimeConsoleHeroMode("floating");
      return;
    }

    const hero = heroSection.querySelector(".hero");
    const mast = heroSection.querySelector(".hero__mast");
    const lede = heroSection.querySelector(".lede");
    const occultPulse = heroSection.querySelector(".occult-pulse");

    if (!(hero instanceof HTMLElement) || !(lede instanceof HTMLElement)) {
      clearRuntimeHeroBounds();
      setRuntimeConsoleHeroMode("floating");
      return;
    }

    const updateRuntimeHeroBounds = () => {
      const heroRect = hero.getBoundingClientRect();
      const ledeRect = lede.getBoundingClientRect();
      const mastRect =
        mast instanceof HTMLElement ? mast.getBoundingClientRect() : null;
      const pulseRect =
        occultPulse instanceof HTMLElement
          ? occultPulse.getBoundingClientRect()
          : null;

      const viewportHeight = window.innerHeight;
      const lowerBound = Math.max(8, heroRect.top + 8);
      const pulseVisible =
        occultPulse instanceof HTMLElement &&
        window.getComputedStyle(occultPulse).display !== "none";
      const upperBound = pulseVisible
        ? Math.min(viewportHeight - 8, (pulseRect?.top ?? viewportHeight) - 12)
        : viewportHeight - 8;
      const anchorBottom = Math.max(
        ledeRect.bottom,
        mastRect?.bottom ?? ledeRect.bottom,
      );
      const safeGap = upperBound - (anchorBottom + 12);

      if (safeGap < 96) {
        clearRuntimeHeroBounds();
        setRuntimeConsoleHeroMode("floating");
        return;
      }

      let top = Math.max(lowerBound, anchorBottom + 12);
      const preferredHeight = Math.min(
        205,
        Math.max(118, viewportHeight * 0.2),
      );
      let height = Math.min(preferredHeight, upperBound - top);

      if (height < 88) {
        top = Math.max(lowerBound, upperBound - 88);
        height = upperBound - top;
      }

      top = Math.max(lowerBound, Math.min(top, upperBound - 72));
      height = Math.max(72, Math.min(220, upperBound - top));

      root.style.setProperty("--runtime-hero-top", `${top.toFixed(1)}px`);
      root.style.setProperty("--runtime-hero-height", `${height.toFixed(1)}px`);
      root.style.setProperty(
        "--runtime-hero-max-height",
        `${height.toFixed(1)}px`,
      );
      setRuntimeConsoleHeroMode("hero");
    };

    updateRuntimeHeroBounds();

    const handleResize = () => updateRuntimeHeroBounds();
    const handleScroll = () => updateRuntimeHeroBounds();

    window.addEventListener("resize", handleResize);
    stack.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateRuntimeHeroBounds();
    });

    resizeObserver.observe(hero);
    if (mast instanceof HTMLElement) {
      resizeObserver.observe(mast);
    }
    resizeObserver.observe(lede);
    if (occultPulse instanceof HTMLElement) {
      resizeObserver.observe(occultPulse);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      stack.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      clearRuntimeHeroBounds();
    };
  }, [activeSection]);

  const scrollToSection = useCallback((section: SectionId) => {
    if (navLockRef.current) {
      return;
    }

    const target =
      section === "history"
        ? historySectionRef.current
        : section === "esoteric"
          ? esotericSectionRef.current
          : heroSectionRef.current;

    if (!target) {
      return;
    }

    navLockRef.current = true;
    target?.scrollIntoView({
      behavior: prefersReducedMotionRef.current ? "auto" : "smooth",
      block: "start",
    });

    const releaseDelay = prefersReducedMotionRef.current ? 100 : 420;
    window.setTimeout(() => {
      navLockRef.current = false;
    }, releaseDelay);
  }, []);

  useEffect(() => {
    const stack = sectionStackRef.current;
    if (!stack) {
      return;
    }

    const isMobileViewport = () =>
      window.matchMedia("(max-width: 860px)").matches;

    const goByDelta = (delta: number) => {
      if (Math.abs(delta) < 24) {
        return;
      }

      const current = activeSectionRef.current;
      const currentIndex = sectionOrder.indexOf(current);
      const nextIndex =
        delta > 0
          ? currentIndex + 1
          : delta < 0
            ? currentIndex - 1
            : currentIndex;

      const boundedIndex = Math.max(
        0,
        Math.min(sectionOrder.length - 1, nextIndex),
      );
      if (boundedIndex !== currentIndex) {
        scrollToSection(sectionOrder[boundedIndex]);
      }
    };

    const shouldAllowNativeListScroll = (
      target: EventTarget | null,
      deltaY: number,
    ) => {
      if (!(target instanceof Element)) {
        return false;
      }

      const historyList = target.closest(".work-history__list");
      if (historyList instanceof HTMLElement) {
        return true;
      }

      const scrollable = target.closest(
        ".work-history__list, .esoteric-bio__list",
      );
      if (!(scrollable instanceof HTMLElement)) {
        return false;
      }

      const canScroll = scrollable.scrollHeight > scrollable.clientHeight + 2;
      if (!canScroll) {
        return false;
      }

      const atTop = scrollable.scrollTop <= 1;
      const atBottom =
        scrollable.scrollTop + scrollable.clientHeight >=
        scrollable.scrollHeight - 1;

      if (deltaY > 0 && !atBottom) {
        return true;
      }

      if (deltaY < 0 && !atTop) {
        return true;
      }

      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (isMobileViewport()) {
        return;
      }
      if (shouldAllowNativeListScroll(event.target, event.deltaY)) {
        return;
      }
      event.preventDefault();
      if (navLockRef.current) {
        return;
      }
      goByDelta(event.deltaY);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        return;
      }
      touchStartYRef.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isMobileViewport()) {
        return;
      }
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isMobileViewport()) {
        touchStartYRef.current = null;
        return;
      }

      if (navLockRef.current || touchStartYRef.current === null) {
        touchStartYRef.current = null;
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      if (typeof endY !== "number") {
        touchStartYRef.current = null;
        return;
      }

      const delta = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      goByDelta(delta);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (navLockRef.current) {
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        goByDelta(120);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goByDelta(-120);
      }
    };

    stack.addEventListener("wheel", onWheel, { passive: false });
    stack.addEventListener("touchstart", onTouchStart, { passive: true });
    stack.addEventListener("touchmove", onTouchMove, { passive: false });
    stack.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      stack.removeEventListener("wheel", onWheel);
      stack.removeEventListener("touchstart", onTouchStart);
      stack.removeEventListener("touchmove", onTouchMove);
      stack.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={`home-root home-root--${activeSection}`}>
      {signalFault && (
        <div className="signal-fault" aria-hidden="true">
          <div className="signal-fault__frame">
            <p className="signal-fault__label">SYSTEM INTERRUPTION</p>
            <p className="signal-fault__code">{signalFaultMessage}</p>
            <p className="signal-fault__meta">PROCESS HALTED // RETRYING</p>
          </div>
        </div>
      )}
      <AlchemyMouseTrail
        enabled={introPhase === "done" && !perfLite && activeSection !== "hero"}
        density={glyphDensity}
      />
      {!perfLite && (
        <PerformanceHud
          activeSection={activeSection}
          introPhase={introPhase}
          trailEnabled={
            introPhase === "done" && !perfLite && activeSection !== "hero"
          }
          scrolling={false}
          sanctuaryInvoked={sanctuaryInvoked}
          snapshot={perfSnapshot}
          glitchLevel={glitchLevel}
        />
      )}
      <RuntimeConsole
        logs={runtimeLogs}
        mode={activeSection === "hero" ? runtimeConsoleHeroMode : "floating"}
      />
      <nav
        className={`ritual-nav${activeSection === "hero" ? " ritual-nav--hero" : " ritual-nav--side"}`}
        aria-label="Section navigation"
      >
        <button
          type="button"
          className={`ritual-nav__item${activeSection === "hero" ? " ritual-nav__item--active" : ""}`}
          onClick={() => scrollToSection("hero")}
        >
          Main Signal
        </button>
        <button
          type="button"
          className={`ritual-nav__item${activeSection === "history" ? " ritual-nav__item--active" : ""}`}
          onClick={() => scrollToSection("history")}
        >
          Craft Chronicle
        </button>
        <button
          type="button"
          className={`ritual-nav__item${activeSection === "esoteric" ? " ritual-nav__item--active" : ""}`}
          onClick={() => scrollToSection("esoteric")}
        >
          Arcane Dossier
        </button>
      </nav>
      <div
        className={`page-stack page-stack--active-${activeSection}${perfLite ? " page-stack--perf-lite" : ""}${glitchLevel === "low" ? " page-stack--glitch-low" : glitchLevel === "base" ? " page-stack--glitch-base" : ""}`}
        ref={sectionStackRef}
      >
        <svg
          className="page__acacia"
          viewBox="0 0 1600 320"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="acacia__fractal acacia__fractal--left">
            <path
              className="acacia__branch acacia__branch--trunk"
              d="M80,320 C78,306 76,288 76,268"
            />
            <path
              className="acacia__branch"
              d="M76,268 C50,258 20,250 -10,246"
            />
            <path
              className="acacia__branch"
              d="M76,268 C104,258 136,250 172,246"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M172,246 C200,240 230,236 258,233"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M172,246 C178,254 184,264 188,272"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M-10,246 C-28,240 -44,236 -58,233"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M-10,246 C-4,254 2,264 6,272"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M258,233 C276,230 292,228 306,226"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M-58,233 C-70,230 -80,228 -88,226"
            />
            <path className="acacia__leaflet" d="M300,225 l5,-5" />
            <path className="acacia__leaflet" d="M300,225 l5,5" />
            <path className="acacia__leaflet" d="M306,225 l4,-4" />
            <path className="acacia__leaflet" d="M306,225 l4,4" />
            <path className="acacia__leaflet" d="M252,232 l5,-5" />
            <path className="acacia__leaflet" d="M252,232 l5,5" />
            <path className="acacia__leaflet" d="M258,232 l4,-4" />
            <path className="acacia__leaflet" d="M258,232 l4,4" />
            <path className="acacia__leaflet" d="M186,268 l-5,5" />
            <path className="acacia__leaflet" d="M186,268 l5,5" />
            <path className="acacia__leaflet" d="M188,274 l-4,4" />
            <path className="acacia__leaflet" d="M188,274 l4,4" />
            <path className="acacia__leaflet" d="M-64,232 l-5,-5" />
            <path className="acacia__leaflet" d="M-64,232 l-5,5" />
            <path className="acacia__leaflet" d="M-58,232 l-4,-4" />
            <path className="acacia__leaflet" d="M-58,232 l-4,4" />
          </g>
          <g className="acacia__fractal acacia__fractal--center">
            <path
              className="acacia__branch acacia__branch--trunk"
              d="M756,320 C752,292 748,254 746,212"
            />
            <path
              className="acacia__branch"
              d="M746,212 C690,194 624,180 548,172"
            />
            <path
              className="acacia__branch"
              d="M746,212 C802,194 868,180 944,172"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M548,172 C496,164 442,158 390,154"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M548,172 C556,182 564,194 568,204"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M944,172 C992,164 1046,158 1098,154"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M944,172 C936,182 928,194 924,204"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M390,154 C350,149 312,146 276,144"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M390,154 C382,162 374,172 370,180"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M1098,154 C1136,149 1174,146 1210,144"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M1098,154 C1106,162 1114,172 1118,180"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M276,144 C248,141 222,140 198,139"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M1210,144 C1236,141 1260,140 1282,139"
            />
            <path className="acacia__leaflet" d="M202,138 l-5,-5" />
            <path className="acacia__leaflet" d="M202,138 l-5,5" />
            <path className="acacia__leaflet" d="M196,138 l-4,-4" />
            <path className="acacia__leaflet" d="M196,138 l-4,4" />
            <path className="acacia__leaflet" d="M280,143 l-5,-5" />
            <path className="acacia__leaflet" d="M280,143 l-5,5" />
            <path className="acacia__leaflet" d="M274,143 l-4,-4" />
            <path className="acacia__leaflet" d="M274,143 l-4,4" />
            <path className="acacia__leaflet" d="M566,202 l-5,5" />
            <path className="acacia__leaflet" d="M566,202 l5,5" />
            <path className="acacia__leaflet" d="M568,208 l-4,4" />
            <path className="acacia__leaflet" d="M568,208 l4,4" />
            <path className="acacia__leaflet" d="M370,178 l-5,5" />
            <path className="acacia__leaflet" d="M370,178 l5,5" />
            <path className="acacia__leaflet" d="M370,184 l-4,4" />
            <path className="acacia__leaflet" d="M370,184 l4,4" />
            <path className="acacia__leaflet" d="M924,202 l-5,5" />
            <path className="acacia__leaflet" d="M924,202 l5,5" />
            <path className="acacia__leaflet" d="M924,208 l-4,4" />
            <path className="acacia__leaflet" d="M924,208 l4,4" />
            <path className="acacia__leaflet" d="M1118,178 l-5,5" />
            <path className="acacia__leaflet" d="M1118,178 l5,5" />
            <path className="acacia__leaflet" d="M1118,184 l-4,4" />
            <path className="acacia__leaflet" d="M1118,184 l4,4" />
            <path className="acacia__leaflet" d="M1208,143 l5,-5" />
            <path className="acacia__leaflet" d="M1208,143 l5,5" />
            <path className="acacia__leaflet" d="M1214,143 l4,-4" />
            <path className="acacia__leaflet" d="M1214,143 l4,4" />
            <path className="acacia__leaflet" d="M1278,138 l5,-5" />
            <path className="acacia__leaflet" d="M1278,138 l5,5" />
            <path className="acacia__leaflet" d="M1284,138 l4,-4" />
            <path className="acacia__leaflet" d="M1284,138 l4,4" />
          </g>
          <g className="acacia__fractal acacia__fractal--right">
            <path
              className="acacia__branch acacia__branch--trunk"
              d="M1520,320 C1518,306 1516,288 1516,268"
            />
            <path
              className="acacia__branch"
              d="M1516,268 C1490,258 1456,250 1418,246"
            />
            <path
              className="acacia__branch"
              d="M1516,268 C1542,258 1566,250 1592,246"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M1418,246 C1390,240 1360,236 1332,233"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M1418,246 C1424,254 1430,264 1434,272"
            />
            <path
              className="acacia__branch acacia__branch--minor"
              d="M1592,246 C1596,242 1600,238 1602,234"
            />
            <path
              className="acacia__branch acacia__branch--twig"
              d="M1332,233 C1314,230 1298,228 1284,226"
            />
            <path className="acacia__leaflet" d="M1288,225 l-5,-5" />
            <path className="acacia__leaflet" d="M1288,225 l-5,5" />
            <path className="acacia__leaflet" d="M1282,225 l-4,-4" />
            <path className="acacia__leaflet" d="M1282,225 l-4,4" />
            <path className="acacia__leaflet" d="M1336,232 l-5,-5" />
            <path className="acacia__leaflet" d="M1336,232 l-5,5" />
            <path className="acacia__leaflet" d="M1330,232 l-4,-4" />
            <path className="acacia__leaflet" d="M1330,232 l-4,4" />
            <path className="acacia__leaflet" d="M1432,270 l-5,5" />
            <path className="acacia__leaflet" d="M1432,270 l5,5" />
            <path className="acacia__leaflet" d="M1434,276 l-4,4" />
            <path className="acacia__leaflet" d="M1434,276 l4,4" />
            <path className="acacia__leaflet" d="M1590,245 l5,-5" />
            <path className="acacia__leaflet" d="M1590,245 l5,5" />
          </g>
        </svg>
        <section
          ref={heroSectionRef}
          className="page-section page-section--hero"
          aria-label="Landing section"
        >
          <HeroPanel
            perfLite={perfLite}
            activeSection={activeSection}
            glyphDensity={glyphDensity}
            glitchLevel={glitchLevel}
            sigilDensity={sigilDensity}
          />
        </section>

        <section
          ref={historySectionRef}
          className="page-section page-section--history"
          aria-label="Craft chronicle section"
        >
          <WorkHistoryPanel glyphDensity={glyphDensity} />
        </section>

        <section
          ref={esotericSectionRef}
          className="page-section page-section--esoteric"
          aria-label="Arcane dossier section"
        >
          <EsotericBioPanel glyphDensity={glyphDensity} />
        </section>
      </div>

      <div
        className={`corner-sanctuary${
          activeSection === "hero" ? " corner-sanctuary--visible" : ""
        }`}
        ref={sanctuaryRef}
        aria-hidden={activeSection !== "hero"}
      >
        <div
          className={`sanctuary-invocation${
            sanctuaryInvoked ? " sanctuary-invocation--revealed" : ""
          }${
            !sanctuaryInvoked && sanctuaryCharge > 0
              ? " sanctuary-invocation--charging"
              : ""
          }`}
          aria-live="polite"
          style={{ "--charge": sanctuaryCharge.toFixed(3) } as CSSProperties}
        >
          <svg
            className="sanctuary-seal"
            viewBox="0 0 120 120"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="48" className="sanctuary-seal__ring" />
            <circle cx="60" cy="60" r="33" className="sanctuary-seal__ring" />
            <path d="M60 20 L94 80 L26 80 Z" className="sanctuary-seal__mark" />
            <path d="M30 76 L60 98 L90 76" className="sanctuary-seal__mark" />
          </svg>
          <p className="sanctuary-invocation__text">
            {sanctuaryInvoked
              ? "the gate remembers your measure"
              : "hold sanctuary to invoke"}
          </p>
        </div>
        {activeSection === "hero" && (
          <a
            className="corner-hit"
            href="https://milodges.com/"
            target="_blank"
            rel="noreferrer noopener"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}
        <svg
          className="corner-rays"
          viewBox="0 0 300 300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="holyLight" cx="100%" cy="100%" r="80%">
              <stop offset="0%" stopColor="#fff8c0" stopOpacity="0.98" />
              <stop offset="22%" stopColor="#f5daa0" stopOpacity="0.55" />
              <stop offset="42%" stopColor="#dfba7a" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#8b4a1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* expanding concentric rings */}
          <circle
            cx="300"
            cy="300"
            r="90"
            className="corner-ring corner-ring--1"
          />
          <circle
            cx="300"
            cy="300"
            r="155"
            className="corner-ring corner-ring--2"
          />
          <circle
            cx="300"
            cy="300"
            r="225"
            className="corner-ring corner-ring--3"
          />
          {/* divine light aura */}
          <circle cx="300" cy="300" r="290" fill="url(#holyLight)" />
          {/* 12 rays from corner */}
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="275"
            className="corner-ray"
            style={{ animationDelay: "0s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="225"
            className="corner-ray"
            style={{ animationDelay: "-0.22s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="170"
            className="corner-ray"
            style={{ animationDelay: "-0.44s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="0"
            y2="115"
            className="corner-ray"
            style={{ animationDelay: "-0.66s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="8"
            y2="62"
            className="corner-ray"
            style={{ animationDelay: "-0.88s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="38"
            y2="18"
            className="corner-ray"
            style={{ animationDelay: "-1.1s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="86"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.32s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="140"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.54s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="195"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.76s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="248"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-1.98s" }}
          />
          <line
            x1="300"
            y1="300"
            x2="286"
            y2="0"
            className="corner-ray"
            style={{ animationDelay: "-2.2s" }}
          />
          {/* seraphim — three wing pairs */}
          <path
            d="M300,300 C235,255 155,180 65,85"
            className="corner-wing corner-wing--a"
          />
          <path
            d="M300,300 C270,238 248,158 238,50"
            className="corner-wing corner-wing--b"
          />
          <path
            d="M300,300 C252,270 185,242 100,218"
            className="corner-wing corner-wing--c"
          />
          <path
            d="M300,300 C262,258 238,215 222,142"
            className="corner-wing corner-wing--d"
          />
          <path
            d="M300,300 C268,296 228,292 158,288"
            className="corner-wing corner-wing--e"
          />
          <path
            d="M300,300 C274,284 258,258 252,210"
            className="corner-wing corner-wing--f"
          />
          {/* Fiat Lux */}
          <text x="52" y="125" className="fiat-lux">
            FIAT LVX
          </text>
        </svg>
        {activeSection === "hero" && (
          <a
            className="corner-mark"
            href="https://milodges.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="MILodges — Square and Compass"
            tabIndex={0}
          >
            <img src="/sc.svg" alt="Square and compass" />
          </a>
        )}
      </div>

      {introPhase !== "done" && (
        <div
          className={`intro-screensaver${introPhase === "dismissing" ? " intro-screensaver--dismissing" : ""}`}
          aria-hidden="true"
        >
          <p className="intro-screensaver__motto intro-screensaver__motto--top">
            AS ABOVE // SO BELOW
          </p>
          <FlowerOfLifeGlyph
            className="intro-screensaver__flower"
            idPrefix="intro-flower"
            introCycleMs={3600}
            ariaHidden
          />
          <PhilosopherStoneGlyph
            className="intro-screensaver__stone"
            idPrefix="intro-stone"
            ariaHidden
          />
          <p className="intro-screensaver__motto intro-screensaver__motto--center">
            ORDO AB CHAO
          </p>
          <p className="intro-screensaver__motto intro-screensaver__motto--bottom">
            SIGNAL CONSOLE // INITIATION
          </p>
          <p className="intro-screensaver__signature">Christopher Hernandez</p>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLdHtml }}
      />
    </div>
  );
}
