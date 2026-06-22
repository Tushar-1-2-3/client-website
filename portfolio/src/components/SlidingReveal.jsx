import { motion } from "framer-motion";

const SLIDE_DURATION = 1.4;
const EASE = [0.76, 0, 0.24, 1]; // easeInOutQuart

export default function SlidingReveal({ isComplete, children }) {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* Top panel - slides up */}
      <motion.div
        initial={{ y: "0%" }}
        animate={isComplete ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: SLIDE_DURATION, ease: EASE, delay: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "50vh",
          backgroundColor: "#0a0a0a",
          zIndex: 9999,
          transformOrigin: "top",
        }}
      />

      {/* Bottom panel - slides down */}
      <motion.div
        initial={{ y: "0%" }}
        animate={isComplete ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: SLIDE_DURATION, ease: EASE, delay: 0 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50vh",
          backgroundColor: "#0a0a0a",
          zIndex: 9999,
          transformOrigin: "bottom",
        }}
      />

      {/* Your actual page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: SLIDE_DURATION * 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
