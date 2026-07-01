import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Hero = () => {
  const heroRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const text = "";

  useEffect(() => {
    const heroNode = heroRef.current;

    if (!heroNode || typeof IntersectionObserver !== "function") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(heroNode);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      <div className="relative flex min-h-screen origin-center flex-col justify-end">
        {/* Top Left Header (My Portfolio) */}
        <div className="absolute top-12 left-10 z-20">
          <span className="font-sans font-bold text-[18px] tracking-[0.1rem] text-black">
            MY PORTFOLIO
          </span>
        </div>

        <AnimatedHeaderSection
          subTitle={"Video Editor & Visual Storyteller"}
          title={"IUSH"}
          text={text}
          textColor={"text-black"}
          isHome={true}
        />
        <figure
          className="absolute inset-0 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Canvas
            dpr={[1, 1.25]}
            frameloop={isHeroVisible ? "always" : "never"}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            performance={{ min: 0.75 }}
            camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          >
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              <Planet scale={isMobile ? 0.7 : 1} />
              <Environment resolution={64}>
                <group rotation={[-Math.PI / 3, 4, 1]}>
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[0, 5, -9]}
                    scale={10}
                  />
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[0, 3, 1]}
                    scale={10}
                  />
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[-5, -1, -1]}
                    scale={10}
                  />
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[10, 1, 0]}
                    scale={16}
                  />
                </group>
              </Environment>
            </Suspense>
          </Canvas>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
