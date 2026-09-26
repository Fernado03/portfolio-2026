import { LazyMotion, MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import Research from "./components/Research";
import Experience from "./components/Experience";
import About from "./components/About";
import Recognition from "./components/Recognition";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Components use the lightweight `m.*` elements (`strict` rejects `motion.*`); features load lazily.
const loadMotionFeatures = () => import("./motionFeatures").then((mod) => mod.default);

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Marquee />
          <Work />
          <Research />
          <Experience />
          <About />
          <Recognition />
          <Contact />
        </main>
        <Footer />
        {import.meta.env.PROD && <Analytics />}
        {import.meta.env.PROD && <SpeedInsights />}
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
