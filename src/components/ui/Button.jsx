const VARIANT_CLASSES = {
    // text-black on accent keeps contrast above the v2 text-bg flip; matches mock spec.
    primary:
        "bg-ink text-bg hover:bg-accent hover:text-black active:scale-[0.98] transition-all duration-200 px-5 py-2.5",
    secondary:
        "border border-line text-ink hover:border-ink active:scale-[0.98] transition-all duration-200 px-5 py-2.5",
    tertiary:
        "text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent active:scale-[0.98] transition-all duration-200 py-2",
};

const BASE_CLASSES =
    "rounded-none text-xs font-mono uppercase tracking-wider inline-flex items-center justify-center gap-2 min-h-11";

// Anything leaving the site (or opening a document) gets its own tab.
const isExternal = (href) => /^https?:/i.test(href) || /\.pdf($|\?)/i.test(href);

const Button = ({ variant = "primary", href, className = "", children, ...props }) => {
    const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary} ${className}`;

    if (href) {
        const external = isExternal(href);
        return (
            <a
                href={href}
                className={classes}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                {...props}
            >
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
