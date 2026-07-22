import React from "react";

const Chip = ({ children, className = "", ...props }) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-0.5 text-xs font-mono text-ink-muted ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Chip;
