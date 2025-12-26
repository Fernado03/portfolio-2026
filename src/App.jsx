import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FYPShowcase from "./components/FYPShowcase";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-white selection:bg-cyan-500/30">
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
