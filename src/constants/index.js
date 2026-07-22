
export const HERO_CONTENT = {
    name: "Fernado",
    title: "Data Scientist & Full-Stack Developer",
    subtitle: "Specializing in Generative AI, RAG Systems, and Scalable Web Architecture.",
    availability: "AI/ML Development Intern @ Breakfast Byte",
    resumeLink: "/Fernado_George_DataScience_Intern_Resume.pdf",
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
    demoLink: "https://thesis-presentation-beryl.vercel.app/",
    githubLink: "https://github.com/Fernado03/thesis-presentation",
    thesisLink: "/documents/Thesis_BI22110436.pdf",
    award: {
        title: "Best Research Award 2026",
        image: "/awards/best_research_award.jpg"
    }
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
        privateRepo: true,
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
    profileImages: [
        "/about/profile_picture.png",
        "/about/1748327868606.jpg",
        "/about/FIS.jpg",
        "/about/photo_2025-05-25_00-26-26.jpg",
        "/about/photo_2025-10-16_16-39-26.jpg",
        "/about/IMG_2382 (1).jpg",
        "/about/WhatsApp Image 2025-12-11 at 20.37.04.jpeg",
        "/about/IMG_5574.jpg",
        "/about/IMG_5529.jpg",
        "/about/IMG_5514.jpg"
    ],
    hackathons: "Led teams in 4+ hackathons (MarineHack, JomHack), managing 48-hour sprints to secure 1 Gold & 1 Silver medal. Oversaw full-stack architecture, task delegation, and final product pitching.",
    experience: [
        {
            role: "AI/ML Development Intern",
            organization: "Breakfast Byte Sdn. Bhd.",
            period: "Mar 2026 - Present",
            description: "Kuching, Sarawak • Built KI Konnekt, a Gradio-based AI assistant for a German client integrating local Ollama RAG + OpenAI workflows (hybrid BM25/FAISS retrieval, streaming, multi-format document pipelines). Engineered an end-to-end computer-vision pipeline for a Sarawak car-wash client converting daily CCTV footage into structured records — vehicle-session detection, multi-bay assignment, license-plate OCR, and wash-action classification with a local operator dashboard."
        },
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
        icon: "/skills/tech_languages_icon.png",
    },
    {
        category: "AI & ML",
        items: ["Deep Learning", "NLP", "LLMs (OpenAI, Gemini, Ollama)", "RAG (FAISS, BM25)", "Computer Vision", "Generative AI"],
        icon: "/skills/ai_ml_icon.png",
    },
    {
        category: "Frameworks & Tools",
        items: ["TensorFlow", "PyTorch", "React (Vite)", "Node.js", "Tailwind CSS", "Docker", "GCP", "MongoDB", "Gradio", "Git"],
        icon: "/skills/frameworks_tools_icon.png",
    },
];

export const AWARDS = [
    {
        title: "Best Research Award - Final Year Project 2026",
        image: "/awards/best_research_award.jpg",
    },
    { title: "Gold Medal - Festival Idea Sabah 2025" },
    { title: "2nd Prize - JomHack Varsity Challenge 2025" },
    { title: "Top 8 Finalist - MarineHack 2025" },
    { title: "Best Computer Science Student Award (Matriculation)" },
    { title: "Top 8 Finalist - ELLM Startup Initiative" },
];
