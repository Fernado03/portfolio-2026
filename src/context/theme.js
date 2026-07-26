import { createContext, useContext } from "react";

/**
 * Context plus its hook live apart from the provider component so the provider
 * file only exports components (react-refresh keeps fast refresh working).
 */
export const ThemeContext = createContext(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
