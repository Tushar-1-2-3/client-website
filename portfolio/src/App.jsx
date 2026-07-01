import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import WordsPreloader from "./components/WordsPreloader";
import SlidingReveal from "./components/SlidingReveal";
import { AnimatePresence } from "framer-motion";

const About = lazy(() => import("./sections/About"));
const ServiceSummary = lazy(() => import("./sections/ServiceSummary"));
const Services = lazy(() => import("./sections/Services"));
const Works = lazy(() => import("./sections/Works"));
const ContactSummary = lazy(() => import("./sections/ContactSummary"));
const Contact = lazy(() => import("./sections/Contact"));

const App = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [revealDone, setRevealDone] = useState(false);

  useEffect(() => {
    if (!splashDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [splashDone]);

  useEffect(() => {
    if (splashDone) {
      // Delay mounting until the 1.4s slide animation is complete
      const timer = setTimeout(() => {
        setRevealDone(true);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [splashDone]);

  return (
    <ReactLenis
      root
      className="relative min-h-screen overflow-x-hidden"
      options={{
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      }}
    >
      <AnimatePresence mode="wait">
        {!splashDone && <WordsPreloader onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      <SlidingReveal isComplete={splashDone}>
        {revealDone && (
          <>
            <Navbar />
            <div className="main flex flex-col">
              <Hero />
              <Suspense fallback={null}>
                <About />
                <Works />
                <ServiceSummary />
                <Services />
                <ContactSummary />
                <Contact />
              </Suspense>
            </div>
          </>
        )}
      </SlidingReveal>
    </ReactLenis>
  );
};

export default App;
