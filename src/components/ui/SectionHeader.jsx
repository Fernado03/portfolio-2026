import React from "react";

const SectionHeader = ({ eyebrow, title, description, className = "", ...props }) => {
    return (
        <div className={`mb-12 md:mb-16 ${className}`} {...props}>
            {eyebrow && (
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {eyebrow}
                </p>
            )}
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
                {title}
            </h2>
            {description && (
                <p className="text-ink-muted max-w-[65ch] mt-4 leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
