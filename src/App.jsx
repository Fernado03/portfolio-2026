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
import CommandPalette from "./components/CommandPalette";
import EasterEgg from "./components/EasterEgg";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { motion, useScroll, useSpring } from "framer-motion";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ThemeProvider>
      <div className="noise-overlay bg-bg min-h-[100dvh] text-ink relative overflow-x-hidden">
        <CommandPalette />
        <EasterEgg />
        <ScrollToTop />

        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-40"
          style={{ scaleX }}
        />

        <Navbar />
        <main id="main">
          <Hero />
          <FYPShowcase />
          <Projects />
          <About />
          <Experience />
          <Skills />
          <Awards />
          <Contact />
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </ThemeProvider>
  );
}

export default App;
