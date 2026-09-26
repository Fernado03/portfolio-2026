
export const HERO_CONTENT = {
    name: "Fernado George Anak Mani",
    shortName: "Fernado George",
    title: "Data Scientist & AI Engineer",
    location: "Malaysian Borneo",
    availability: "Internship completed and available now for full-time data science / AI engineering roles",
    availabilityShort: "Available now · full-time DS / AI roles",
    contactNote: "Looking for a data science or AI engineering role in Malaysia or remote. Email is the fastest way to reach me.",
    resumeLink: "/Fernado_George_DataScience_Resume.pdf",
    // Personal address first: the university one may stop working after graduation.
    email: "milobio351@gmail.com",
    altEmail: "fernado_george_bi22@iluv.ums.edu.my",
    phone: "+60143207322",
    linkedin: "https://linkedin.com/in/fernado-george",
    github: "https://github.com/Fernado03",
    // Hero proof strip — every figure traceable to a section further down the page.
    proof: [
        { value: "71.6%", label: "Thesis F1 (multimodal)" },
        { value: "3.75", label: "CGPA · Dean's List" },
        { value: "2", label: "Client systems in production" },
        { value: "4", label: "Featured hackathon builds · 1 Gold, 1 runner-up" },
    ],
};

export const FYP_CONTENT = {
    tagline: "Final Year Thesis",
    title: "Comparative Study of Hybrid Fusion for Robust Multimodal Emotion Recognition",
    description:
        "Addressed the gap between lab performance and real-world application in Emotion Recognition. This study benchmarked Contextual vs. Statistical fusion strategies against noise and missing data, concluding that Ensemble methods offer the highest reliability while Contextual Bi-GRU offers the best efficiency.",
    features: [
        "Robustness benchmark: every model re-scored under Gaussian noise and dropped modalities, not just clean input.",
        "Contextual Bi-GRU: architecture capturing temporal emotion changes better than statistical baselines.",
        "Ensemble strategy: achieved 71.6% F1-score, maintaining stability even under noise.",
    ],
    techStack: ["Python", "PyTorch", "WavLM", "DINOv2", "ModernBERT"],
    demoLink: "https://thesis-presentation-beryl.vercel.app/",
    // The repo is not public (404 for visitors), so the Code button is hidden. Put the URL back
    // once it's public: "https://github.com/Fernado03/thesis-presentation".
    githubLink: null,
    thesisLink: "/documents/Thesis_BI22110436.pdf",
    award: {
        title: "Best Research Award · Final Year Project 2026",
        image: "/awards/best_research_certificate.jpg",
    },
};

// Filter chips for the Work section; each project lists the ids that apply in `tags`.
export const PROJECT_FILTERS = [
    { id: "llm", label: "LLMs & RAG" },
    { id: "ml", label: "Applied ML & vision" },
    { id: "data", label: "Data & MLOps" },
    { id: "impact", label: "Social impact" },
    { id: "web", label: "Full-stack" },
];

