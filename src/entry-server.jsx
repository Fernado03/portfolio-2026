import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Build-time entry used by scripts/prerender.mjs to write the page's HTML into dist/index.html.
export function render() {
    return renderToString(<App />);
}
