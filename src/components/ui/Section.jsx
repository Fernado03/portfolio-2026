const Section = ({ id, className = "", children, ...props }) => {
    return (
        <section id={id} className={`py-16 md:py-24 ${className}`} {...props}>
            <div className="relative z-10 mx-auto w-full max-w-6xl px-6">{children}</div>
        </section>
    );
};

export default Section;
