import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const text = ``;
  const imageCardRef = useRef(null);
  const imageMaskRef = useRef(null);
  const imageCoverRef = useRef(null);
  const imgRef = useRef(null);
  const boxRefs = useRef([]);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imageMaskRef.current, { xPercent: -100 });
    gsap.set(imgRef.current, { xPercent: 100 });
    gsap.set(imageCoverRef.current, { scaleX: 0, transformOrigin: "left center" });

    const boxes = boxRefs.current.filter(Boolean);
    gsap.set(boxes, { y: 50, opacity: 0 });

    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: imageCardRef.current,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });

    revealTl
      .to(imageCoverRef.current, {
        scaleX: 1,
        duration: 0.55,
        ease: "power4.inOut",
      })
      .to(
        [imageMaskRef.current, imgRef.current],
        {
          xPercent: 0,
          duration: 0.55,
          ease: "power4.inOut",
        },
        ">-0.05"
      )
      .to(imageCoverRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.55,
        ease: "power4.inOut",
      })
      .to(
        boxes,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        ">-0.2"
      );
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Cut with purpose, polished with care"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-16 text-xl font-light tracking-wide sm:px-10 md:text-2xl lg:text-3xl text-white/60">
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:justify-center lg:gap-20 xl:gap-32">
          <div ref={imageCardRef} className="about-photo-reveal w-full max-w-[320px] sm:max-w-md lg:max-w-lg">
            <div className="about-photo-stage">
              <div ref={imageCoverRef} className="about-photo-block" />
              <div ref={imageMaskRef} className="about-photo-mask">
                <img
                  ref={imgRef}
                  src="/images/man.png"
                  alt="Video editor portrait"
                  loading="lazy"
                  decoding="async"
                  className="about-photo-image"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[320px] sm:max-w-md lg:max-w-xl">
            {["Video Editor", "Storytelling Visualizer", "Motion Designer"].map((boxText, i) => (
              <div
                key={i}
                ref={(el) => {
                  boxRefs.current[i] = el;
                }}
                className="bg-black border border-white/10 rounded-2xl px-6 py-4 sm:px-8 sm:py-6 flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <span className="font-amiamie text-lg sm:text-xl lg:text-2xl uppercase tracking-wider text-[#dcd9ce]">
                  {boxText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
