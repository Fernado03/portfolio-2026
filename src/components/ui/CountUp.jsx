import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Counts "71.6%"-style values up from zero once visible, keeping decimals and suffix.
export default function CountUp({ value, className }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
        if (!match || !inView || reduceMotion) return undefined;
        const [, prefix, num, suffix] = match;
        const decimals = (num.split(".")[1] ?? "").length;
        const controls = animate(0, parseFloat(num), {
            duration: 1.4,
            ease: [0.2, 0.7, 0.2, 1],
            onUpdate: (v) => {
                if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [inView, reduceMotion, value]);

    return (
        <span ref={ref} className={className}>
            {value}
        </span>
    );
}
