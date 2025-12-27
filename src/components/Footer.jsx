import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="py-8 relative">
            {/* Top Divider */}
            <div className="container mx-auto px-6 mb-6">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-700" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-2 h-2 border border-cyan-400/50 dark:border-cyan-500/50 rotate-45"
                    />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-700" />
                </div>
            </div>

            <div className="container mx-auto px-6 text-center">
                <p className="text-slate-500 dark:text-gray-500 text-sm">
                    Built with <span className="text-cyan-500 dark:text-cyan-400">React</span> + <span className="text-blue-500">Tailwind</span> + <span className="text-purple-500 dark:text-purple-400">Framer Motion</span>
                </p>
                <p className="text-slate-400 dark:text-gray-600 text-xs mt-2">
                    © {new Date().getFullYear()} Fernado. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
