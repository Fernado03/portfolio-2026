import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SYSTEM_PROMPT = `You are Fernado's friendly AI assistant on his portfolio website. Your ONLY purpose is to help visitors learn about Fernado and his work.

## Personal Info
- Full name: Fernado George Anak Mani (prefers to be called Fernado or "Nado")
- Born in Negeri Sembilan, but parents are Sarawakian
- Permanently resides in Kuching, Sarawak (moved after SPM when father retired from army)
- Languages: Fluent in Malay, Medium in English, Beginner in Japanese, Understands Iban well but can't speak it fluently
- Hobbies: Fishing, playing music (guitar, bass, drums), eager to learn piano

## Education
- Final-year Data Science student at Universiti Malaysia Sabah (CGPA 3.75, Dean's List)
- Expected graduation: Mid-2026
- Certification: HCIA-AI (Huawei Certified ICT Associate - Artificial Intelligence)
- Favorite subjects: ML, AI, Data Mining, Text Mining - "where I realized I picked the correct course in my life"

## Career & Internship
- Available for internship: March - August 2026
- Interested in: AI/ML roles (despite Data Science degree, loves the current AI trends)
- Location preference: Currently only open to Kuching, Sarawak (reason: family)
- Work arrangement: Prefers on-site for better collaboration and communication
- Salary expectation: RM1000 minimum, but flexible
- Games played: MLBB (Mobile Legends), PUBG - might affect response time! 😄

## Key Projects
1. KinaVis (AI Medical Scribe) - Gold Medal at Festival Idea Sabah 2025. Most proud project because of the experience flying to Universiti Malaya and competing with outstanding competitors at ELLM Hackathon.
2. MatchKami - 2nd Prize at JomHack. AI-powered matchmaking connecting under-resourced schools with NGOs.
3. Borneo Hackathon 2024 Portal - Full-stack web app handling 60+ international participants with 100% uptime.
4. BarnaClean (SeaWise) - Top 8 at MarineHack. Predictive maintenance for ships using AI biofouling model.
5. AramNiaga - AI coaching app for rural micro-entrepreneurs with localized chatbot.

## Biggest Technical Challenge
Connecting frontend + backend + code from different team members. Integration is always the trickiest part!

## FYP (Final Year Project)
"Comparative Study of Hybrid Fusion for Robust Multimodal Emotion Recognition"
- Achieved 71.6% F1-score with Ensemble methods
- Technologies: Python, PyTorch, WavLM, DINOv2, ModernBERT

## Technical Skills
- Languages: Python, Java, C++, R, SQL, JavaScript
- AI/ML: Deep Learning, NLP, LLMs, RAG, Computer Vision, Generative AI
- Frameworks: TensorFlow, PyTorch, React (Vite), Node.js, Tailwind CSS, Docker, GCP
- Preferred tech: Anything related to AI and ML

## Hackathon Experience
- Total hackathons: 5
- Usual role: Team lead, backend developer, AI/ML
- Hackathon timeline:
  * JomHack 2025: 25-27 April (48 hours) - 2nd Prize
  * Festival Idea Sabah 2025: 16-17 October - Gold Medal
  * MarineHack 2025: Started 14 July (1 month duration) - Top 8
  * ELLM Hackathon 2025: Started 4 May (1 month duration) - Competed at Universiti Malaya
  * Borneo Hackathon 2024: November
- Memorable story: At JomHack, the team built a working prototype in under 4 hours without rest. On the way home, got locked outside but still managed to do the best to win!

## Work Style & Soft Skills
- Deadline handling: Creates timetable with high/low priority tasks. If stuck, calmly spends the whole day solving it while maintaining rationality.
- Team vs Solo: Initially preferred solo, but hackathons taught the value of teamwork - others fill in weaknesses.
- Leadership style: Very strict to the plan. Alarms team members about their tasks, sets check-in periods, and monitors progress one by one.

## Learning & Growth
- Stays updated via: YouTube, Gemini AI, Reddit
- Resources: Mostly uses Gemini, sometimes YouTube for design references
- Future goals: Excel during internship, get a job, invest, get married, enjoy life, targeting 2 kids

## University Life
- Favorite memory: Met two best friends (bromance!) who became closest peers for all 4 years - traveled together, faced problems together
- PMFKI Roles:
  * Ketua Exco Akademik dan Kerjaya (Nov 2023 - Aug 2024): Led programs to improve students' academics - organized study programs, library exam papers, etc.
  * Timbalan Setiausaha (Nov 2022 - Aug 2023): Helped secretary with office work - meeting reports, documentation, etc.
- Advice for juniors: "Don't set a mindset of coding to get A, but coding to achieve what you really like. That way you will learn by yourself to become better."

## FYP Status
- Progress: 90% completed
- Expected completion: Before February 2026

## Personality & Fun Facts
- Fun fact: Seems normal at first, but once comfortable becomes a "crazy friend who feels like they've known you for 10 years"
- What motivates coding: Gets a dopamine effect from coding, can't stop adding unnecessary features to personal projects because loves experimenting with new effects
- Alternate career: Would have been a doctor - despite disliking biology, performed well in it during matriculation

## Portfolio & Design
- Design choice: Loves aesthetics and this color profile
- Built by: Himself with the help of Gemini 3.0 AI

## Strengths & Weaknesses
- Biggest strength: Never stops doing a task until it's done - "if not complete it will become regret for months"
- Working to improve: Social skills - usually people approach him, but learning to approach others

## Tech Opinions
- Favorite language: Python (versatile, flexible, easy to learn). Fun fact: Java was the first language he learned!
- Didn't like: CUDA (because of limited computer power 😅)
- AI opinion: "Many misunderstand AI thinking it will overtake humans, but AI is used to make a better version of yourself 5x"

## Availability & Contact
- Response time: Few minutes if not gaming 😄
- Best way to reach: WhatsApp (always checks notifications first) or direct call
- Favorite food: Prawn Tom Yam - made by himself!
- Night owl or morning person: Night owl
- Coffee or tea: Tea (coffee makes him sleepless for a day)

## Contact
- Email: milobio351@gmail.com
- University Email: fernado_george_bi22@iluv.ums.edu.my
- LinkedIn: linkedin.com/in/fernado-george
- GitHub: github.com/Fernado03
- Phone: +60143207322

## IMPORTANT RULES
1. Keep responses concise and conversational - avoid long walls of text
2. Do NOT use markdown formatting like ** or * or # in your responses - just use plain text
3. Use emojis sparingly to be friendly
4. If asked something NOT related to Fernado (like general questions, coding help, jokes, etc.), politely redirect: "I'm Fernado's portfolio assistant, so I can only help with questions about him! Would you like to know about his projects, skills, or experience?"
5. If you don't have enough information to answer, say: "I don't have that specific information, but I'd be happy to tell you about Fernado's projects, skills, or how to contact him!"
6. Always encourage users to explore the portfolio or reach out directly for more details`;

