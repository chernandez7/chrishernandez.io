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
  const touchStartYRef = useRef<number | null>(null);
  const sanctuaryRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState(canonicalName);
  const [phaseShiftActive, setPhaseShiftActive] = useState(false);
  const [perfLite, setPerfLite] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [sanctuaryInvoked, setSanctuaryInvoked] = useState(false);
  const [sanctuaryCharge, setSanctuaryCharge] = useState(0);
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
    activeSectionRef.current = activeSection;
  }, [activeSection]);

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

    navLockRef.current = true;
    target?.scrollIntoView({
      behavior: prefersReducedMotionRef.current ? "auto" : "smooth",
      block: "start",
    });

    const releaseDelay = prefersReducedMotionRef.current ? 120 : 760;
    window.setTimeout(() => {
      navLockRef.current = false;
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
            <path className="acacia__branch acacia__branch--trunk" d="M700 320 C694 292 686 268 674 244" />
            <path className="acacia__branch" d="M674 244 C656 228 638 214 617 201" />
            <path className="acacia__branch" d="M674 244 C692 227 709 212 726 197" />
            <path className="acacia__branch acacia__branch--minor" d="M617 201 C601 189 586 180 570 171" />
            <path className="acacia__branch acacia__branch--minor" d="M617 201 C603 204 588 209 574 216" />
            <path className="acacia__branch acacia__branch--minor" d="M726 197 C742 186 756 176 771 166" />
            <path className="acacia__branch acacia__branch--minor" d="M726 197 C740 204 755 211 770 222" />
            <path className="acacia__branch acacia__branch--twig" d="M570 171 C560 164 551 159 542 154" />
            <path className="acacia__branch acacia__branch--twig" d="M574 216 C563 219 552 223 542 228" />
            <path className="acacia__branch acacia__branch--twig" d="M771 166 C781 159 790 153 800 146" />
            <path className="acacia__branch acacia__branch--twig" d="M770 222 C781 227 792 234 803 241" />
            <path className="acacia__leaflet" d="M550 160 l10 -4" />
            <path className="acacia__leaflet" d="M560 171 l10 -2" />
            <path className="acacia__leaflet" d="M570 182 l10 1" />
            <path className="acacia__leaflet" d="M579 192 l9 3" />
            <path className="acacia__leaflet" d="M588 188 l10 -4" />
            <path className="acacia__leaflet" d="M598 198 l11 -2" />
            <path className="acacia__leaflet" d="M607 208 l10 2" />
            <path className="acacia__leaflet" d="M620 214 l9 4" />
            <path className="acacia__leaflet" d="M734 187 l11 -4" />
            <path className="acacia__leaflet" d="M744 197 l11 -1" />
            <path className="acacia__leaflet" d="M753 207 l10 2" />
            <path className="acacia__leaflet" d="M762 217 l9 5" />
            <path className="acacia__leaflet" d="M778 203 l9 -4" />
            <path className="acacia__leaflet" d="M788 213 l10 -2" />
            <path className="acacia__leaflet" d="M798 224 l9 2" />
            <path className="acacia__leaflet" d="M807 236 l8 5" />
          </g>
          <g className="acacia__fractal acacia__fractal--center">
            <path className="acacia__branch acacia__branch--trunk" d="M960 320 C954 292 946 266 934 242" />
            <path className="acacia__branch" d="M934 242 C916 225 898 210 878 196" />
            <path className="acacia__branch" d="M934 242 C952 224 969 209 986 194" />
            <path className="acacia__branch acacia__branch--minor" d="M878 196 C862 184 847 175 832 166" />
            <path className="acacia__branch acacia__branch--minor" d="M878 196 C863 200 848 206 834 213" />
            <path className="acacia__branch acacia__branch--minor" d="M986 194 C1002 182 1018 172 1033 162" />
            <path className="acacia__branch acacia__branch--minor" d="M986 194 C1001 202 1016 210 1030 220" />
            <path className="acacia__branch acacia__branch--twig" d="M832 166 C822 160 812 154 802 149" />
            <path className="acacia__branch acacia__branch--twig" d="M834 213 C823 217 813 221 802 226" />
            <path className="acacia__branch acacia__branch--twig" d="M1033 162 C1043 156 1054 149 1064 142" />
            <path className="acacia__branch acacia__branch--twig" d="M1030 220 C1041 225 1052 232 1063 239" />
            <path className="acacia__leaflet" d="M812 154 l10 -4" />
            <path className="acacia__leaflet" d="M822 165 l10 -2" />
            <path className="acacia__leaflet" d="M832 176 l10 1" />
            <path className="acacia__leaflet" d="M841 186 l9 3" />
            <path className="acacia__leaflet" d="M850 182 l10 -4" />
            <path className="acacia__leaflet" d="M861 192 l11 -2" />
            <path className="acacia__leaflet" d="M870 203 l10 2" />
            <path className="acacia__leaflet" d="M882 210 l9 4" />
            <path className="acacia__leaflet" d="M997 183 l11 -4" />
            <path className="acacia__leaflet" d="M1007 194 l11 -1" />
            <path className="acacia__leaflet" d="M1016 204 l10 3" />
            <path className="acacia__leaflet" d="M1025 214 l9 5" />
            <path className="acacia__leaflet" d="M1042 199 l9 -4" />
            <path className="acacia__leaflet" d="M1052 210 l10 -2" />
            <path className="acacia__leaflet" d="M1062 221 l9 2" />
            <path className="acacia__leaflet" d="M1071 233 l8 5" />
          </g>
          <g className="acacia__fractal acacia__fractal--right">
            <path className="acacia__branch acacia__branch--trunk" d="M1220 320 C1214 292 1206 268 1194 244" />
            <path className="acacia__branch" d="M1194 244 C1176 228 1158 214 1137 201" />
            <path className="acacia__branch" d="M1194 244 C1212 227 1229 212 1246 197" />
            <path className="acacia__branch acacia__branch--minor" d="M1137 201 C1121 189 1106 180 1090 171" />
            <path className="acacia__branch acacia__branch--minor" d="M1137 201 C1122 205 1107 210 1092 217" />
            <path className="acacia__branch acacia__branch--minor" d="M1246 197 C1262 186 1277 176 1292 166" />
            <path className="acacia__branch acacia__branch--minor" d="M1246 197 C1261 204 1276 212 1290 222" />
            <path className="acacia__branch acacia__branch--twig" d="M1090 171 C1080 164 1071 159 1062 154" />
            <path className="acacia__branch acacia__branch--twig" d="M1092 217 C1081 220 1071 224 1060 229" />
            <path className="acacia__branch acacia__branch--twig" d="M1292 166 C1302 160 1311 154 1321 147" />
            <path className="acacia__branch acacia__branch--twig" d="M1290 222 C1301 227 1312 234 1323 241" />
            <path className="acacia__leaflet" d="M1070 160 l10 -4" />
            <path className="acacia__leaflet" d="M1080 171 l10 -2" />
            <path className="acacia__leaflet" d="M1090 182 l10 1" />
            <path className="acacia__leaflet" d="M1099 192 l9 3" />
            <path className="acacia__leaflet" d="M1110 188 l10 -4" />
            <path className="acacia__leaflet" d="M1121 198 l11 -2" />
            <path className="acacia__leaflet" d="M1130 208 l10 2" />
            <path className="acacia__leaflet" d="M1142 215 l9 4" />
            <path className="acacia__leaflet" d="M1257 187 l11 -4" />
            <path className="acacia__leaflet" d="M1267 197 l11 -1" />
            <path className="acacia__leaflet" d="M1276 207 l10 2" />
            <path className="acacia__leaflet" d="M1285 217 l9 5" />
            <path className="acacia__leaflet" d="M1300 203 l9 -4" />
            <path className="acacia__leaflet" d="M1310 213 l10 -2" />
            <path className="acacia__leaflet" d="M1320 224 l9 2" />
            <path className="acacia__leaflet" d="M1329 236 l8 5" />
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
