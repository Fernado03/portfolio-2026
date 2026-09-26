// "KinaVis (AI Medical Scribe)" -> { name: "KinaVis", aside: "AI Medical Scribe" }
export function splitTitle(title) {
    const match = title.match(/^(.*?)\s*\((.+)\)$/);
    return match ? { name: match[1], aside: match[2] } : { name: title, aside: null };
}

// "Gold Medal · Festival Idea Sabah 2025" -> ["Gold Medal", "Festival Idea Sabah 2025"]
export function splitEvent(text) {
    const [head, ...rest] = text.split(" · ");
    return [head, rest.join(" · ") || null];
}
