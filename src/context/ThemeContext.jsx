import { useState, useEffect } from "react";
import { ThemeContext } from "./theme";

const STORAGE_KEY = "theme";

const prefersDark = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const stored = () => {
    try {
        const v = localStorage.getItem(STORAGE_KEY);
        return v === "dark" || v === "light" ? v : null;
    } catch {
        return null;
    }
};

export const ThemeProvider = ({ children }) => {
    // Auto surface: follow the OS until the user picks a side, then persist.
    // index.html applies the same resolution pre-paint, so there is no flash.
    const [isDark, setIsDark] = useState(() => stored() ? stored() === "dark" : prefersDark());

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);

        const color = isDark ? "#101014" : "#FAF9F5";
        document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute("content", color));
    }, [isDark]);

    // Track the OS while no explicit choice is stored. Writing localStorage on
    // mount would freeze the first-visit preference and break auto forever.
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = (e) => {
            if (stored() === null) setIsDark(e.matches);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const toggleTheme = () =>
        setIsDark((prev) => {
            const next = !prev;
            try {
                localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
            } catch { /* storage blocked — the toggle still works for this session */ }
            return next;
        });

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