export const PROJECTS = [
    {
        id: 1,
        slug: "kinavis",
        tags: ["llm"],
        title: "KinaVis (AI Medical Scribe)",
        category: "AI & Healthcare",
        role: "Team Leader of Development",
        badge: "Gold Medal · Festival Idea Sabah 2025",
        description:
            "Built an AI medical scribe with Google Speech-to-Text and Gemini Pro 2.5, using all-MiniLM-L6-v2 embeddings in a RAG pipeline that grounds generated notes in retrieved context.",
        techStack: ["Google Speech-to-Text", "Gemini Pro 2.5", "RAG", "GCP"],
        image: "/projects/ai_medical_slide_cover.jpg",
        link: "https://github.com/Fernado03/AIMS-final-mvp",
        documentLink: "/documents/ai_medical_scribe.pdf",
    },
    {
        id: 2,
        slug: "ki-konnekt",
        tags: ["llm"],
        title: "KI Konnekt (client RAG assistant)",
        category: "Retrieval & LLM Systems",
        role: "AI/ML Development Intern · Breakfast Byte",
        badge: "Client work, in production",
        description:
            "Gradio-based AI assistant for a German client, running local Ollama models alongside OpenAI workflows. Hybrid BM25 + FAISS retrieval over a multi-format document pipeline (PDF, DOCX, spreadsheets) with streaming responses, so staff query internal documents in natural language instead of searching folders.",
        techStack: ["Python", "Gradio", "Ollama", "OpenAI", "FAISS", "BM25"],
        confidential: true,
        confidentialNote: "Client project: screenshots and repository are private.",
    },
    {
        id: 3,
        slug: "cctv-records",
        tags: ["ml", "data"],
        title: "CCTV-to-records pipeline (car wash)",
        category: "Computer Vision",
        role: "AI/ML Development Intern · Breakfast Byte",
        badge: "Client work, in production",
        description:
            "End-to-end vision pipeline converting a Sarawak car-wash operator's daily CCTV footage into structured service records: vehicle-session detection, multi-bay assignment, license-plate OCR, and wash-action classification, surfaced through a local operator dashboard.",
        techStack: ["Python", "OpenCV", "Object Detection", "OCR", "Video Analytics"],
        confidential: true,
        confidentialNote: "Client project: footage and repository are private.",
    },
    {
        id: 4,
        slug: "matchkami",
        tags: ["llm", "impact"],
        title: "MatchKami (TITANS)",
        category: "NLP & Social Impact",
        role: "Lead Developer",
        badge: "2nd Prize · JomHack Varsity Challenge 2025",
        description:
            "AI-powered matchmaking engine connecting under-resourced schools with NGOs. A Telegram-first intake flow turns a plain-language description of need into a structured request, then ranks verified donors against it. There's no web portal for schools to learn.",
        techStack: ["AI Chatbot", "Telegram API", "NLP", "Python"],
        image: "/projects/matchkami_cover_slide.jpg",
        privateRepo: true,
        documentLink: "/documents/matchkami.pdf",
    },
    {
        id: 5,
        slug: "borneo-hackathon-2024",
        tags: ["web"],
        title: "Borneo Hackathon 2024 Portal",
        category: "Full-Stack Web App",
        role: "Full-Stack Developer",
        badge: "Event complete · 60+ participants · 100% uptime",
        description:
            "Handled real-time registration for 60+ international participants with 100% uptime across the event weekend.",
        techStack: ["React (Vite)", "Node.js", "MongoDB", "Tailwind CSS"],
        image: "/projects/bh24_cover.png",
        link: "https://nightstarde07.wixsite.com/bh24",
        linkText: "Visit site",
    },
    {
        id: 6,
        slug: "barnaclean",
        tags: ["ml", "web"],
        title: "BarnaClean (SeaWise)",
        category: "AI & Marine Tech",
        role: "AI/ML Engineer",
        badge: "Top 8 Finalist · MarineHack 2025",
        description:
            "Predictive maintenance system that flags a hull's biofouling growth before drag builds, so cleaning gets scheduled ahead of the fuel-cost spike instead of after it. The growth model is paired with A* route optimization. On simulated voyage data the combined model projected up to 30% fuel savings (a simulation result, not a sea trial).",
        techStack: ["FastAPI (Python)", "React", "A* Algorithm", "Biofouling ML"],
        image: "/projects/barnaclean_cover.jpg",
        link: "https://github.com/Fernado03/barnacleAI",
        documentLink: "/documents/barnaclean_seawise.pdf",
    },
    {
        id: 7,
        slug: "aramniaga",
        tags: ["llm", "impact", "web"],
        title: "AramNiaga (SixSeven)",
        category: "Social Impact & AI",
        role: "Team Leader & Backend Developer",
        badge: "Borneo Hackathon 2025",
        description:
            "'Zero-tech' AI coaching app for rural micro-entrepreneurs: a localized 'Cikgu' chatbot speaking Bahasa Pasar, photo-to-copywriting generation, and daily missions like 'log today's sales in one voice note'. It's built for owners whose only device is a shared phone.",
        techStack: ["React Native", "Python (NLP)", "Gemini AI", "Gamification"],
        image: "/projects/aramniaga_cover.jpg",
        link: "https://github.com/Fernado03/bh2025-aramniaga",
        documentLink: "/documents/aramniaga.pdf",
    },
    {
        id: 8,
        slug: "hydrogrid",
        tags: ["data", "ml", "llm"],
        title: "HydroGrid Sarawak (Energy & Hydrogen Intelligence)",
        category: "Data Engineering & MLOps",
        role: "Solo Developer",
        badge: "End-to-end telemetry platform · Docker & Kubernetes",
        description:
            "Renewable-energy telemetry platform ingesting live Open-Meteo data into a PostgreSQL star-schema warehouse with a DuckDB OLAP layer and n8n orchestration. LightGBM inflow forecasting and Isolation Forest anomaly detection (MLflow-tracked) are served via FastAPI, with a LangGraph self-correcting SQL agent, a CrewAI strategic panel, and a Streamlit SCADA command center. Everything is containerized with Docker Compose and deployable to Kubernetes.",
        techStack: ["Python", "PostgreSQL", "DuckDB", "LightGBM", "LangGraph", "CrewAI", "FastAPI", "Streamlit", "MLflow", "Docker", "Kubernetes"],
        image: "/projects/hydrogrid_dashboard.png",
        link: "https://github.com/Fernado03/hydrogrid-sarawak",
    },
];

