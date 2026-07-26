import { useState, useEffect } from "react";
import { ThemeContext } from "./theme";

const STORAGE_KEY = "theme";

export const ThemeProvider = ({ children }) => {
    // Light mode is the primary surface; a stored preference wins.
    // index.html applies the class pre-paint from the same key, so there is no flash.
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem(STORAGE_KEY) === "dark"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
