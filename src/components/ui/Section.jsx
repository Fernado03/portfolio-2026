import React from "react";

const Section = ({ id, className = "", children, ...props }) => {
    return (
        <section id={id} className={`py-24 md:py-32 ${className}`} {...props}>
            <div className="max-w-6xl mx-auto px-6">{children}</div>
        </section>
    );
};

export default Section;
