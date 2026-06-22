import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SectionHeading from "../components/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  const containerRef = useRef(null);
  const comparisonRef = useRef(null);
  const sliderClipRef = useRef(null);
  const sliderHandleRef = useRef(null);
  const isHoveredRef = useRef(false);

  const updateSlider = (percentage) => {
    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    if (sliderClipRef.current) {
      sliderClipRef.current.style.clipPath = `polygon(0 0, ${clampedPercentage}% 0, ${clampedPercentage}% 100%, 0 100%)`;
    }

    if (sliderHandleRef.current) {
      sliderHandleRef.current.style.left = `${clampedPercentage}%`;
    }
  };

  // ScrollTrigger animations
  useGSAP(() => {
    // Horizontal sliding tracks (editing channels simulation) using pure GSAP offsets
    gsap.fromTo("#track-1", 
      { xPercent: -20 },
      {
        xPercent: 10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    gsap.fromTo("#track-2", 
      { xPercent: 20 },
      {
        xPercent: -10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Wipe slider animation driven by scroll (runs from 100% LOG to 0% LOG)
    ScrollTrigger.create({
      trigger: comparisonRef.current,
      start: "top bottom",
      end: "bottom center-=150",
      scrub: 0.5,
      onUpdate: (self) => {
        if (!isHoveredRef.current) {
          updateSlider((1 - self.progress) * 100);
        }
      }
    });
  }, { scope: containerRef });

  // Handle mouse move for manual slider dragging
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    updateSlider(percentage);
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <section
      ref={containerRef}
      className="section-shell relative flex w-full flex-col items-center justify-center overflow-hidden border-y border-white/5 bg-[#0a0a0a] py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 select-none opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(207,163,85,0.1),transparent)]" />

      <div className="z-10 mb-12 w-full max-w-[1440px] px-6 sm:mb-16 sm:px-10">
        <SectionHeading
          eyebrow="Color grade comparison"
          title="Before and after the grade"
          description={`Drag or scroll to compare raw log footage against the final cinematic look.`}
          theme="dark"
          align="center"
        />
      </div>

      {/* Interactive monitor showcase */}
      <div
        ref={comparisonRef}
        className="relative z-10 mb-16 w-full max-w-[920px] px-6 md:px-12 sm:mb-20"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_120px_rgba(0,0,0,0.85)]">
          {/* NLE-style top bar */}
          <div className="flex items-center justify-start border-b border-white/8 bg-[#161616] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="hidden" aria-hidden="true">
              DaVinci Resolve — Viewer
            </span>
          </div>

          <div
            className="group relative aspect-video w-full cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Base Layer: Color Graded footage */}
            <div className="absolute inset-0">
              <img
                src="/images/cinematic_shot.png"
                alt="Color Graded Footage"
                loading="lazy"
                decoding="async"
                className="pointer-events-none h-full w-full select-none object-cover"
              />
            </div>

            <div
              ref={sliderClipRef}
              className="pointer-events-none absolute inset-0 select-none"
              style={{
                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              }}
            >
              <img
                src="/images/cinematic_shot.png"
                alt="Raw Log Footage"
                loading="lazy"
                decoding="async"
                className="pointer-events-none h-full w-full select-none object-cover"
                style={{
                  filter: "saturate(0.2) contrast(0.7) brightness(1.05)",
                }}
              />
            </div>

            {/* Interactive Split Divider Handle Line */}
            <div
              ref={sliderHandleRef}
              className="pointer-events-none absolute inset-y-0 z-30 flex flex-col items-center justify-center transition-opacity duration-200"
              style={{ left: "50%" }}
            >
              <div className="h-full w-[2px] bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]" />
              <div className="absolute flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-red-500 shadow-lg transition-transform duration-250 group-hover:scale-110">
                <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        <p className="service-summary-hint mt-8 text-center font-mono text-[10px] uppercase tracking-[0.22rem] text-white/35">
          Drag to compare · Scroll to animate
        </p>
      </div>

      {/* Parallax horizontal timeline text tracks */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-32" />

        <div className="flex flex-col gap-5 font-amiamie text-4xl uppercase leading-none tracking-tighter opacity-25 select-none sm:gap-6 sm:text-6xl md:text-8xl">
          <div id="track-1" className="flex items-center gap-12 whitespace-nowrap">
            <span>Story Cuts</span>
            <span className="font-normal text-gold">Sound Design</span>
            <span>Timeline Pacing</span>
            <span className="font-normal text-gold">Awwwards</span>
            <span>Story Cuts</span>
            <span className="font-normal text-gold">Sound Design</span>
          </div>

          <div id="track-2" className="flex items-center gap-12 whitespace-nowrap font-normal text-gold/90">
            <span>Speed Ramps</span>
            <span className="font-bold text-white">LUTS Grading</span>
            <span>Transitions</span>
            <span className="font-bold text-white">Cinematography</span>
            <span>Speed Ramps</span>
            <span className="font-bold text-white">LUTS Grading</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;
