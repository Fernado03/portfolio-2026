import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FYPShowcase from "./components/FYPShowcase";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Global parallax for floating orbs
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div className="bg-slate-950 min-h-screen text-white selection:bg-cyan-500/30 relative overflow-x-hidden cursor-none">
      <CustomCursor />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Global Background - Grid + Floating Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Floating Orbs - Global, no section clipping */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[5%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/15 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[30%] right-[10%] w-[25rem] h-[25rem] bg-cyan-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute top-[60%] left-[5%] w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px]"
        />
        <motion.div
          style={{ y: y4 }}
          className="absolute top-[80%] right-[20%] w-[28rem] h-[28rem] bg-indigo-500/10 rounded-full blur-[110px]"
        />
      </div>

      <Navbar />
      <Hero />
      <FYPShowcase />
      <Projects />
      <About />
      <Skills />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
