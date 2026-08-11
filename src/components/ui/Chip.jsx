const Chip = ({ children, className = "", ...props }) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-none border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors hover:border-ink hover:text-ink ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Chip;
