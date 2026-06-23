import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const softwareList = [
  {
    id: "01",
    name: "Premiere Pro",
    brand: "Adobe",
    accent: "#99f",
    tileBg: "#00005b",
    desc: "Long-form narrative cuts, multi-cam editing, pacing, and audio ducking",
    logoPath: "/images/premiere_logo.svg",
    effects: [
      "Story cuts and cinematic structures",
      "Multi-cam timeline synchronization",
      "Dynamic keyframe audio gain curves",
    ],
  },
  {
    id: "02",
    name: "After Effects",
    brand: "Adobe",
    accent: "#d490c5",
    tileBg: "#1f0740",
    desc: "Kinetic typography, custom transitions, motion tracking, and VFX keyframing",
    logoPath: "/images/aftereffects_logo.svg",
    effects: [
      "High-fidelity camera tracking",
      "Speed ramp motion transformations",
      "Sub-pixel graph editor animation",
    ],
  },
  {
    id: "03",
    name: "DaVinci Resolve",
    brand: "Blackmagic Design",
    accent: "#ffc107",
    tileBg: "#111111",
    desc: "Cinematic color grading, Rec.709 conversions, curves, and HSL masks",
    logoPath: "/images/Davinci-Resolve-Logo-500x500.png",
    effects: [
      "Custom Rec.709 LUT calibration",
      "HSL qualifier skin tone curves",
      "Color wheels shadow and highlights",
    ],
  },
  {
    id: "04",
    name: "CapCut",
    brand: "ByteDance",
    accent: "#ffffff",
    tileBg: "#050505",
    desc: "Retention-first vertical social reels, aggressive cuts, and kinetic captions",
    logoPath: "/images/capcut_logo.svg",
    effects: [
      "Aggressive dead-space removal",
      "Interactive social subtitle styles",
      "Staccato sound FX synchronization",
    ],
  },
  {
    id: "05",
    name: "Filmora",
    brand: "Wondershare",
    accent: "#00fcbf",
    tileBg: "#031b18",
    desc: "Rapid turnaround layout templates, overlay presets, and fast exports",
    logoPath: "/images/Wondershare-Filmora-Logo-Vector.svg-.png",
    effects: [
      "Timeline overlay preset masks",
      "Accelerated hardware exports",
      "Dialogue auto-ducking filters",
    ],
  },
];

const desktopPathD =
  "M 500 0 C 500 135, 315 165, 315 320 C 315 505, 695 530, 695 710 C 695 890, 305 920, 305 1100 C 305 1280, 695 1310, 695 1490 C 695 1670, 500 1710, 500 1880";

const mobilePathD = "M 32 0 L 32 500";

const desktopLayoutPositions = [
  {
    logoLeft: "31.5%",
    logoTop: "320px",
    cardLeft: "44%",
    cardTop: "230px",
    cardWidth: "38%",
    textAlign: "text-left",
  },
  {
    logoLeft: "69.5%",
    logoTop: "710px",
    cardLeft: "18%",
    cardTop: "620px",
    cardWidth: "38%",
    textAlign: "text-right",
  },
  {
    logoLeft: "30.5%",
    logoTop: "1100px",
    cardLeft: "44%",
    cardTop: "1010px",
    cardWidth: "38%",
    textAlign: "text-left",
  },
  {
    logoLeft: "69.5%",
    logoTop: "1490px",
    cardLeft: "18%",
    cardTop: "1400px",
    cardWidth: "38%",
    textAlign: "text-right",
  },
  {
    logoLeft: "50%",
    logoTop: "1880px",
    cardLeft: "28%",
    cardTop: "1945px",
    cardWidth: "44%",
    textAlign: "text-center",
  },
];

const mobileLayoutPositions = [
  {
    logoLeft: "32%",
    logoTop: "26.5%",
    cardTop: "170px",
    cardSide: "left",
    cardWidth: "calc(100% - 5rem)",
  },
  {
    logoLeft: "68%",
    logoTop: "40.8%",
    cardTop: "580px",
    cardSide: "right",
    cardWidth: "calc(100% - 5rem)",
  },
  {
    logoLeft: "32%",
    logoTop: "55%",
    cardTop: "990px",
    cardSide: "left",
    cardWidth: "calc(100% - 5rem)",
  },
  {
    logoLeft: "68%",
    logoTop: "69.5%",
    cardTop: "1400px",
    cardSide: "right",
    cardWidth: "calc(100% - 5rem)",
  },
  {
    logoLeft: "50%",
    logoTop: "86%",
    cardTop: "1810px",
    cardSide: "center",
    cardWidth: "100%",
  },
];

