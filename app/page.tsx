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
import { FlowerOfLifeGlyph } from "../components/Sigil";
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
};

const matrixNoiseChars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*+-/<>[]{}";

type PerformanceHudProps = {
  activeSection: SectionId;
  introPhase: "active" | "dismissing" | "done";
  trailEnabled: boolean;
  scrolling: boolean;
  sanctuaryInvoked: boolean;
};

const alchemyTrailSymbols = ["🜂", "🜁", "🜃", "🜄", "🜍", "🜔"];

function AlchemyMouseTrail({ enabled }: { enabled: boolean }) {
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
      const burstCount = speed > 3.8 ? 3 : speed > 2 ? 2 : speed > 1.1 ? 1 : 0;
      if (burstCount === 0) {
        return;
      }

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

      activeGlyphs = [...activeGlyphs, ...newGlyphs].slice(-24);
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

      if (distance < 14 || dt < 16) {
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
  }, [enabled]);

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
}: PerformanceHudProps) {
  const [snapshot, setSnapshot] = useState<PerformanceHudSnapshot>({
    fps: 0,
    lowFps: 0,
    avgFrameMs: 0,
    slowFramePct: 0,
    appAgeSec: 0,
  });

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
  const [matrixNoise, setMatrixNoise] = useState("--------");

  useEffect(() => {
    let frameId = 0;
    let sampleStart = performance.now();
    let previousFrameAt = sampleStart;
    let frames = 0;
    let totalFrameMs = 0;
    let slowFrames = 0;
    let lowFps = Number.POSITIVE_INFINITY;
    const appStart = sampleStart;

    const sample = (now: number) => {
      const frameMs = now - previousFrameAt;
      previousFrameAt = now;
      frames += 1;
      totalFrameMs += frameMs;
      if (frameMs > 19.5) {
        slowFrames += 1;
      }

      if (now - sampleStart >= 500) {
        const elapsed = now - sampleStart;
        const fps = Math.round((frames * 1000) / elapsed);
        lowFps = Math.min(lowFps, fps);

        setSnapshot({
          fps,
          lowFps: Number.isFinite(lowFps) ? lowFps : fps,
          avgFrameMs: Number((totalFrameMs / frames).toFixed(1)),
          slowFramePct: Math.round((slowFrames / frames) * 100),
          appAgeSec: Math.max(0, Math.floor((now - appStart) / 1000)),
        });

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
  }, []);

  useEffect(() => {
    if (activeSection === "hero") {
      setMatrixNoise("--------");
      return;
    }

    const timer = window.setInterval(() => {
      let next = "";
      for (let i = 0; i < 12; i += 1) {
        next +=
          matrixNoiseChars[Math.floor(Math.random() * matrixNoiseChars.length)];
      }
      setMatrixNoise(next);
    }, 120);

    return () => window.clearInterval(timer);
  }, [activeSection]);

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
        <span className="perf-hud__metric">LOW {snapshot.lowFps}</span>
        <span className="perf-hud__metric">MS {snapshot.avgFrameMs}</span>
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
    <>
      <AlchemyMouseTrail
        enabled={introPhase === "done" && !perfLite && activeSection !== "hero"}
      />
      <PerformanceHud
        activeSection={activeSection}
        introPhase={introPhase}
        trailEnabled={
          introPhase === "done" && !perfLite && activeSection !== "hero"
        }
        scrolling={false}
        sanctuaryInvoked={sanctuaryInvoked}
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
        className={`page-stack page-stack--active-${activeSection}${perfLite ? " page-stack--perf-lite" : ""}`}
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
          <HeroPanel perfLite={perfLite} activeSection={activeSection} />
        </section>

        <section
          ref={historySectionRef}
          className="page-section page-section--history"
          aria-label="Craft chronicle section"
        >
          <WorkHistoryPanel />
        </section>

        <section
          ref={esotericSectionRef}
          className="page-section page-section--esoteric"
          aria-label="Arcane dossier section"
        >
          <EsotericBioPanel />
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
          <FlowerOfLifeGlyph
            className="intro-screensaver__flower"
            idPrefix="intro-flower"
            introCycleMs={3600}
            ariaHidden
          />
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLdHtml }}
      />
    </>
  );
}
