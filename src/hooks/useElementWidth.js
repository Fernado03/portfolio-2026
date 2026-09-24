import { useEffect, useRef, useState } from "react";

// Charts draw in real pixels so axis text stays legible at every width.
export default function useElementWidth() {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, width];
}
