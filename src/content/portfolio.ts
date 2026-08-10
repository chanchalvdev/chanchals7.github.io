import type {
  ConsoleScene,
  PortfolioProfile,
  PortfolioProject,
  ProjectCategory,
} from "@/lib/portfolio-contracts";

export type { ConsoleScene, ProjectCategory };
export type Project = PortfolioProject;

export const profile: PortfolioProfile = {
  name: "Chanchal Verma",
  role: "AI Security Engineer • AI Product Engineering • Agentic AI • Golang • Node.js • React • UI/UX • Kubernetes • Cloud • Security",
  location: "Abu Dhabi, UAE",
  email: "chanchal9.dev@gmail.com",
  phone: "+971585025065",
  phoneIndia: "+91 8770516540",
  github: "https://github.com/chanchalvdev",
  linkedin: "https://linkedin.com/in/chanchalvdev/",
  twitter: "https://x.com/chanchalv_dev",
  blog: "https://dev.to/chanchalvdev",
  headline: "I build intelligent systems that scale.",
  summary:
    "Senior Full Stack Engineer with 5+ years building cloud-native solutions — currently leading frontend for AI-powered security systems that detect and respond to cyber threats automatically, and building agentic AI systems that think and adapt on their own.",
  narrative:
    "My best work happens at the intersection of AI and cloud systems: interfaces that stay calm under pressure, backend platforms that stay reliable, and agents that make intelligent decisions faster than we can. That's the future I'm building toward.",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const heroRoles = [
  "AI Security Engineer",
  "Full Stack AI Engineer",
  "Agentic AI Builder",
  "UI/UX Designer",
];

export const heroMetrics = [
  { value: "5+", label: "years experience" },
  { value: "20+", label: "systems shipped" },
  { value: "4", label: "countries worked with" },
  { value: "200+", label: "developers mentored" },
];

export const proofPoints = [
  "React / Next.js",
  "Go / Node.js",
  "Agentic AI / LLMs",
  "AWS / Azure / GCP",
  "Kubernetes",
  "PostgreSQL / Redis",
  "Security / IAM",
  "UI/UX Design",
];

export const capabilities = [
  {
    title: "Secure by design",
    text: "Security is not a final checklist. I build identity, permissions, auditability, and safe defaults into the architecture early — proactive defense against malware, phishing, and emerging attacks.",
  },
  {
    title: "AI-native engineering",
    text: "From LLM-powered threat classification to autonomous agents, I design systems where AI is the engine, not a bolt-on — software that can heal itself and optimize automatically.",
  },
  {
    title: "Product clarity",
    text: "Complex systems only become useful when flows, states, copy, and information hierarchy make decisions easier. I design data-rich interfaces that simplify complex security insights.",
  },
];

export const experience = [
  {
    company: "CPX",
    role: "Senior Full Stack Engineer",
    location: "Abu Dhabi, UAE",
    period: "Aug 2025 — Present",
    summary:
      "Building AI-driven cybersecurity solutions — intelligent agents across frontend and backend that detect and respond to threats in real time.",
    highlights: [
      "Leading frontend development for intuitive, data-rich interfaces that simplify complex security insights for SOC, Threat Intel, and Threat Hunt teams.",
      "Building intelligent agents focused on automation, anomaly detection, and proactive defense against malware, phishing, and emerging cyberattacks.",
      "Designed frontend architecture with TypeScript, TanStack Query, and a NestJS BFF with Keycloak SSO, multi-tenant RBAC, and PostgreSQL audit trails.",
    ],
  },
  {
    company: "HCL Technologies",
    role: "Technical Lead(Golang) ",
    location: "Bengaluru, India",
    period: "Apr 2025 — Aug 2025",
    summary:
      "Golang technical lead for the PCRE and PRD modules — owning Go service design, API contracts, and delivery through to production release.",
    highlights: [
      "Led Go backend development across the PCRE and PRD modules, owning service structure, REST API contracts, and code review standards for the team.",
      "Set Go engineering practices for the team — package layout, error handling, and concurrency patterns — and mentored engineers onto the stack.",
      "Translated enterprise requirements into service contracts and delivery milestones, coordinating with frontend and QA through release.",
    ],
  },
  {
    company: "StackGuardian",
    role: "Founding Software Engineer",
    location: "Germany — Remote",
    period: "Jul 2024 — Mar 2025",
    summary:
      "One of the first engineers building an infrastructure governance platform from absolute scratch.",
    highlights: [
      "Contributed to SG-SDK using Go and Node.js with Fern for SDK generation.",
      "Developed Kubernetes-backed infrastructure APIs for deployment automation and orchestration.",
      "Shaped frontend modules for compliance, cost, and security insights with product and engineering leads.",
    ],
  },
  {
    company: "Thor Solutions",
    role: "Senior Full Stack Engineer",
    location: "Remote, India",
    period: "Jun 2023 — Jun 2024",
    summary:
      "Led backend and cloud delivery for production applications across two client engagements using Go, MERN, AWS, and CI/CD automation.",
    highlights: [
      "Built MERN apps integrating Shopify, WooCommerce, and Etsy — writing the entire backend REST API layer from scratch.",
      "Spearheaded a Golang project with Gin and PostgreSQL for a USA-based client; built the Go backend for a Flutter Android app.",
      "Integrated Stripe, Twilio OTP/calling, and Auth0; deployed on AWS EC2/RDS with Jenkins and GitHub Actions CI/CD pipelines.",
    ],
  },
  {
    company: "Masai School",
    role: "Software Engineer",
    location: "Bengaluru / Remote",
    period: "Oct 2021 — Jun 2023",
    summary:
      "Built internal learning platforms in React and Node.js while mentoring 200+ students into MERN developers.",
    highlights: [
      "Mentored 200+ students on React, Node, and DSA through daily stand-ups, pair programming, and weekly evaluations.",
      "Developed internal products for learning and job-readiness as a React.js and Node.js product developer.",
      "Guided student project builds on the MERN stack, with structured code review and assessment.",
    ],
  },
];

export const education = [
  {
    school: "Shri G S Institute of Technology & Science",
    degree: "B.E. — Information Technology",
    period: "2016 — 2020",
  },
];

export const certifications = [
  "C Language",
  "Python",
  "Go: The Complete Developer's Guide",
];

export const honors = [
  "Marubeni Meritorious Scholarship",
  "Meritorious Students Award",
];

export const languages = ["English (Professional)", "Hindi (Native)", "Arabic (Beginner)"];

export const skillGroups = [
  {
    title: "Frontend & UI/UX",
    description: "Interfaces, state, data loading, design systems, and product surfaces.",
    items: ["React", "Next.js", "TypeScript", "TanStack Query", "Redux", "Tailwind CSS", "Vite", "Figma"],
  },
  {
    title: "Backend platforms",
    description: "APIs, service boundaries, auth, integrations, and data workflows.",
    items: ["Go", "Node.js", "NestJS", "Express", "Gin", "Fiber", "GraphQL", "gRPC"],
  },
  {
    title: "AI & agentic systems",
    description: "LLM pipelines, autonomous agents, embeddings, and AI-native product features.",
    items: ["Agentic AI", "LLM Integration", "Ollama", "Qdrant", "RAG", "Prompt Engineering", "Anomaly Detection"],
  },
  {
    title: "Cloud & security",
    description: "Deployment, governance, identity, secure access, and operational reliability.",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Keycloak", "CI/CD"],
  },
  {
    title: "Data & operations",
    description: "Persistence, caching, queues, audits, and system observability.",
    items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Kafka", "Prisma", "Prometheus", "Temporal"],
  },
];

/**
 * Scenes for the hero terminal visual — one per flagship project.
 * Add a new scene here when you add a project; the hero cycles through them.
 */
export const consoleScenes: ConsoleScene[] = [
  {
    id: "siem-agent",
    title: "siem-agent — live triage",
    lines: [
      { tone: "dim", text: "$ tail -f /var/log/auth.log" },
      { tone: "muted", text: "sshd[2201]: Failed password for root from 203.0.113.7" },
      { tone: "command", text: "→ agent classify --stream" },
      { tone: "result", prefix: "MITRE T1110", text: " · Brute Force" },
    ],
    chips: [
      { text: "P2 · HIGH", tone: "amber" },
      { text: "IOC 203.0.113.7", tone: "coral" },
      { text: "LLM · agentic", tone: "violet" },
    ],
    confidence: 94,
    footerLeft: "Agent online",
    footerRight: "classified in <20s",
  },
  {
    id: "threat-intel",
    title: "threat-intel — investigation",
    lines: [
      { tone: "dim", text: "$ intel lookup --url login-verify[.]net" },
      { tone: "muted", text: "campaign match: credential phishing kit" },
      { tone: "command", text: "→ agent enrich --evidence" },
      { tone: "result", prefix: "TA0001", text: " · Initial Access · phishing" },
    ],
    chips: [
      { text: "P1 · CRITICAL", tone: "coral" },
      { text: "RBAC · tenant-aware", tone: "cobalt" },
      { text: "AI · assisted triage", tone: "violet" },
    ],
    confidence: 91,
    footerLeft: "SOC console",
    footerRight: "fewer context switches",
  },
  {
    id: "ingestion",
    title: "ingestion — archive parsing",
    lines: [
      { tone: "dim", text: "$ ingest submit evidence.7z --10.4GB" },
      { tone: "muted", text: "extract: depth 4 · 12,480 members · ratio ok" },
      { tone: "command", text: "→ worker parse --stream" },
      { tone: "result", prefix: "1.2M records", text: " · 10 IOC classes indexed" },
    ],
    chips: [
      { text: "ZIP · RAR · 7Z · TAR", tone: "signal" },
      { text: "traversal guard", tone: "amber" },
      { text: "OpenSearch · bulk", tone: "cobalt" },
    ],
    confidence: 96,
    footerLeft: "Worker streaming",
    footerRight: "partial success by design",
  },
  {
    id: "delivery",
    title: "delivery — release pipeline",
    lines: [
      { tone: "dim", text: "$ git push origin main" },
      { tone: "muted", text: "ci: build ▸ test ▸ containerize ▸ deploy" },
      { tone: "command", text: "→ pipeline promote --prod" },
      { tone: "result", prefix: "Released", text: " · EC2 + RDS healthy" },
    ],
    chips: [
      { text: "CI/CD · actions", tone: "signal" },
      { text: "AWS · EC2/RDS", tone: "amber" },
      { text: "Go · Gin", tone: "cobalt" },
    ],
    confidence: 99,
    footerLeft: "Pipeline green",
    footerRight: "release in minutes",
  },
];

export const projectCategories = [
  "All",
  "Security",
  "AI",
  "Cloud",
  "Backend",
  "Frontend",
] as const;

export const projects: Project[] = [
  {
    slug: "go-siem-agent-llm-classifier",
    title: "Go SIEM Agent — LLM Classifier",
    category: "Security",
    year: "2025",
    featured: true,
    sortScore: 110,
    caseStudyReady: true,
    description:
      "An AI-native SIEM agent written in Go that classifies any raw log line into a structured threat report — with MITRE ATT&CK mapping, IOC extraction, severity triage, and actionable remediation — in under 20 seconds, using a local-first LLM stack.",
    impact:
      "Turns hours of manual SOC triage into a sub-20-second automated pipeline, reducing analyst time spent on alert noise by eliminating rule-writing and manual MITRE mapping.",
    stack: ["Go", "React", "Qdrant", "Ollama", "PostgreSQL", "Docker", "Prometheus"],
    links: {
      github: "https://github.com/ChanchalS7/go-siem-agent-llm-classifier",
    },
    metrics: [
      { value: "<20s", label: "per classification" },
      { value: "40+", label: "MITRE techniques" },
      { value: "~3k", label: "lines Go" },
    ],
    challenge:
      "SOC teams drown in alert volume — existing rule-based SIEMs require manual signature writing, miss novel attacks, and force analysts to manually cross-reference MITRE ATT&CK, look up IPs, and write remediation notes for every event.",
    solution:
      "I built an AI-native backend in Go where a carefully engineered LLM system prompt acts as the entire detection engine. The prompt encodes severity scales, IOC extraction rules, and MITRE mappings, returning a strict JSON schema on every call. A concurrent worker pool classifies logs in parallel; streaming SSE delivers token-by-token feedback so 15-second calls feel instant.",
    results: [
      "Full threat classification pipeline: attack type, MITRE tactic + technique ID, severity P1–P5, confidence score, IOCs, and remediation — all from a single raw log line.",
      "Semantic search via Qdrant + Ollama embeddings lets analysts find similar past events using natural language, not exact-match rules.",
      "Single Go binary embeds the React dashboard; three Docker containers complete the full stack — zero external dependencies beyond the LLM provider.",
    ],
    coverImage: "/siem-title.png",
    detailImage: "/siem-architecture.png",
  },
  {
    slug: "threat-rag",
    title: "ThreatRAG — Agentic Threat Intelligence RAG",
    category: "Security",
    year: "2026",
    featured: true,
    sortScore: 100,
    caseStudyReady: true,
    description:
      "A spec-first, security-hardened RAG platform that answers analyst questions with cited sources from MITRE ATT&CK, OWASP, and NVD — then runs autonomous multi-agent investigations on any IOC end-to-end.",
    impact:
      "Collapses hours of manual searching across MITRE ATT&CK, NVD, and OWASP into sub-two-second cited answers, and turns end-to-end IOC investigation into an autonomous Researcher→Critic→Reporter pipeline.",
    stack: ["Python", "FastAPI", "LangChain", "LangGraph", "React", "Qdrant", "Ollama", "PostgreSQL"],
    links: {
      github: "https://github.com/ChanchalS7/threat-RAG",
    },
    metrics: [
      { value: "<2s", label: "cited answer (TTFT)" },
      { value: "39/39", label: "tests passing" },
      { value: "3", label: "agent pipeline" },
    ],
    challenge:
      "The knowledge to understand a threat is fragmented across MITRE ATT&CK (STIX), the NVD CVE API, and OWASP PDFs — and generic LLM chat answers security questions without the provenance a SOC needs to trust them, forcing analysts to context-switch and manually investigate every IOC.",
    solution:
      "I built a spec-first FastAPI platform where LangChain LCEL powers cited RAG over locally-embedded knowledge bases, a LangGraph ReAct agent adds live NVD and web-search tools, and a Researcher→Critic→Reporter graph runs autonomous investigations. OWASP LLM Top 10 hardening (injection detection + output redaction) is a tested first-class module, and RAGAs makes answer quality measurable.",
    results: [
      "Cited Q&A pipeline: every answer returns sources from MITRE ATT&CK, OWASP LLM Top 10, and custom PDFs, streamed token-by-token via SSE for sub-two-second time-to-first-token.",
      "Autonomous multi-agent investigation on any IOC (IP, hash, CVE) via a bounded LangGraph loop, with reports persisted to PostgreSQL + pgvector for similarity search over past investigations.",
      "39/39 unit tests, Ruff-clean and Mypy-strict, OWASP-LLM-Top-10 hardened, and RAGAs-evaluated for faithfulness and relevancy — all running on a free-tier local stack (Qdrant + Ollama).",
    ],
    coverImage: "/threatrag-title.png",
    detailImage: "/threatrag-architecture.png",
  },
  {
    slug: "file-ingestion-parser",
    title: "File Ingestion Platform — Archive Parsing & IOC Extraction",
    category: "Security",
    year: "2026",
    featured: true,
    sortScore: 95,
    caseStudyReady: true,
    description:
      "A local-first ingestion platform that takes a 10 GB password-protected archive, recursively unpacks it, detects and parses every member format, extracts ten classes of indicator from each record, and streams the results into PostgreSQL and OpenSearch — with live progress in a React dashboard.",
    impact:
      "Turns an opaque evidence blob into searchable, indicator-tagged records without the API ever touching the data path — and keeps 49,999 good extractions when one member of 50,000 is corrupt.",
    stack: ["Go", "Python", "React", "PostgreSQL", "Redis", "MinIO", "OpenSearch", "Docker"],
    links: {
      github: "https://github.com/chanchalvdev/parser-app",
    },
    metrics: [
      { value: "10 GB", label: "single-file ingest" },
      { value: "10", label: "IOC classes/record" },
      { value: "32", label: "worker tests passing" },
    ],
    challenge:
      "Evidence arrives as one opaque blob — a multi-gigabyte encrypted archive of nested archives holding logs, CSVs, JSON, and infostealer credential dumps in a dozen inconsistent formats. Structure is unknown until you open it, untrusted archives carry path-traversal and zip-bomb payloads aimed at the extractor itself, and any all-or-nothing pipeline throws away thousands of good records the moment one member is malformed.",
    solution:
      "I split the system by language strength: a Go API for presigned direct-to-MinIO uploads, RBAC, and aggregation queries, and a Python worker for detection, recursive extraction, and parsing. Path-traversal and expansion-ratio guards live in the base extractor so every archive format inherits them, a parser registry routes each member with a text fallback so nothing silently fails, and passwords are hashed at the exact function that recognises them — no plaintext credential ever reaches the database, the index, or the UI.",
    results: [
      "10 GB uploads via presigned PUT straight to object storage — the API only handles two small JSON calls, so upload size became a database setting instead of a server-tuning problem.",
      "Recursive ZIP/RAR/7Z/TAR extraction hardened against traversal, absolute and drive paths, and zip bombs by file-count, byte, and expansion-ratio ceilings, with encrypted archives parked as a first-class PASSWORD_REQUIRED state.",
      "Partial success by design: child parse failures are recorded and skipped while the job continues, records batch-load 1,000 at a time into PostgreSQL with OpenSearch as a rebuildable projection, and a search-index outage degrades search without ever failing a job.",
    ],
    coverImage: "/parser-title.png",
    detailImage: "/parser-architecture.png",
  },
  {
    slug: "production-api-delivery-stack",
    title: "Production API Delivery System",
    category: "Backend",
    year: "2024",
    featured: true,
    sortScore: 84,
    confidential: true,
    description:
      "A production backend and delivery system with authentication, payments, notifications, cloud storage, observability, and CI/CD.",
    impact:
      "Improved release speed and reliability by making cloud delivery predictable and repeatable.",
    stack: ["Go", "Gin", "PostgreSQL", "AWS", "Docker", "GitHub Actions"],
    links: {
      demo: "#contact",
      github: "https://github.com/ChanchalS7",
    },
    metrics: [
      { value: "CI/CD", label: "release flow" },
      { value: "AWS", label: "infrastructure" },
      { value: "Go", label: "service layer" },
    ],
    challenge:
      "Production apps needed reliable APIs, third-party integrations, and repeatable deployments without slowing product teams down.",
    solution:
      "I built REST services, integrated critical providers, and automated deployments across AWS infrastructure.",
    results: [
      "Delivered authentication, Stripe, Twilio, Auth0, and database-backed workflows.",
      "Deployed services across EC2, RDS, S3, and DynamoDB.",
      "Mentored developers and improved team code quality through architecture review.",
    ],
  },
  {
    slug: "developer-learning-evaluation-platform",
    title: "Developer Evaluation Platform",
    category: "Frontend",
    year: "2023",
    featured: false,
    sortScore: 68,
    confidential: true,
    description:
      "Internal learning and evaluation tools for developer education, mentoring, code review, and automated feedback workflows.",
    impact:
      "Supported developer growth at scale through structured evaluation and clearer feedback loops.",
    stack: ["Node.js", "React", "MongoDB", "Express", "Testing", "Mentoring"],
    links: {
      demo: "#contact",
      github: "https://github.com/ChanchalS7",
    },
    metrics: [
      { value: "200+", label: "developers" },
      { value: "MERN", label: "core stack" },
      { value: "QA", label: "reviews" },
    ],
    challenge:
      "Mentoring hundreds of developers requires consistent evaluation, clear feedback, and tools that do not add process drag.",
    solution:
      "I built backend modules, reviewed code quality, and supported evaluation automation for student and mentor workflows.",
    results: [
      "Created internal modules for learning operations.",
      "Conducted mock interviews, pair programming, and design reviews.",
      "Improved learning feedback through automation and structured review patterns.",
    ],
  },
];

export const githubActivity = {
  username: "ChanchalS7",
  summary: "Connect a GitHub token to display real contribution data.",
};
