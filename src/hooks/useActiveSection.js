import { useEffect, useState } from "react";

// Returns the id of the section currently crossing the upper third of the viewport.
export default function useActiveSection(ids) {
    const [active, setActive] = useState(null);
    const key = ids.join(",");

    useEffect(() => {
        const sections = key
            .split(",")
            .map((id) => document.getElementById(id))
            .filter(Boolean);
        if (!sections.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length) setActive(visible[0].target.id);
            },
            { rootMargin: "-30% 0px -65% 0px" },
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [key]);

    return active;
}
