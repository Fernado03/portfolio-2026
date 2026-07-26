
export const HERO_CONTENT = {
    name: "Fernado George",
    title: "Data Scientist & Full-Stack Developer",
    subtitle:
        "I build retrieval and computer-vision systems that ship: a 71.6% F1 multimodal emotion thesis, a RAG assistant for a German client, and a CCTV-to-records pipeline running on real footage.",
    availability: "Seeking a data science / AI engineering graduate role — Malaysia or remote, from Sep 2026",
    resumeLink: "/Fernado_George_DataScience_Intern_Resume.pdf",
    email: "fernado_george_bi22@iluv.ums.edu.my",
    altEmail: "milobio351@gmail.com",
    phone: "+60143207322",
    linkedin: "https://linkedin.com/in/fernado-george",
    github: "https://github.com/Fernado03",
};

export const FYP_CONTENT = {
    tagline: "Final Year Thesis",
    title: "Comparative Study of Hybrid Fusion for Robust Multimodal Emotion Recognition",
    description:
        "Addressed the gap between lab performance and real-world application in Emotion Recognition. This study benchmarked Contextual vs. Statistical fusion strategies against noise and missing data, concluding that Ensemble methods offer the highest reliability (71.6% F1) while Contextual Bi-GRU offers the best efficiency.",
    features: [
        "Robustness benchmark: every model re-scored under Gaussian noise and dropped modalities, not just clean input.",
        "Contextual Bi-GRU: architecture capturing temporal emotion changes better than statistical baselines.",
        "Ensemble strategy: achieved 71.6% F1-score, maintaining stability even under noise.",
    ],
    techStack: ["Python", "PyTorch", "WavLM", "DINOv2", "ModernBERT"],
    gallery: [
        { src: "/projects/noise_robustness.png", caption: "Impact of added Gaussian noise on model performance" },
        { src: "/projects/modal_reliance.png", caption: "Modal reliance analysis: impact of missing modalities" },
        { src: "/projects/confusion_matrix.png", caption: "Confusion matrix: highlighting angry vs. frustrated ambiguity" },
    ],
    demoLink: "https://thesis-presentation-beryl.vercel.app/",
    githubLink: "https://github.com/Fernado03/thesis-presentation",
    thesisLink: "/documents/Thesis_BI22110436.pdf",
    award: {
        title: "Best Research Award — Final Year Project 2026",
        image: "/awards/best_research_award.jpg",
    },
};

