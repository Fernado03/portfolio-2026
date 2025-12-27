import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FYPShowcase from "./components/FYPShowcase";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Footer from "./components/Footer";

import { motion, useScroll, useSpring } from "framer-motion";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-slate-950 min-h-screen text-white selection:bg-cyan-500/30 relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Global Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />
      <Hero />
      <FYPShowcase />
      <Projects />
      <About />
      <Skills />
      <Awards />
      <Footer />
    </div>
  );
}

export default App;