const getViewport = () => {
  if (typeof window === "undefined") {
    return { width: 1280, height: 720 };
  }

  return { width: window.innerWidth, height: window.innerHeight };
};

const LogoNode = ({ sw, compact = false }) => {
  const nodeClass = compact
    ? "size-14 p-2.5"
    : "size-16 p-3 sm:size-[76px] sm:p-3.5 md:size-[92px] md:p-4";
  const imgClass = compact
    ? "h-9 w-9"
    : "h-10 w-10 sm:h-11 sm:w-11 md:h-14 md:w-14";

  return (
    <div
      className={`${nodeClass} group relative grid place-items-center overflow-visible rounded-xl border border-white bg-black transition-transform duration-500 hover:scale-[1.04]`}
      style={{
        background: `linear-gradient(155deg, ${sw.tileBg} 0%, #080808 55%, #050505 100%)`,
        boxShadow: `0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)`,
      }}
    >
      {/* Background glow - positioned relative to the tile itself */}
      <div
        className="absolute -inset-3 rounded-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${sw.accent}22 0%, transparent 70%)`,
        }}
      />
      
      {/* Border outline - positioned relative to the tile itself */}
      <div
        className="absolute -inset-1.5 rounded-xl border border-white opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 pointer-events-none"
      >
        <span
          className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: sw.accent, boxShadow: `0 0 8px ${sw.accent}` }}
        />
        <span
          className="absolute right-0 top-0 size-1.5 -translate-y-1/2 translate-x-1/2 rounded-full"
          style={{ backgroundColor: sw.accent, boxShadow: `0 0 8px ${sw.accent}` }}
        />
        <span
          className="absolute bottom-0 left-0 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full"
          style={{ backgroundColor: sw.accent, boxShadow: `0 0 8px ${sw.accent}` }}
        />
        <span
          className="absolute bottom-0 right-0 size-1.5 translate-x-1/2 translate-y-1/2 rounded-full"
          style={{ backgroundColor: sw.accent, boxShadow: `0 0 8px ${sw.accent}` }}
        />
      </div>

      <div
        className="absolute inset-x-3 top-0 h-px opacity-80"
        style={{
          background: `linear-gradient(90deg, transparent, ${sw.accent}, transparent)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${sw.accent}, transparent 65%)`,
        }}
      />
      <div className="software-logo-reveal relative overflow-hidden">
        <img
          src={sw.logoPath}
          alt={`${sw.name} logo`}
          loading="lazy"
          decoding="async"
          className={`${imgClass} software-logo-art relative object-contain select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}
          draggable="false"
        />
      </div>
    </div>
  );
};

const SoftwareCard = ({ sw, align = "text-left" }) => {
  const justify =
    align === "text-right"
      ? "justify-end"
      : align === "text-center"
        ? "justify-center"
        : "justify-start";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white bg-[#0a0a0a]/80 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 sm:p-6 ${align}`}
    >
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-7 items-center justify-center rounded-md border border-white font-amiamie-round text-[10px] font-black text-white">
              {sw.id}
            </span>
            <span className="font-amiamie-round text-xs font-black uppercase tracking-wide text-white">
              {sw.brand}
            </span>
          </div>
          <h3 className="font-amiamie-round text-2xl font-black leading-tight text-white sm:text-3xl md:text-[2rem]">
            {sw.name}
          </h3>
        </div>
      </div>

      <p className="relative mt-4 font-amiamie-round text-sm font-black leading-relaxed text-white sm:text-base">
        {sw.desc}
      </p>

      <div className={`relative mt-5 flex flex-wrap gap-2 ${justify}`}>
        {sw.effects.map((fx) => (
          <span
            key={fx}
            className="rounded-full border border-white px-3 py-1.5 font-amiamie-round text-[10px] font-black leading-relaxed text-white sm:text-xs"
          >
            {fx}
          </span>
        ))}
      </div>
    </article>
  );
};

