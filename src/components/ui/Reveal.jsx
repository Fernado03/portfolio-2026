import { m } from "framer-motion";

// The huge top margin counts everything above the viewport as seen, so a block scrolled past before
// hydration (the HTML is pre-rendered hidden) or during a fast flick still reveals.
const VIEWPORT = { once: true, margin: "100000px 0px -60px 0px" };

export default function Reveal({ delay = 0, className, children }) {
    return (
        <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay }}
            className={className}
        >
            {children}
        </m.div>
    );
}
