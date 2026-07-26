/** Fired by the navbar trigger so the palette component stays self-contained. */
export const OPEN_PALETTE_EVENT = "command-palette:open";

export const openCommandPalette = () =>
    window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
