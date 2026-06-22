import { useEffect, useRef, useState } from "react";
import Marquee from "../components/Marquee";

const ContactSummary = () => {
  const items = ["Story", "Pacing", "Color", "Motion", "Sound"];
  const items2 = [
    "contact me",
    "contact me",
    "contact me",
    "contact me",
    "contact me",
  ];
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const desktopSplitLines = [
    [{ text: `" Let's build a`, className: "" }],
    [
      { text: "cinematic", className: "font-normal" },
      { text: " & ", className: "" },
      { text: "memorable", className: "italic" },
    ],
    [
      { text: "video story ", className: "" },
      { text: "together", className: "text-gold" },
      { text: ' "', className: "" },
    ],
  ];
  const mobileSplitLines = [
    [{ text: `" Let's build a`, className: "" }],
    [
      { text: "cinematic", className: "font-normal" },
      { text: " & ", className: "" },
    ],
    [{ text: "memorable", className: "italic" }],
    [{ text: "video story", className: "" }],
    [
      { text: "together", className: "text-gold" },
      { text: ' "', className: "" },
    ],
  ];
  const activeSplitLines = isMobile ? mobileSplitLines : desktopSplitLines;
  const splitLineCharacters = activeSplitLines.map((line) => {
    let runningIndex = 0;

    return line.flatMap((segment, segmentIndex) =>
      Array.from(segment.text).map((char, index) => {
        const item = {
          key: `segment-${segmentIndex}-char-${index}`,
          char,
          className: segment.className,
          delay: runningIndex * 15,
        };

        runningIndex += 1;
        return item;
      })
    );
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateIsMobile = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsMobile);
      return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }

    mediaQuery.addListener(updateIsMobile);
    return () => mediaQuery.removeListener(updateIsMobile);
  }, []);

  useEffect(() => {
    const textNode = textRef.current;

    if (!textNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(textNode);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-summary-section flex min-h-[100svh] flex-col items-center justify-between gap-8 overflow-visible py-6 mt-16 sm:min-h-screen sm:gap-12 sm:py-0">
      <Marquee items={items} />
      <div className="w-full overflow-visible px-4 py-3 font-light text-center contact-text-responsive sm:px-6">
        <p
          ref={textRef}
          className={`contact-summary-copy contact-summary-strip mx-auto w-fit max-w-full ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {splitLineCharacters.map((line, lineIndex) => (
            <span key={`line-${lineIndex}`} className="contact-summary-row">
              {line.map((character) => (
                <span
                  key={character.key}
                  className={`contact-summary-char ${character.className}`.trim()}
                  style={{ transitionDelay: `${character.delay}ms` }}
                >
                  {character.char === " " ? "\u00A0" : character.char}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
