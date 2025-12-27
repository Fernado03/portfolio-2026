import React from "react";
import { motion } from "framer-motion";
import { FYP_CONTENT } from "../constants";

const FYPShowcase = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);

    return (
        <section id="fyp" className="py-20 relative overflow-hidden">

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">{FYP_CONTENT.tagline}</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
                        FYP <span className="text-indigo-500">Showcase</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedImage(FYP_CONTENT.image)}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 aspect-video shadow-2xl">
                            <img
                                src={FYP_CONTENT.image}
                                alt={FYP_CONTENT.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Badge */}
                            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                Final Year Project
                            </div>
                            {/* Click hint */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                                <span className="text-white text-sm font-medium flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                    Click to Enlarge
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side ... (remains same until Gallery) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{FYP_CONTENT.title}</h3>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">{FYP_CONTENT.description}</p>
                        <div className="mb-8">
                            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                Key Innovations
                            </h4>
                            <ul className="space-y-2">
                                {FYP_CONTENT.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                                        <svg className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {FYP_CONTENT.techStack.map((tech, idx) => (
                                <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full hover:bg-white/10 transition-colors">{tech}</span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {FYP_CONTENT.demoLink && <a href={FYP_CONTENT.demoLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-indigo-600/20">Live Demo</a>}
                            {FYP_CONTENT.githubLink && <a href={FYP_CONTENT.githubLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-all hover:scale-105">GitHub Repo</a>}
                        </div>
                    </motion.div>
                </div>

                {/* Research Findings Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                        <span className="w-8 h-px bg-indigo-500/50"></span>
                        Research Findings
                        <span className="w-8 h-px bg-indigo-500/50"></span>
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        {FYP_CONTENT.gallery?.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all cursor-pointer"
                                onClick={() => setSelectedImage(item.src)}
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="w-full h-full object-contain bg-slate-950/80 group-hover:scale-105 transition-transform duration-500 contrast-110 saturate-110"
                                    />
                                    {/* Hover overlay hint */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-400 text-sm font-medium border-l-2 border-indigo-500 pl-3 leading-tight">
                                        {item.caption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-5xl max-h-[90vh] w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    >
                        <button
                            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full screen preview"
                            className="w-full h-full object-contain rounded-lg shadow-2xl border border-white/10 contrast-110 saturate-110"
                        />
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default FYPShowcase;
