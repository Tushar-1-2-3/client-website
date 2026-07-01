import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SectionHeading = ({
  eyebrow,
  title,
  description,
  theme = "dark",
  align = "left",
}) => {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const lineRefs = useRef([]);
  const titleWords = title.split(" ");
  const descriptionLines = (description || "")
    .split("\n")
    .filter((line) => line.trim().length > 0);
  const isLight = theme === "light";

  useGSAP(
    () => {
      const words = wordRefs.current.filter(Boolean);
      const lines = lineRefs.current.filter(Boolean);

      gsap.set(words, { yPercent: 115, rotate: 4, transformOrigin: "50% 100%" });
      gsap.set(lines, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
        },
      });

      tl.to(words, {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        stagger: 0.045,
        ease: "power4.out",
      }).to(
        lines,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        },
        "<+0.1"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-8 ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <div
        className={`flex items-center gap-4 text-xs uppercase tracking-[0.45rem] ${
          isLight ? "text-black/60" : "text-white/55"
        }`}
      >
        <span>{eyebrow}</span>
        <span
          className={`h-px w-16 ${
            isLight ? "bg-black/20" : "bg-white/20"
          }`}
        />
      </div>

      <div className="max-w-6xl">
        <h2
          className={`text-[44px] leading-[0.92] uppercase sm:text-[68px] lg:text-[110px] ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {titleWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="mr-[0.18em] inline-flex overflow-hidden pb-[0.08em]"
            >
              <span
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="inline-block will-change-transform"
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
      </div>

      {descriptionLines.length > 0 ? (
        <div
          className={`max-w-2xl text-sm font-light uppercase tracking-[0.22rem] sm:text-base ${
            isLight ? "text-black/65" : "text-white/65"
          }`}
        >
          {descriptionLines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className="block will-change-transform"
            >
              {line}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SectionHeading;
