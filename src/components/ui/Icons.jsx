const base = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
};

export const ArrowUpRight = (props) => (
    <svg {...base} {...props}>
        <path d="M7 17 17 7M8 7h9v9" />
    </svg>
);

export const ArrowRight = (props) => (
    <svg {...base} {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export const ArrowUp = (props) => (
    <svg {...base} {...props}>
        <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
);

export const ChevronLeft = (props) => (
    <svg {...base} {...props}>
        <path d="m15 6-6 6 6 6" />
    </svg>
);

export const ChevronRight = (props) => (
    <svg {...base} {...props}>
        <path d="m9 6 6 6-6 6" />
    </svg>
);

export const Clock = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </svg>
);

export const MapPin = (props) => (
    <svg {...base} {...props}>
        <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
    </svg>
);

export const Close = (props) => (
    <svg {...base} {...props}>
        <path d="M6 6l12 12M18 6 6 18" />
    </svg>
);

export const Menu = (props) => (
    <svg {...base} {...props}>
        <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
);

export const Mail = (props) => (
    <svg {...base} {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
    </svg>
);

export const Phone = (props) => (
    <svg {...base} {...props}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
);

export const Copy = (props) => (
    <svg {...base} {...props}>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </svg>
);

export const Check = (props) => (
    <svg {...base} {...props}>
        <path d="m5 12 5 5 9-10" />
    </svg>
);

export const Lock = (props) => (
    <svg {...base} {...props}>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
);

export const FileText = (props) => (
    <svg {...base} {...props}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
);

export const Download = (props) => (
    <svg {...base} {...props}>
        <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
);

export const Trophy = (props) => (
    <svg {...base} {...props}>
        <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8" />
    </svg>
);

export const Expand = (props) => (
    <svg {...base} {...props}>
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
);

export const Pause = (props) => (
    <svg {...base} {...props}>
        <path d="M9 5v14M15 5v14" />
    </svg>
);

export const Play = (props) => (
    <svg {...base} {...props}>
        <path d="M8 5.5v13l10-6.5z" />
    </svg>
);

export const GitHub = (props) => (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2" />
    </svg>
);

export const LinkedIn = (props) => (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
    </svg>
);
