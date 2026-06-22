import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const letters = ["i", "u", "s", "h"];

const containerVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.1,
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  }
};

const letterVariants = {
  initial: { y: "100%" },
  enter: {
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
  }
};

export default function WordsPreloader({ onDone }) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [animateState, setAnimateState] = useState("enter");

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    // Stage 1: Stay visible for 1.8s, then animate text out
    const timer1 = setTimeout(() => {
      setAnimateState("exit");
    }, 1800);

    // Stage 2: Trigger preloader exit animation (which runs for 0.8s container exit + 0.3s delay)
    // We call onDone at 2.45s, which lets the letters exit fully first.
    const timer2 = setTimeout(() => {
      onDone();
    }, 2450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onDone]);

  const curveHeight = Math.min(dimension.width * 0.25, 300);
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + curveHeight} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height} L0 0`;

  return (
    <motion.div
      variants={{
        initial: { top: 0 },
        exit: { top: "-100vh", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }
      }}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[99999] flex h-full w-full items-center justify-center bg-[#0a0a0a]"
    >
      {dimension.width > 0 && (
        <>
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate={animateState}
            className="absolute z-[100000] flex items-center gap-1 text-7xl font-bold uppercase tracking-wider text-white font-amiamie md:text-9xl"
          >
            {letters.map((char, idx) => (
              <span key={idx} className="overflow-hidden inline-block leading-none">
                <motion.span
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.div>
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full pointer-events-none">
            <motion.path
              variants={{
                initial: { d: initialPath, transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] } },
                exit: { d: targetPath, transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.4 } }
              }}
              initial="initial"
              exit="exit"
              className="fill-[#0a0a0a]"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
