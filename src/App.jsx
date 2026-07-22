import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FYPShowcase from "./components/FYPShowcase";
import Projects from "./components/Projects";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import ChatBot from "./components/ChatBot";
import Preloader from "./components/Preloader";
import EasterEgg from "./components/EasterEgg";
import ScrollToTop from "./components/ScrollToTop";
import SpeedInsightsComponent from "./components/SpeedInsights";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

import { motion, useScroll, useSpring } from "framer-motion";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ThemeProvider>
      {/* Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      <div className={`noise-overlay bg-bg min-h-screen text-ink relative overflow-x-hidden cursor-none ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <CustomCursor />
        <CommandPalette />
        <ChatBot />
        <EasterEgg />
        <ScrollToTop />

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-40"
          style={{ scaleX }}
        />

        {/* Global Background - Grid Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#78716c14_1px,transparent_1px),linear-gradient(to_bottom,#78716c14_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#44403c40_1px,transparent_1px),linear-gradient(to_bottom,#44403c40_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_50%,transparent_100%)]" />
        </div>

        <Navbar />
        <Hero />
        <FYPShowcase />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Awards />
        <Contact />
        <Footer />
        <Analytics />
        <SpeedInsightsComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;