export const PROJECTS = [
    {
        id: 1,
        title: "KinaVis (AI Medical Scribe)",
        category: "AI & Healthcare",
        role: "Team Leader of Development",
        badge: "Gold Medal — Festival Idea Sabah 2025",
        description:
            "Architected an AI scribe using Google Speech-to-Text & Gemini Pro 2.5. Implemented RAG with 'all-MiniLM-L6-v2' to minimize hallucinations. Proven to reduce documentation time by 3-4 hours daily and administrative costs by 30%.",
        techStack: ["Google Speech-to-Text", "Gemini Pro 2.5", "RAG", "GCP"],
        image: "/projects/ai_medical_slide_cover.jpg",
        link: "https://github.com/Fernado03/AIMS-final-mvp",
        documentLink: "/documents/ai_medical_scribe.pdf",
    },
    {
        id: 2,
        title: "KI Konnekt (client RAG assistant)",
        category: "Retrieval & LLM Systems",
        role: "AI/ML Development Intern — Breakfast Byte",
        badge: "Client work — in production",
        description:
            "Gradio-based AI assistant for a German client, running local Ollama models alongside OpenAI workflows. Hybrid BM25 + FAISS retrieval over a multi-format document pipeline (PDF, DOCX, spreadsheets) with streaming responses, so staff query internal documents in natural language instead of searching folders.",
        techStack: ["Python", "Gradio", "Ollama", "OpenAI", "FAISS", "BM25"],
        confidential: true,
        confidentialNote: "Client project — screenshots and repository are private.",
    },
    {
        id: 3,
        title: "CCTV-to-records pipeline (car wash)",
        category: "Computer Vision",
        role: "AI/ML Development Intern — Breakfast Byte",
        badge: "Client work — in production",
        description:
            "End-to-end vision pipeline converting a Sarawak car-wash operator's daily CCTV footage into structured service records: vehicle-session detection, multi-bay assignment, license-plate OCR, and wash-action classification, surfaced through a local operator dashboard.",
        techStack: ["Python", "OpenCV", "Object Detection", "OCR", "Video Analytics"],
        confidential: true,
        confidentialNote: "Client project — footage and repository are private.",
    },
    {
        id: 4,
        title: "MatchKami (TITANS)",
        category: "NLP & Social Impact",
        role: "Lead Developer",
        badge: "2nd Prize — JomHack Varsity Challenge 2025",
        description:
            "AI-powered matchmaking engine connecting under-resourced schools with NGOs. A Telegram-first intake flow turns a plain-language description of need into a structured request, then ranks verified donors against it — no web portal for schools to learn.",
        techStack: ["AI Chatbot", "Telegram API", "NLP", "Python"],
        image: "/projects/matchkami_cover_slide.jpg",
        privateRepo: true,
        documentLink: "/documents/matchkami.pdf",
    },
    {
        id: 5,
        title: "Borneo Hackathon 2024 Portal",
        category: "Full-Stack Web App",
        role: "Full-Stack Developer",
        badge: "Live — 60+ participants",
        description:
            "Handled real-time registration for 60+ international participants with 100% uptime across the event weekend.",
        techStack: ["React (Vite)", "Node.js", "MongoDB", "Tailwind CSS"],
        image: "/projects/bh24_cover.png",
        link: "https://nightstarde07.wixsite.com/bh24",
        linkText: "Visit site",
    },
    {
        id: 6,
        title: "BarnaClean (SeaWise)",
        category: "AI & Marine Tech",
        role: "AI/ML Engineer",
        badge: "Top 8 Finalist — MarineHack 2025",
        description:
            "Predictive maintenance system moving shipping from reactive to proactive, pairing a biofouling growth model with A* route optimization. On simulated voyage data the combined model projected up to 30% fuel savings — a simulation result, not a sea trial.",
        techStack: ["FastAPI (Python)", "React", "A* Algorithm", "Biofouling ML"],
        image: "/projects/barnaclean_cover.jpg",
        link: "https://github.com/Fernado03/barnacleAI",
        documentLink: "/documents/barnaclean_seawise.pdf",
    },
    {
        id: 7,
        title: "AramNiaga (SixSeven)",
        category: "Social Impact & AI",
        role: "Team Leader & Backend Developer",
        badge: "Borneo Hackathon 2025",
        description:
            "'Zero-tech' AI coaching app for rural micro-entrepreneurs: a localized 'Cikgu' chatbot speaking Bahasa Pasar, photo-to-copywriting generation, and gamified daily missions — built for owners whose only device is a shared phone.",
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
            details: "CGPA 3.75 · Dean's List",
            logo: "/logos/ums.png",
        },
        {
            degree: "Science Module II",
            university: "Sarawak Matriculation College",
            year: "2021 – 2022",
            details: "CGPA 4.00 · Best Computer Science Student Award",
            logo: "/logos/kmsw-crest.png",
        },
    ],
    profileImages: [
        { src: "/about/profile_picture.png", alt: "Fernado George, portrait" },
        { src: "/about/1748327868606.jpg", alt: "Fernado presenting at a university event" },
        { src: "/about/FIS.jpg", alt: "Fernado at Festival Idea Sabah 2025" },
        { src: "/about/photo_2025-05-25_00-26-26.jpg", alt: "Fernado with his hackathon team" },
        { src: "/about/photo_2025-10-16_16-39-26.jpg", alt: "Fernado at a faculty programme" },
        { src: "/about/IMG_2382 (1).jpg", alt: "Fernado at a campus event" },
        { src: "/about/WhatsApp Image 2025-12-11 at 20.37.04.jpeg", alt: "Fernado with course mates" },
        { src: "/about/IMG_5574.jpg", alt: "Fernado on convocation day" },
        { src: "/about/IMG_5529.jpg", alt: "Fernado in academic robes" },
        { src: "/about/IMG_5514.jpg", alt: "Fernado outdoors in Sabah" },
    ],
    hackathons:
        "Led teams across four hackathons — MarineHack, JomHack, Festival Idea Sabah and Borneo Hackathon — taking one Gold, one second place and two top-8 finishes. Owned architecture, task delegation and the final pitch each time.",
    experience: [
        {
            role: "AI/ML Development Intern",
            organization: "Breakfast Byte Sdn. Bhd.",
            location: "Kuching, Sarawak",
            period: "Mar 2026 – Present",
            logo: "/logos/breakfast-byte.com.png",
            description:
                "Two client systems in production: KI Konnekt, a hybrid BM25/FAISS retrieval assistant for a German client, and a CCTV-to-records computer-vision pipeline for a Sarawak car-wash operator. Both are written up in Projects.",
        },
        {
            role: "Ketua Exco Akademik dan Kerjaya",
            organization: "Persatuan Mahasiswa Fakulti Komputeran dan Informatik (PMFKI)",
            location: "Universiti Malaysia Sabah",
            period: "Nov 2023 – Aug 2024",
            description:
                "Held the academic and career portfolio for the computing faculty's student association, running its academic programmes and industry engagement for a 10-month term.",
        },
        {
            role: "Timbalan Setiausaha",
            organization: "Persatuan Mahasiswa Fakulti Komputeran dan Informatik (PMFKI)",
            location: "Universiti Malaysia Sabah",
            period: "Nov 2022 – Aug 2023",
            description:
                "Deputy secretary for the association: meeting records, committee correspondence and event documentation across a 10-month term.",
        },
    ],
};

export const SKILLS = [
    {
        category: "Languages",
        items: ["Python", "Java", "C++", "R", "SQL", "JavaScript", "HTML/CSS"],
        icon: "/skills/tech_languages_icon.png",
    },
    {
        category: "AI & ML",
        items: [
            "Deep Learning",
            "NLP",
            "LLMs (OpenAI, Gemini, Ollama)",
            "RAG (FAISS, BM25)",
            "Computer Vision",
            "Generative AI",
        ],
        icon: "/skills/ai_ml_icon.png",
    },
    {
        category: "Frameworks & Tools",
        items: [
            "TensorFlow",
            "PyTorch",
            "React (Vite)",
            "Node.js",
            "Tailwind CSS",
            "Docker",
            "GCP",
            "MongoDB",
            "Gradio",
            "Git",
        ],
        icon: "/skills/frameworks_tools_icon.png",
    },
];

export const AWARDS = [
    {
        title: "Best Research Award — Final Year Project 2026",
        image: "/awards/best_research_award.jpg",
    },
    { title: "Gold Medal — Festival Idea Sabah 2025" },
    { title: "2nd Prize — JomHack Varsity Challenge 2025" },
    { title: "Top 8 Finalist — MarineHack 2025" },
    { title: "Best Computer Science Student Award (Matriculation)" },
    { title: "Top 8 Finalist — ELLM Startup Initiative" },
];
