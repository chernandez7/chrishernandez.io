"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Sigil } from "../components/Sigil";
import { socialLinks } from "../lib/links";

type NavWithHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

const canonicalName = "Christopher Hernandez";
const enochianTransliteration = "KHRISTOFER HERNANDEZ OD ZIRDO";
const glitchAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}|/\\+=-_*#?~";

const scrambleName = (name: string, intensity = 0.35) => {
  return name
    .split("")
    .map((char) => {
      if (char === " ") {
        return char;
      }

      if (Math.random() > intensity) {
        return char;
      }

      const index = Math.floor(Math.random() * glitchAlphabet.length);
      return glitchAlphabet[index];
    })
    .join("");
};

const signals = [
  "Observatory",
  "Atlas",
  "Signal Hunter",
  "Sacred Infrastructure",
];

const occultPulse = [
  "AS ABOVE // SO BELOW",
  "TREE OF LIFE PATHWORK",
  "SQUARE + COMPASS FIELD",
  "MERCURY : SULFUR : SALT",
];

const linkPossessionBursts = [
  "// TRACE : ASTRAL HANDSHAKE",
  "// KETER->MALKUTH BRIDGE",
  "// ORDO:CONVERGENCE:ACTIVE",
  "// GATE SIGIL RESONANCE",
  "// WATCHER ACKNOWLEDGED",
];

const sigilQuotes = [
  {
    text: "As above, so below.",
    position: "sigil-quote sigil-quote--north",
  },
  {
    text: "Visita interiora terrae.",
    position: "sigil-quote sigil-quote--east",
  },
  {
    text: "Solve et coagula.",
    position: "sigil-quote sigil-quote--south",
  },
  {
    text: "From ash, measure and build.",
    position: "sigil-quote sigil-quote--west",
  },
];

const promotionTracks = [
  {
    company: "Tempus AI",
    stages: [
      {
        period: "2022 - 2025",
        role: "Senior Software Engineer",
      },
      {
        period: "2025 - Present",
        role: "Senior Software Engineer II",
      },
    ],
  },
  {
    company: "Accenture",
    stages: [
      {
        period: "2019 - 2020",
        role: "Application Development Analyst",
      },
      {
        period: "2020 - 2021",
        role: "Advanced App Engineering Senior Analyst / Specialist",
      },
    ],
  },
  {
    company: "Alluxo",
    stages: [
      {
        period: "2018 - 2020",
        role: "Full Stack Developer",
      },
      {
        period: "2020 - 2021",
        role: "Head of Engineering",
      },
    ],
  },
  {
    company: "Own It Technologies, Inc.",
    stages: [
      {
        period: "2017 - 2020",
        role: "VP of Engineering",
      },
    ],
  },
  {
    company: "NGHT LLC / Tandlr / The Authentic Company",
    stages: [
      {
        period: "2016 - 2019",
        role: "Co-Founder and Full Stack Engineer (Contract + Startup)",
      },
    ],
  },
];

const bioInterests = [
  "Thirty solar turns; I chart inner constellations and return carrying workable light.",
  "Six strings, four strings, and shutter rites, with sacred geometry as the hidden grammar beneath form.",
  "Game realms, old pages, and twin laboratories: glass and reagent by one light, racks and packets by another, both practicing transmutation.",
  "Inner work, meditation, astral searching, manifestation, and operative magic: not all temples are built with hands.",
  "Lodge currents, hermetic study, and philosophy as true north; body tempered beside mind, ascending toward the unopened door.",
];

type SectionId = "hero" | "history" | "esoteric";
const sectionOrder: SectionId[] = ["esoteric", "hero", "history"];

