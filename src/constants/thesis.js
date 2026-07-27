// Figure data transcribed from the FYP thesis plots in assets-src/projects/.
// MODAL_RELIANCE and CONFUSION are exact cell readings.
// NOISE band values at sigma > 0 are digitised from the plotted curves; the
// sigma = 0 column is exact (it equals the MODAL_RELIANCE baseline column).

export const MODALITY_CONDITIONS = [
    "baseline", "no_audio", "no_visual", "no_text",
    "audio_only", "visual_only", "text_only",
];

// Short codes used for the mobile header row, index-aligned to the above.
export const MODALITY_CODES = ["base", "-aud", "-vis", "-txt", "aud", "vis", "txt"];

// [model, family, ...F1 % per MODALITY_CONDITIONS]
export const MODAL_RELIANCE = [
    ["KNN", "classical", 63.6, 23.5, 53.3, 53.1, 39.4, 26.1, 7.9],
    ["Logistic Regression", "classical", 65.1, 27.9, 57.9, 56.2, 43.9, 25.2, 10.6],
    ["Random Forest", "classical", 65.3, 31.9, 56.4, 56.0, 42.3, 28.8, 15.8],
    ["SVM", "classical", 65.1, 23.6, 58.2, 55.8, 44.2, 23.8, 7.4],
    ["XGBoost", "classical", 64.3, 29.0, 55.0, 55.2, 41.0, 28.1, 10.6],
    ["Contextual V15 early", "contextual", 67.9, 60.8, 57.6, 62.3, 44.5, 54.4, 47.8],
    ["Contextual V15 gated", "contextual", 67.6, 61.1, 54.3, 56.4, 29.2, 49.7, 44.7],
    ["Contextual V15 hier.", "contextual", 60.9, 51.8, 36.2, 52.2, 31.8, 19.8, 30.1],
    ["Contextual V15 late", "contextual", 67.0, 59.7, 53.9, 58.7, 29.3, 44.0, 36.5],
    ["Contextual V23 SDT", "contextual", 65.2, 45.0, 48.5, 50.7, 21.7, 28.4, 30.0],
    ["Statistical early", "statistical", 62.9, 33.7, 41.4, 52.0, 24.9, 20.2, 19.3],
    ["Statistical gated", "statistical", 64.0, 44.1, 51.1, 54.6, 34.9, 30.9, 23.9],
    ["Statistical hier.", "statistical", 64.4, 43.3, 47.7, 51.7, 33.3, 22.9, 20.0],
    ["Statistical late", "statistical", 64.7, 46.3, 51.3, 57.4, 35.9, 30.4, 19.1],
    ["Ensemble (4-model)", "ensemble", 71.6, 64.8, 60.2, 65.3, 44.4, 55.3, 49.7],
];

export const NOISE_SIGMAS = [0, 0.1, 0.2, 0.3, 0.5, 1.0];

// Per-family min/max envelope of weighted F1 (%) across the sigma sweep.
export const NOISE_BANDS = [
    { family: "Classical ML", min: [63.6, 60.0, 52.0, 45.0, 33.0, 18.0], max: [65.3, 63.0, 57.0, 52.0, 40.0, 29.0] },
    { family: "DL Statistical", min: [62.9, 40.0, 28.0, 21.0, 17.0, 14.0], max: [64.7, 52.0, 38.0, 34.0, 27.0, 23.0] },
    { family: "DL Contextual", min: [60.9, 66.0, 63.0, 60.0, 56.0, 47.0], max: [67.9, 68.0, 67.0, 66.0, 63.0, 60.0] },
    { family: "Ensemble", min: [71.6, 71.3, 71.0, 70.6, 69.3, 66.5], max: [71.6, 71.3, 71.0, 70.6, 69.3, 66.5] },
];

export const EMOTIONS = ["angry", "happy", "sad", "neutral", "excited", "frustrated"];

// CONFUSION[trueIdx][predIdx]
export const CONFUSION = [
    [292, 4, 6, 21, 8, 111],
    [0, 154, 11, 21, 50, 2],
    [4, 10, 359, 28, 2, 31],
    [20, 36, 50, 461, 27, 89],
    [11, 51, 4, 28, 307, 16],
    [107, 9, 45, 119, 18, 442],
];