export const ABOUT_CONTENT = {
    bio: [
        "I started out writing small game mods, which turned into a habit of taking systems apart to see how they decide things. That is still what I do, now with retrieval systems and computer vision.",
        "My thesis benchmarked multimodal emotion models under noise and missing inputs, reaching 71.6% F1. My internship work turned a client's document archive into a queryable assistant and their CCTV feed into structured service records. I build the model and the interface that puts it in someone's hands.",
        "Off-hours, I fish.",
    ],
    focus: "Retrieval systems · Computer vision",
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
        { src: "/about/profile_picture.png", alt: "Fernado George, portrait", label: "Portrait" },
        { src: "/about/1748327868606.jpg", alt: "Fernado holding a microphone beside a group wearing lanyards", label: "Group speaker" },
        { src: "/about/FIS.jpg", alt: "Fernado with three people in front of an event screen", label: "Group photo" },
        { src: "/about/photo_2025-10-16_16-39-26.jpg", alt: "Fernado with three people in front of an AI Medical Scribe poster", label: "Project team" },
        { src: "/about/IMG_5574.jpg", alt: "Fernado with three people working on a laptop and circuit board", label: "Prototype work" },
        { src: "/about/IMG_5529.jpg", alt: "Fernado demonstrating tabletop components to three seated participants", label: "Table demo" },
        { src: "/about/IMG_5514.jpg", alt: "Fernado presenting an Arduino workshop slide", label: "Arduino workshop" },
    ],
    hackathons:
        "Four hackathons (MarineHack, JomHack, Festival Idea Sabah and Borneo Hackathon) with one Gold, one second place and one top-8 finish (MarineHack), plus a second top-8 at the ELLM Startup Initiative. Roles ranged from leading the team and owning the backend to solo full-stack delivery.",
    experience: [
        {
            role: "AI/ML Development Intern",
            // Project slugs linked from the Experience section.
            projects: ["ki-konnekt", "cctv-records", "hydrogrid"],
            organization: "Breakfast Byte Sdn. Bhd.",
            location: "Kuching, Sarawak",
            period: "Mar 2026 – Aug 2026 · Completed",
            logo: "/logos/breakfast-byte.com.png",
            description:
                "Six-month AI/ML internship, now completed. Two client systems in production: KI Konnekt, a hybrid BM25/FAISS retrieval assistant for a German client, and a CCTV-to-records computer-vision pipeline for a Sarawak car-wash operator, both written up in Projects. Also built HydroGrid Sarawak, an open-source renewable-energy telemetry platform: PostgreSQL star-schema warehouse with DuckDB OLAP, MLflow-tracked forecasting and anomaly detection served via FastAPI, and LangGraph/CrewAI agents deployed via Docker and Kubernetes.",
        },
        {
            role: "Ketua Exco Akademik dan Kerjaya",
            roleEn: "Head of Academic & Career Committee",
            organization: "Persatuan Mahasiswa Fakulti Komputeran dan Informatik (PMFKI)",
            location: "Universiti Malaysia Sabah",
            period: "Nov 2023 – Aug 2024",
            logo: "/logos/pmfki.png",
            description:
                "Held the academic and career portfolio for the computing faculty's student association, running its academic programmes and industry engagement for a 10-month term.",
        },
        {
            role: "Timbalan Setiausaha",
            roleEn: "Deputy Secretary",
            location: "Universiti Malaysia Sabah",
            period: "Nov 2022 – Aug 2023",
            logo: "/logos/pmfki.png",
            description:
                "Deputy secretary for the association: meeting records, committee correspondence and event documentation across a 10-month term.",
        },
    ],
};

export const SKILLS = [
    {
        category: "Languages",
        items: ["Python", "Java", "C++", "R", "SQL", "SQLAlchemy", "JavaScript", "HTML/CSS"],
    },
    {
        category: "AI & ML",
        items: [
            "Deep Learning",
            "NLP",
            "LLMs (OpenAI, Gemini, Ollama)",
            "RAG (FAISS, BM25)",
            "Computer Vision",
            "LightGBM & Forecasting",
        ],
    },
    {
        category: "Frameworks & Tools",
        items: [
            "PyTorch",
            "TensorFlow",
            "FastAPI",
            "React (Vite)",
            "Node.js",
            "Tailwind CSS",
            "Gradio & Streamlit",
            "LangGraph & CrewAI",
            "MLflow",
            "Docker & Kubernetes",
            "PostgreSQL, MySQL & MongoDB",
            "AWS (ECS, ECR, S3)",
            "Git & CI/CD",
        ],
    },
];

// Titles read "Award · Event"; the Recognition section shows the two parts on separate lines.
export const AWARDS = [
    {
        title: "Best Research Award · Final Year Project 2026",
        image: "/awards/best_research_certificate.jpg",
        highlight: true,
    },
    {
        title: "Certificate of Internship · Breakfast Byte Sdn Bhd 2026",
        image: "/awards/breakfast_byte_carwash.jpg",
    },
    {
        title: "Certificate of Internship · Enterprise AI Chatbot Platform 2026",
        image: "/awards/breakfast_byte_ai_chatbot.jpg",
    },
    { title: "Gold Medal · Festival Idea Sabah 2025", image: "/awards/festival_idea_sabah.jpg", highlight: true },
    { title: "2nd Prize · JomHack Varsity Challenge 2025", image: "/awards/jomhack.jpg", highlight: true },
    { title: "Top 8 Finalist · MarineHack 2025" },
    { title: "Best Computer Science Student Award (Matriculation)" },
    { title: "Top 8 Finalist · ELLM Startup Initiative", image: "/awards/ellm.png" },
];