export default function Home() {
  const sectionStackRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const historySectionRef = useRef<HTMLElement>(null);
  const esotericSectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotionRef = useRef(false);
  const activeSectionRef = useRef<SectionId>("hero");
  const navLockRef = useRef(false);
  const acaciaRevealTimerRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const sanctuaryRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState(canonicalName);
  const [phaseShiftActive, setPhaseShiftActive] = useState(false);
  const [perfLite, setPerfLite] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [sanctuaryInvoked, setSanctuaryInvoked] = useState(false);
  const [sanctuaryCharge, setSanctuaryCharge] = useState(0);
  const [introPhase, setIntroPhase] = useState<"active" | "dismissing" | "done">("active");
  const [acaciaHiddenByScroll, setAcaciaHiddenByScroll] = useState(false);
  const [possessedLink, setPossessedLink] = useState<{
    index: number;
    text: string;
  } | null>(null);
  const personJsonLd = {
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
  };

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
      setDisplayName(canonicalName);
      return;
    }

    let scrambleFrames = 0;

    const timer = window.setInterval(() => {
      if (phaseShiftActive) {
        setDisplayName(
          scrambleName(enochianTransliteration, 0.24 + Math.random() * 0.34),
        );
        return;
      }

      if (scrambleFrames > 0) {
        scrambleFrames -= 1;
        setDisplayName(scrambleName(canonicalName, 0.28 + Math.random() * 0.5));
        if (scrambleFrames === 0) {
          setDisplayName(canonicalName);
        }
        return;
      }

      if (Math.random() < 0.17) {
        scrambleFrames = 2 + Math.floor(Math.random() * 5);
      }
    }, 170);

    return () => {
      window.clearInterval(timer);
      setDisplayName(canonicalName);
    };
  }, [perfLite, phaseShiftActive]);

  useEffect(() => {
    if (perfLite) {
      setPossessedLink(null);
      return;
    }

    let possessionFrames = 0;
    let nextPossessed: { index: number; text: string } | null = null;

    const timer = window.setInterval(() => {
      if (possessionFrames > 0 && nextPossessed) {
        possessionFrames -= 1;
        setPossessedLink(nextPossessed);
        if (possessionFrames === 0) {
          setPossessedLink(null);
          nextPossessed = null;
        }
        return;
      }

      if (Math.random() < 0.08) {
        nextPossessed = {
          index: Math.floor(Math.random() * socialLinks.length),
          text: linkPossessionBursts[
            Math.floor(Math.random() * linkPossessionBursts.length)
          ],
        };
        possessionFrames = 1 + Math.floor(Math.random() * 2);
      }
    }, 120);

    return () => {
      window.clearInterval(timer);
      setPossessedLink(null);
    };
  }, [perfLite]);

  useEffect(() => {
    if (perfLite) {
      setPhaseShiftActive(false);
      return;
    }

    let timeoutId = 0;
    let activeWindowId = 0;

    const schedulePhaseShift = () => {
      const waitMs = 40000 + Math.floor(Math.random() * 30000);
      timeoutId = window.setTimeout(() => {
        setPhaseShiftActive(true);
        activeWindowId = window.setTimeout(() => {
          setPhaseShiftActive(false);
          schedulePhaseShift();
        }, 2800);
      }, waitMs);
    };

    schedulePhaseShift();

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(activeWindowId);
      setPhaseShiftActive(false);
    };
  }, [perfLite]);

  useEffect(() => {
    if (perfLite) {
      setIntroPhase("done");
      return;
    }
    const dismissTimer = window.setTimeout(() => {
      setIntroPhase("dismissing");
    }, 1800);
    return () => window.clearTimeout(dismissTimer);
  }, [perfLite]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const stack = sectionStackRef.current;
    if (!stack) {
      return;
    }

    const onScroll = () => {
      const settleDelay = prefersReducedMotionRef.current ? 120 : 420;
      setAcaciaHiddenByScroll(true);
      window.clearTimeout(acaciaRevealTimerRef.current);
      acaciaRevealTimerRef.current = window.setTimeout(() => {
        if (navLockRef.current) {
          return;
        }
        setAcaciaHiddenByScroll(false);
      }, settleDelay);
    };

    stack.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stack.removeEventListener("scroll", onScroll);
      window.clearTimeout(acaciaRevealTimerRef.current);
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
    let lastChargeTick = 0;

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
      if (!sanctuaryActive) {
        return;
      }

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      const { clientX, clientY } = event;
      frameId = requestAnimationFrame(() => {
        writeMouseState(clientX, clientY);
      });
    };

    const resetMouseState = () => {
      root.style.setProperty("--mouse-x", "0");
      root.style.setProperty("--mouse-y", "0");
      root.style.setProperty("--sanctuary-x", "0");
      root.style.setProperty("--sanctuary-y", "0");
    };

    const activateSanctuary = () => {
      sanctuaryActive = true;

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

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetMouseState);

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
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetMouseState);
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
    stack.scrollTop = hero.offsetTop;
    stack.style.scrollBehavior = previousBehavior;
    setActiveSection("hero");
  }, []);

  const scrollToSection = (section: SectionId) => {
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

    setAcaciaHiddenByScroll(true);
    navLockRef.current = true;
    target?.scrollIntoView({
      behavior: prefersReducedMotionRef.current ? "auto" : "smooth",
      block: "start",
    });

    const releaseDelay = prefersReducedMotionRef.current ? 120 : 760;
    window.setTimeout(() => {
      navLockRef.current = false;
      window.clearTimeout(acaciaRevealTimerRef.current);
      acaciaRevealTimerRef.current = window.setTimeout(() => {
        setAcaciaHiddenByScroll(false);
      }, prefersReducedMotionRef.current ? 40 : 120);
    }, releaseDelay);
  };

  useEffect(() => {
    const stack = sectionStackRef.current;
    if (!stack) {
      return;
    }

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

    const onWheel = (event: WheelEvent) => {
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
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
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
      <div
        className={`page-stack page-stack--active-${activeSection}${perfLite ? " page-stack--perf-lite" : ""}${acaciaHiddenByScroll ? " page-stack--scrolling" : ""}`}
        ref={sectionStackRef}
      >
        <svg
          className="page__acacia"
          viewBox="0 0 1600 320"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="acacia__fractal acacia__fractal--left">
            <path className="acacia__branch acacia__branch--trunk" d="M80,320 C78,306 76,288 76,268" />
            <path className="acacia__branch" d="M76,268 C50,258 20,250 -10,246" />
            <path className="acacia__branch" d="M76,268 C104,258 136,250 172,246" />
            <path className="acacia__branch acacia__branch--minor" d="M172,246 C200,240 230,236 258,233" />
            <path className="acacia__branch acacia__branch--minor" d="M172,246 C178,254 184,264 188,272" />
            <path className="acacia__branch acacia__branch--minor" d="M-10,246 C-28,240 -44,236 -58,233" />
            <path className="acacia__branch acacia__branch--minor" d="M-10,246 C-4,254 2,264 6,272" />
            <path className="acacia__branch acacia__branch--twig" d="M258,233 C276,230 292,228 306,226" />
            <path className="acacia__branch acacia__branch--twig" d="M-58,233 C-70,230 -80,228 -88,226" />
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
            <path className="acacia__branch acacia__branch--trunk" d="M756,320 C752,292 748,254 746,212" />
            <path className="acacia__branch" d="M746,212 C690,194 624,180 548,172" />
            <path className="acacia__branch" d="M746,212 C802,194 868,180 944,172" />
            <path className="acacia__branch acacia__branch--minor" d="M548,172 C496,164 442,158 390,154" />
            <path className="acacia__branch acacia__branch--minor" d="M548,172 C556,182 564,194 568,204" />
            <path className="acacia__branch acacia__branch--minor" d="M944,172 C992,164 1046,158 1098,154" />
            <path className="acacia__branch acacia__branch--minor" d="M944,172 C936,182 928,194 924,204" />
            <path className="acacia__branch acacia__branch--twig" d="M390,154 C350,149 312,146 276,144" />
            <path className="acacia__branch acacia__branch--twig" d="M390,154 C382,162 374,172 370,180" />
            <path className="acacia__branch acacia__branch--twig" d="M1098,154 C1136,149 1174,146 1210,144" />
            <path className="acacia__branch acacia__branch--twig" d="M1098,154 C1106,162 1114,172 1118,180" />
            <path className="acacia__branch acacia__branch--twig" d="M276,144 C248,141 222,140 198,139" />
            <path className="acacia__branch acacia__branch--twig" d="M1210,144 C1236,141 1260,140 1282,139" />
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
            <path className="acacia__branch acacia__branch--trunk" d="M1520,320 C1518,306 1516,288 1516,268" />
            <path className="acacia__branch" d="M1516,268 C1490,258 1456,250 1418,246" />
            <path className="acacia__branch" d="M1516,268 C1542,258 1566,250 1592,246" />
            <path className="acacia__branch acacia__branch--minor" d="M1418,246 C1390,240 1360,236 1332,233" />
            <path className="acacia__branch acacia__branch--minor" d="M1418,246 C1424,254 1430,264 1434,272" />
            <path className="acacia__branch acacia__branch--minor" d="M1592,246 C1596,242 1600,238 1602,234" />
            <path className="acacia__branch acacia__branch--twig" d="M1332,233 C1314,230 1298,228 1284,226" />
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
          <main
            className={`page${phaseShiftActive ? " page--phase-shift" : ""}${perfLite ? " page--perf-lite" : ""}`}
          >
            <div className="page__grain" aria-hidden="true" />
            <div className="page__cadence" aria-hidden="true" />
            <div className="page__scanlines" aria-hidden="true" />
            <div className="page__glitch" aria-hidden="true" />
            <div className="page__sweep" aria-hidden="true" />
            <div className="page__ashlar" aria-hidden="true" />
            <div className="page__halo page__halo--one" aria-hidden="true" />
            <div className="page__halo page__halo--two" aria-hidden="true" />
            <div className="page__halo page__halo--three" aria-hidden="true" />

            <section className="hero">
              <div className="hero__mast">
                <h1
                  className="title glitch-title"
                  data-text={displayName}
                  aria-label={canonicalName}
                >
                  {displayName}
                </h1>
                <a
                  className="role-link"
                  href="https://www.tempus.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Senior Software Engineer II @ Tempus AI
                </a>
                <p className="lede">
                  I solve hard problems and build the systems around them.
                </p>
              </div>

              <div className="hero__footer">
                <ul className="signal-list" aria-label="Design signals">
                  {signals.map((signal) => (
                    <li key={signal} className="signal-glitch">
                      {signal}
                    </li>
                  ))}
                </ul>

                <ul className="occult-pulse" aria-label="Occult frame signals">
                  {occultPulse.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                <nav className="link-grid" aria-label="Social links">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.label}
                      className={`link-card${
                        possessedLink?.index === index
                          ? " link-card--possessed"
                          : ""
                      }`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span className="link-card__label">
                        {possessedLink?.index === index
                          ? possessedLink.text
                          : link.label}
                      </span>
                      <span className="link-card__meta">
                        {possessedLink?.index === index
                          ? "ritual-channel"
                          : link.meta}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </section>

            <aside
              className="sigil-panel"
              aria-label="Sacred geometry illustration"
            >
              <ul className="sigil-quotes" aria-label="Occult inscriptions">
                {sigilQuotes.map((quote) => (
                  <li key={quote.text} className={quote.position}>
                    {quote.text}
                  </li>
                ))}
              </ul>
              <Sigil />
            </aside>

            <button
              type="button"
              className="section-arrow section-arrow--hero-up"
              onClick={() => scrollToSection("esoteric")}
              aria-label="Scroll to interests and bio"
              aria-hidden={activeSection === "esoteric"}
              tabIndex={activeSection === "esoteric" ? -1 : 0}
            >
              <span>Interests / Bio</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20V6" />
                <path d="M6 12l6-6 6 6" />
              </svg>
            </button>

            <button
              type="button"
              className="section-arrow section-arrow--down"
              onClick={() => scrollToSection("history")}
              aria-label="Scroll to work history"
              aria-hidden={activeSection === "history"}
              tabIndex={activeSection === "history" ? -1 : 0}
            >
              <span>Work History</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v14" />
                <path d="M6 12l6 6 6-6" />
              </svg>
            </button>
          </main>
        </section>

        <section
          ref={historySectionRef}
          className="page-section page-section--history"
          aria-label="Work history section"
        >
          <div className="work-history">
            <div className="work-history__header">
              <p className="work-history__eyebrow">Field Record</p>
              <h2 className="work-history__title">Work History</h2>
              <p className="work-history__lede">
                Stations in the craft, from startup crucibles to platform-scale
                systems.
              </p>
            </div>

            <ul className="work-history__list" aria-label="LinkedIn history">
              {promotionTracks.map((track) => (
                <li
                  key={track.company}
                  className="work-history__item work-history__item--track"
                >
                  <p className="work-history__company">{track.company}</p>
                  <ol
                    className="work-history__stages"
                    aria-label={`${track.company} progression`}
                  >
                    {track.stages.map((stage) => (
                      <li
                        key={`${track.company}-${stage.period}`}
                        className="work-history__stage"
                      >
                        <p className="work-history__period">{stage.period}</p>
                        <p className="work-history__role">{stage.role}</p>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>

            <div className="section-arrow-row">
              <button
                type="button"
                className="section-arrow section-arrow--up"
                onClick={() => scrollToSection("hero")}
                aria-label="Scroll to top section"
              >
                <span>Return</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 20V6" />
                  <path d="M6 12l6-6 6 6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section
          ref={esotericSectionRef}
          className="page-section page-section--esoteric"
          aria-label="Esoteric bio section"
        >
          <div className="esoteric-bio">
            <p className="esoteric-bio__eyebrow">Inner Chamber</p>
            <h2 className="esoteric-bio__title">Interests / Bio</h2>
            <p className="esoteric-bio__lede">
              Engineering by daylight; by candlelit hours, symbols, rites, and
              old currents of thought.
            </p>
            <ul className="esoteric-bio__list" aria-label="Interests">
              {bioInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>

            <div className="section-arrow-row">
              <button
                type="button"
                className="section-arrow section-arrow--next"
                onClick={() => scrollToSection("hero")}
                aria-label="Scroll down to main section"
              >
                <span>Return</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4v14" />
                  <path d="M6 12l6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>
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
        <a
          className="corner-hit"
          href="https://milodges.com/"
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={-1}
          aria-hidden="true"
        />
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
        <a
          className="corner-mark"
          href="https://milodges.com/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="MILodges — Square and Compass"
          tabIndex={activeSection === "hero" ? 0 : -1}
        >
          <img src="/sc.svg" alt="Square and compass" />
        </a>
      </div>

      {introPhase !== "done" && (
        <div
          className={`intro-screensaver${introPhase === "dismissing" ? " intro-screensaver--dismissing" : ""}`}
          onAnimationEnd={() => setIntroPhase("done")}
          aria-hidden="true"
        >
          <Sigil
            className="intro-screensaver__sigil-art"
            idPrefix="intro-sigil"
            ariaHidden
          />
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
