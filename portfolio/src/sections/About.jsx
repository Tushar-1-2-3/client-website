import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const text = `I shape footage into stories with rhythm,
    emotion, clean visuals, and a finish
    that feels ready for the screen`;
  const aboutText = `I am a video editor focused on cinematic storytelling, clean pacing, and polished delivery. I make every frame serve the message.

Tools I work with:
Premiere Pro for editing and structure
After Effects for motion graphics and logo animation
DaVinci Resolve for color correction and cinematic grading
`;
  const imageCardRef = useRef(null);
  const imageMaskRef = useRef(null);
  const imageCoverRef = useRef(null);
  const imgRef = useRef(null);

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
      });
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
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <div ref={imageCardRef} className="about-photo-reveal w-full max-w-md lg:max-w-lg">
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
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