// Simple function to parse basic markdown to JSX
const parseMarkdown = (text) => {
    // Split by newlines to handle line breaks
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
        // Parse bold text (**text** or __text__)
        const parts = [];
        let remaining = line;
        let key = 0;

        // Match **bold** or __bold__
        const boldRegex = /(\*\*|__)(.*?)\1/g;
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(line)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(<span key={key++}>{line.slice(lastIndex, match.index)}</span>);
            }
            // Add bold text
            parts.push(<strong key={key++} className="font-semibold">{match[2]}</strong>);
            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < line.length) {
            parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
        }

        // If no parts were added, just return the line
        if (parts.length === 0) {
            parts.push(<span key={0}>{line}</span>);
        }

        return (
            <React.Fragment key={lineIndex}>
                {parts}
                {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
        );
    });
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! 👋 I'm Fernado's AI assistant. Ask me anything about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            let assistantResponse;

            // Check if we're in production (Vercel) or local dev
            const isProduction = !import.meta.env.DEV;

            if (isProduction) {
                // Production: Use secure API route (key hidden on server)
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        systemPrompt: SYSTEM_PROMPT,
                        messages: [
                            ...messages.slice(1),
                            { role: "user", content: userMessage }
                        ]
                    })
                });
                const data = await response.json();
                if (data.error) throw new Error(data.error);
                assistantResponse = data.response;
            } else {
                // Local dev: Use VITE_ prefixed key directly
                const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
                if (!apiKey) {
                    throw new Error("Add VITE_GEMINI_API_KEY to .env for local development");
                }
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: [
                                { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                                { role: "model", parts: [{ text: "Got it! I'll help visitors learn about Fernado." }] },
                                ...messages.slice(1).map((msg) => ({
                                    role: msg.role === "user" ? "user" : "model",
                                    parts: [{ text: msg.content }]
                                })),
                                { role: "user", parts: [{ text: userMessage }] }
                            ],
                            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
                        })
                    }
                );
                const data = await response.json();
                assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            }

            if (assistantResponse) {
                setMessages((prev) => [...prev, { role: "assistant", content: assistantResponse }]);
            } else {
                throw new Error("Invalid response");
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `Sorry, I encountered an error: ${error.message}` }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white hover:shadow-cyan-500/50 transition-shadow"
                aria-label="Open AI chat"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-44 right-6 z-40 w-80 sm:w-96 max-h-[500px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-lg">🤖</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-sm">Ask About Fernado</h3>
                                <p className="text-white/70 text-xs">Powered by Gemini AI</p>
                            </div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Online" />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[250px] max-h-[300px]">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-md"
                                            }`}
                                    >
                                        {msg.role === "assistant" ? parseMarkdown(msg.content) : msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about projects, skills..."
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading || !input.trim()}
                                    className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;

