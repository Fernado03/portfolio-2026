
export const HERO_CONTENT = {
    name: "Fernado",
    title: "Data Scientist & Full-Stack Developer",
    subtitle: "Specializing in Generative AI, RAG Systems, and Scalable Web Architecture.",
    availability: "🟢 Open for Internship (Mar - Aug 2026)",
    resumeLink: "/resume.pdf",
    email: "milobio351@gmail.com",
    universityEmail: "fernado_george_bi22@iluv.ums.edu.my",
    phone: "+60143207322",
    linkedin: "https://linkedin.com/in/fernado-george",
    github: "https://github.com/Fernado03",
};

export const FYP_CONTENT = {
    tagline: "Final Year Thesis",
    title: "Comparative Study of Hybrid Fusion for Robust Multimodal Emotion Recognition",
    description: "Addressed the gap between lab performance and real-world application in Emotion Recognition. This study benchmarked Contextual vs. Statistical fusion strategies against noise and missing data, concluding that Ensemble methods offer the highest reliability (71.6% F1) while Contextual Bi-GRU offers the best efficiency.",
    features: [
        "The Gauntlet: Rigorous robustness testing against Gaussian noise & missing modalities.",
        "Contextual Bi-GRU: Architecture capturing temporal emotion changes better than statistical baselines.",
        "Ensemble Strategy: Achieved 71.6% F1-score, maintaining stability even under noise."
    ],
    techStack: ["Python", "PyTorch", "WavLM", "DINOv2", "ModernBERT"],
    image: "/projects/fyp_cover_ai.png",
    gallery: [
        { src: "/projects/noise_robustness.png", caption: "Impact of Noise on Model Performance (The Gauntlet)" },
        { src: "/projects/modal_reliance.png", caption: "Modal Reliance Analysis: Impact of Missing Modalities" },
        { src: "/projects/confusion_matrix.png", caption: "Confusion Matrix: Highlighting Angry vs. Frustrated Ambiguity" },
    ],
    demoLink: "",
    githubLink: "",
};

export const PROJECTS = [
    {
        id: 1,
        title: "KinaVis (AI Medical Scribe)",
        category: "AI & Healthcare",
        role: "Team Leader of Development",
        badge: "Gold Medal - Festival Idea Sabah 2025",
        description: "Architected an AI scribe using Google Speech-to-Text & Gemini Pro 2.5. Implemented RAG with 'all-MiniLM-L6-v2' to minimize hallucinations. Proven to reduce documentation time by 3-4 hours daily and administrative costs by 30%.",
        techStack: ["Google Speech-to-Text", "Gemini Pro 2.5", "RAG", "GCP"],
        image: "/projects/ai_medical_slide_cover.jpg",
        link: "https://github.com/Fernado03/AIMS-final-mvp",
        documentLink: "/documents/ai_medical_scribe.pdf",
    },
    {
        id: 2,
        title: "MatchKami (TITANS)",
        category: "NLP & Social Impact",
        role: "Lead Developer",
        badge: "2nd Prize - JomHack Varsity Challenge 2025",
        description: "AI-powered matchmaking engine connecting under-resourced schools with NGOs. Features smart need-matching and a verified donor network. Designed for accessibility to bridge the gap between rural needs and available aid.",
        techStack: ["AI Chatbot", "Telegram API", "NLP", "Python"],
        image: "/projects/matchkami_cover_slide.jpg",
        link: "", // No GitHub repo
        documentLink: "/documents/matchkami.pdf",
    },
    {
        id: 3,
        title: "Borneo Hackathon 2024 Portal",
        category: "Full-Stack Web App",
        role: "Full-Stack Developer",
        badge: "Production-Grade",
        description: "Handled real-time registration for 60+ international participants with 100% uptime. Demonstrates reliability and full-stack architecture.",
        techStack: ["React (Vite)", "Node.js", "MongoDB", "Tailwind CSS"],
        image: "/projects/bh24_cover.png",
        link: "https://nightstarde07.wixsite.com/bh24",
        linkText: "Visit Site",
    },
    {
        id: 4,
        title: "BarnaClean (SeaWise)",
        category: "AI & Marine Tech",
        role: "AI/ML Engineer",
        badge: "Top 8 Finalist - MarineHack 2025",
        description: "Predictive maintenance system moving shipping from reactive to proactive. Features an AI Biofouling Model and A* Search for route optimization. Demonstrated potential fuel savings of 30% and significantly reduced operational downtime.",
        techStack: ["FastAPI (Python)", "React", "A* Algorithm", "Biofouling ML"],
        image: "/projects/barnaclean_cover.jpg",
        link: "https://github.com/Fernado03/barnacleAI",
        documentLink: "/documents/barnaclean_seawise.pdf",
    },
    {
        id: 5,
        title: "AramNiaga (SixSeven)",
        category: "Social Impact & AI",
        role: "Team Leader & Backend Developer",
        badge: "New - Digital Literacy Initiative",
        description: "'Zero-Tech' AI coaching app for rural micro-entrepreneurs. Features localized 'Cikgu' AI chatbot (Bahasa Pasar), Photo Copywriting AI, and gamified daily missions to bridge the digital divide for 25,000+ firms.",
        techStack: ["React Native", "Python (NLP)", "Gemini AI", "Gamification"],
        image: "/projects/aramniaga_cover.jpg",
        link: "https://github.com/Fernado03/bh2025-aramniaga",
        documentLink: "/documents/aramniaga.pdf",
    },
];

