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
  role: "AI Engineer • Forward Deployed Engineer • Agentic AI • LLM Applications • Golang • Node.js • React • Kubernetes • Cloud • Secure by design",
  location: "Abu Dhabi, UAE",
  email: "chanchalverma.dev@gmail.com",
  github: "https://github.com/chanchalvdev",
  linkedin: "https://linkedin.com/in/chanchalvdev/",
  twitter: "https://x.com/chanchalvdev",
  blog: "https://medium.com/@chanchalvdev",
  headline: "I build AI agents that ship — and keep them safe.",
  summary:
    "AI Engineer and Forward Deployed Engineer — Senior Full Stack AI Engineer at CPX with 5+ years building AI products end to end. I embed with teams, turn messy real-world problems into production agentic systems, and build security in from day one.",
  narrative:
    "I do my best work close to the people who'll use it: sitting with a team, finding the real problem, prototyping an agent in days, then hardening it until it's safe to run in production. Security is my edge, not my title — the agents I build are designed to be trusted.",
};

export const heroRoles = [
  "AI Engineer",
  "Forward Deployed Engineer",
  "Agentic AI Builder",
  "Full Stack AI Engineer",
];

export const heroMetrics = [
  { value: "5+", label: "years experience" },
  { value: "10+", label: "systems shipped" },
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

/** The forward-deployed loop — rendered as the "How I work" steps. */
export const capabilities = [
  {
    title: "Embed",
    short: "Sit with the customer, find the real problem",
    text: "Sit with the team or customer, learn their workflow, and find the problem actually worth solving.",
  },
  {
    title: "Build",
    short: "Prototype agents in days, not quarters",
    text: "Prototype agents, RAG pipelines, and the product around them in days, not quarters — AI as the engine, not decoration.",
  },
  {
    title: "Ship",
    short: "Harden, secure & run in production",
    text: "Harden it for production: evals, observability, identity, permissions, and audit trails designed in from day one.",
  },
];

export const experience = [
  {
    company: "CPX",
    role: "Senior Full Stack AI Engineer",
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
    role: "Senior Full Stack AI Engineer",
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
    school: "University of Colorado Boulder",
    degree: "M.S. — Artificial Intelligence",
    period: "Oct 2026 — Present",
  },
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
    title: "AI & Agentic Systems",
    description: "LLM pipelines, autonomous agents, embeddings, and AI-native product features.",
    items: ["Agentic AI", "LLM Integration", "Ollama", "Qdrant", "RAG", "Prompt Engineering", "Anomaly Detection"],
  },
  {
    title: "Frontend & UI/UX",
    description: "Interfaces, state, data loading, design systems, and product surfaces.",
    items: ["React", "Next.js", "TypeScript", "TanStack Query", "Redux", "Tailwind CSS", "Vite", "Figma"],
  },
  {
    title: "Backend Platforms",
    description: "APIs, service boundaries, auth, integrations, and data workflows.",
    items: ["Go", "Node.js", "NestJS", "Express", "Gin", "Fiber", "GraphQL", "gRPC"],
  },
  {
    title: "Cloud & Security",
    description: "Deployment, governance, identity, secure access, and operational reliability.",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Keycloak", "CI/CD"],
  },
  {
    title: "Data & Operations",
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
    // Slug kept from the project's former name (Go SIEM Agent) so existing
    // links and search results to the case study keep resolving.
    slug: "go-siem-agent-llm-classifier",
    title: "Casewright — Local-first AI Security Analyst",
    category: "Security",
    year: "2026",
    featured: true,
    sortScore: 110,
    caseStudyReady: true,
    description:
      "An open-source, local-first AI security analyst in Go that takes alerts from Wazuh, Elastic or Security Onion from alert to resolved case — grouping related alerts into one case per attack, investigating it with a local or hosted LLM, and proposing a response a person approves.",
    impact:
      "Cheap Sigma and threshold rules catch known attacks with no LLM call; confirmed cases become new rules, so the rules tier keeps growing and fewer events need the model.",
    stack: ["Go", "React", "Sigma", "Gemini", "Ollama", "Qdrant", "PostgreSQL", "Docker"],
    links: {
      github: "https://github.com/chanchalvdev/casewright",
    },
    metrics: [
      { value: "P1–P5", label: "severity triage" },
      { value: "MITRE", label: "ATT&CK mapping" },
      { value: "1 cmd", label: "Docker demo" },
    ],
    challenge:
      "SOC teams drown in alert volume — rule-based tools miss novel attacks, related alerts arrive as disconnected noise, and analysts still cross-reference MITRE ATT&CK, look up IOCs, and write remediation notes by hand for every event.",
    solution:
      "I built a Go backend that parses syslog, uploads and pasted logs, detects known attacks instantly with Sigma and threshold rules, and sends only the rest to an LLM (Gemini, Ollama, or any OpenAI-compatible API) for classification, MITRE mapping and IOC extraction. Related alerts are grouped into incidents, a tool-calling agent investigates P1/P2 cases with AbuseIPDB, OTX, MITRE and similar-event recall, and YAML playbooks propose responses that analysts approve.",
    results: [
      "Incidents and case management: alerts grouped by IP, user or host, with assignee, comments, kill-chain view, full timeline, and a cited AI investigation report per high-severity case.",
      "Human-approved response playbooks — block IP, disable user, isolate host, webhook — with dry-run mode and a full audit log, plus SOC metrics (MTTD, MTTA, MTTR, false-positive rate).",
      "One-command Docker demo replays a prepared attack chain; semantic search over Qdrant embeddings, Prometheus metrics, RBAC users and a WCAG AA light/dark dashboard.",
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
      github: "https://github.com/chanchalvdev/threat-RAG",
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
    title: "Enterprise File Ingestion Platform",
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
      demo: `mailto:${profile.email}`,
      github: "https://github.com/chanchalvdev",
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
      demo: `mailto:${profile.email}`,
      github: "https://github.com/chanchalvdev",
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
  username: "chanchalvdev",
  summary: "Connect a GitHub token to display real contribution data.",
};
