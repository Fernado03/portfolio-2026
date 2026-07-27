const Section = ({ id, className = "", children, ...props }) => {
    return (
        <section id={id} className={`py-7 md:py-10 ${className}`} {...props}>
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">{children}</div>
        </section>
    );
};

export default Section;
