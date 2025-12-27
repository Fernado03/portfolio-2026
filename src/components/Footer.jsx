import React from "react";

const Footer = () => {
    return (
        <footer className="py-6 relative text-center">
            <div className="container mx-auto px-6">
                <p className="text-gray-500 text-sm">
                    Built with <span className="text-cyan-400">React</span> + <span className="text-blue-500">Tailwind</span> + <span className="text-purple-400">Framer Motion</span>
                </p>
                <p className="text-gray-600 text-xs mt-2">
                    © {new Date().getFullYear()} Fernado. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
