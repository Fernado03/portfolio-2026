import React from "react";

const VARIANT_CLASSES = {
    primary:
        "bg-accent text-white hover:bg-accent-strong active:scale-[0.98] transition-all duration-200 px-5 py-2.5",
    secondary:
        "border border-line text-ink hover:border-accent/50 hover:text-accent active:scale-[0.98] transition-all duration-200 px-5 py-2.5",
    tertiary:
        "text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-all duration-200",
};

const BASE_CLASSES =
    "rounded-lg text-sm font-medium inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const Button = ({ variant = "primary", href, className = "", children, ...props }) => {
    const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button type="button" className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