export const ABOUT_CONTENT = {
    education: [
        {
            degree: "Bachelor of Computer Science (Data Science) With Honours",
            university: "Universiti Malaysia Sabah",
            year: "2022 – Present",
            details: "CGPA: 3.75 | Dean's List",
        },
        {
            degree: "Science Module II",
            university: "Sarawak College Matriculation",
            year: "2021 – 2022",
            details: "CGPA: 4.00 | Best Computer Science Student Award",
        }
    ],
    narrative: "Final-year Data Science student (CGPA 3.75) and Gold Medalist with a hybrid technical background. Specializing in Generative AI and RAG, I combine advanced data analysis with full-stack engineering skills (React, Node.js) to architect and deploy complete, scalable AI solutions.",
    profileImage: "/profile_picture.png",
    hackathons: "Led teams in 4+ hackathons (MarineHack, JomHack), managing 48-hour sprints to secure 1 Gold & 1 Silver medal. Oversaw full-stack architecture, task delegation, and final product pitching.",
    experience: [
        {
            role: "Ketua Exco Akademik dan Kerjaya",
            organization: "Persatuan Mahasiswa Fakulti Komputeran dan Informatik (PMFKI)",
            period: "Nov 2023 - Aug 2024",
            description: "Full-time • 10 mos | Universiti Malaysia Sabah"
        },
        {
            role: "Timbalan Setiausaha",
            organization: "Persatuan Mahasiswa Fakulti Komputeran dan Informatik (PMFKI)",
            period: "Nov 2022 - Aug 2023",
            description: "Full-time • 10 mos | Universiti Malaysia Sabah • On-site"
        }
    ]
};

export const SKILLS = [
    {
        category: "Languages",
        items: ["Python", "Java", "C++", "R", "SQL", "JavaScript", "HTML/CSS"],
    },
    {
        category: "AI & ML",
        items: ["Deep Learning", "NLP", "LLMs (Gemini Pro)", "RAG", "Computer Vision", "Generative AI"],
    },
    {
        category: "Frameworks & Tools",
        items: ["TensorFlow", "PyTorch", "React (Vite)", "Node.js", "Tailwind CSS", "Docker", "GCP", "Git"],
    },
];

export const AWARDS = [
    "Gold Medal - Festival Idea Sabah 2025",
    "2nd Prize - JomHack Varsity Challenge 2025",
    "Top 8 Finalist - MarineHack 2025",
    "Best Computer Science Student Award (Matriculation)",
    "Top 8 Finalist - ELLM Startup Initiative",
];