const Services = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const pathRef = useRef(null);
  const markerRefs = useRef([]);
  const cardRefs = useRef([]);
  const revealRefs = useRef([]);
  const [dimension, setDimension] = useState(getViewport);
  const isMobile = dimension.width < 768;

  useEffect(() => {
    let frameId = 0;

    const updateViewport = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        setDimension(getViewport());
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("resize", updateViewport);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const nodes = revealRefs.current.filter(Boolean);

    if (!nodes.length || typeof IntersectionObserver !== "function") {
      return undefined;
    }

    const delay = 180;
    const revealQueue = [];
    let timerId = 0;

    const flushQueue = () => {
      timerId = 0;
      const nextNode = revealQueue.shift();

      if (!nextNode) {
        return;
      }

      nextNode.classList.remove("services-reveal-pending");
      nextNode.classList.add("services-reveal-visible");

      if (revealQueue.length > 0) {
        timerId = window.setTimeout(flushQueue, delay);
      }
    };

    const enqueueReveal = (node) => {
      if (
        !node ||
        node.classList.contains("services-reveal-visible") ||
        node.classList.contains("services-reveal-pending") ||
        revealQueue.includes(node)
      ) {
        return;
      }

      node.classList.add("services-reveal-pending");
      revealQueue.push(node);

      if (!timerId) {
        timerId = window.setTimeout(flushQueue, delay);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter(
            (entry) =>
              entry.isIntersecting ||
              entry.boundingClientRect.top <= window.innerHeight - 24
          )
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry) => {
            enqueueReveal(entry.target);
            observer.unobserve(entry.target);
          });
      },
      {
        rootMargin: "0px 0px -24px 0px",
        threshold: 0.01,
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }

      revealQueue.length = 0;
      observer.disconnect();
    };
  }, [isMobile]);

  const pathD = isMobile ? mobilePathD : desktopPathD;
  const layoutPositions = isMobile ? mobileLayoutPositions : desktopLayoutPositions;
  const svgViewBox = isMobile ? "0 0 64 500" : "0 0 1000 2140";
  const timelineHeight = 2140;
  const pathStrokeWidth = isMobile ? 1.45 : 5;
  const gradientId = isMobile ? "service-path-mobile" : "service-path-desktop";
  const glowId = isMobile ? "service-glow-mobile" : "service-glow-desktop";

  useGSAP(
    () => {
      const path = pathRef.current;
      const timeline = timelineRef.current;

      if (!path || !timeline) {
        return;
      }

      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: isMobile ? "top 72%" : "top 62%",
          end: isMobile ? "bottom 30%" : "bottom 58%",
          scrub: isMobile ? 0.8 : 0.65,
          invalidateOnRefresh: true,
        },
      });

      softwareList.forEach((_, index) => {
        const marker = markerRefs.current[index];
        const card = cardRefs.current[index];
        const trigger = isMobile ? card : marker;
        const logoReveal = marker?.querySelector(".software-logo-reveal");
        const logoImage = marker?.querySelector(".software-logo-art");

        if (!trigger) {
          return;
        }

        if (marker) {
          gsap.set(marker, { transformOrigin: "50% 50%" });

          if (logoReveal) {
            gsap.set(logoReveal, {
              clipPath: "inset(100% 0% 0% 0%)",
              autoAlpha: 0,
            });
          }

          if (logoImage) {
            gsap.set(logoImage, {
              yPercent: 18,
              scale: 1.16,
              rotate: -4,
              filter: "blur(8px)",
            });
          }

          if (isMobile) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger,
                start: "top 88%",
                toggleActions: "play none none none",
                once: true,
                invalidateOnRefresh: true,
              },
            });

            tl.fromTo(
              marker,
              {
                autoAlpha: 0,
                scale: 0.88,
                y: 18,
                rotate: 0,
              },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.85,
                ease: "power2.out",
                immediateRender: true,
              }
            );

            if (logoReveal) {
              tl.to(
                logoReveal,
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.65,
                  ease: "power3.out",
                },
                0.08
              );
            }

            if (logoImage) {
              tl.to(
                logoImage,
                {
                  yPercent: 0,
                  scale: 1,
                  rotate: 0,
                  filter: "blur(0px)",
                  duration: 0.9,
                  ease: "power3.out",
                },
                0.08
              );
            }
          } else {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger,
                start: "center 76%",
                toggleActions: "play none none reverse",
              },
            });

            tl.fromTo(
              marker,
              {
                autoAlpha: 0,
                scale: 0.72,
                y: 28,
                rotate: -12,
              },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                rotate: 0,
                duration: 0.8,
                ease: "power3.out",
              }
            );

            if (logoReveal) {
              tl.to(
                logoReveal,
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.6,
                  ease: "power3.out",
                },
                0.1
              );
            }

            if (logoImage) {
              tl.to(
                logoImage,
                {
                  yPercent: 0,
                  scale: 1,
                  rotate: 0,
                  filter: "blur(0px)",
                  duration: 0.85,
                  ease: "power3.out",
                },
                0.1
              );
            }
          }
        }

        if (card) {
          gsap.set(card, { clearProps: "opacity,visibility,transform" });
        }
      });
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  const renderTimelineSvg = (className) => (
    <svg
      className={className}
      viewBox={svgViewBox}
      fill="none"
      preserveAspectRatio={isMobile ? "none" : "xMidYMin meet"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1={isMobile ? "32" : "270"}
          y1="0"
          x2={isMobile ? "32" : "740"}
          y2={isMobile ? "500" : "1880"}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f5d18a" />
          <stop offset="0.5" stopColor="#cfa355" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <filter id={glowId} x="-40%" y="-10%" width="180%" height="120%">
          <feGaussianBlur stdDeviation={isMobile ? "2.2" : "5"} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={pathD}
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth={pathStrokeWidth}
        strokeLinecap="round"
      />
      <path
        ref={pathRef}
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={pathStrokeWidth}
        strokeLinecap="round"
        filter={`url(#${glowId})`}
      />
    </svg>
  );

  const renderDesktopTimeline = () => {
    const containerWidth = Math.min(1000, dimension.width);
    const scale = containerWidth / 1000;
    const scaledTimelineHeight = timelineHeight * scale;

    return (
      <div
        ref={timelineRef}
        className="relative z-10 mx-auto w-full max-w-[1000px] px-6 md:px-0"
        style={{ height: `${scaledTimelineHeight}px` }}
      >
        {renderTimelineSvg("absolute inset-0 h-full w-full pointer-events-none")}

        {softwareList.map((sw, idx) => {
          const pos = layoutPositions[idx];

          return (
            <div key={sw.name} className="contents">
              <div
                ref={(el) => {
                  markerRefs.current[idx] = el;
                }}
                className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 transform-gpu items-center justify-center will-change-[transform,opacity] group"
                style={{ 
                  left: pos.logoLeft, 
                  top: `${parseFloat(pos.logoTop) * scale}px` 
                }}
              >
                <LogoNode sw={sw} />
              </div>

              <div
                ref={(el) => {
                  cardRefs.current[idx] = el;
                  revealRefs.current[idx + 1] = el;
                }}
                className="services-reveal absolute z-10 will-change-[transform,opacity]"
                style={{
                  left: pos.cardLeft,
                  top: `${parseFloat(pos.cardTop) * scale}px`,
                  width: pos.cardWidth,
                }}
              >
                <SoftwareCard sw={sw} align={pos.textAlign} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMobileTimeline = () => (
    <div
      ref={timelineRef}
      className="relative z-10 mx-auto w-full max-w-[430px] px-5 pb-16"
    >
      {renderTimelineSvg("absolute left-5 top-0 h-full w-16 pointer-events-none")}

      {softwareList.map((sw, idx) => (
        <div
          key={`${sw.name}-mobile-row`}
          className="relative min-h-[300px] py-5"
        >
          <div
            ref={(el) => {
              markerRefs.current[idx] = el;
            }}
            className="absolute left-[52px] top-8 z-20 flex -translate-x-1/2 transform-gpu items-center justify-center will-change-[transform,opacity] group"
          >
            <LogoNode sw={sw} compact />
          </div>

          <div
            ref={(el) => {
              cardRefs.current[idx] = el;
              revealRefs.current[idx + 1] = el;
            }}
            className="services-reveal relative z-10 ml-[4.5rem] mt-14 will-change-[transform,opacity]"
          >
            <SoftwareCard sw={sw} align="text-left" />
          </div>

          {idx < softwareList.length - 1 && (
            <div className="absolute bottom-0 left-[52px] h-px w-[calc(100%-4.5rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="services-section section-shell relative flex w-full select-none flex-col items-center overflow-hidden bg-[#050505] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.09]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(207,163,85,0.14),transparent)]" />

      <div
        ref={(el) => {
          revealRefs.current[0] = el;
        }}
        className="services-reveal z-10 mb-12 flex max-w-4xl flex-col items-center gap-5 px-6 text-center sm:mb-16"
      >
        <span className="font-amiamie-round text-xs font-black uppercase tracking-[0.3rem] text-white">
          Active systems
        </span>
        <h2 className="font-amiamie-round text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          Editing pipeline and systems
        </h2>
        <p className="max-w-2xl font-amiamie-round text-sm font-black leading-relaxed text-white sm:text-base">
          Cuts, sound design, color, motion, and delivery tools mapped to one smooth production path.
        </p>
      </div>

      {isMobile ? renderMobileTimeline() : renderDesktopTimeline()}
    </section>
  );
};

export default Services;
