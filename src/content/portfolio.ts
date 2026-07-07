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
  phone: "[redacted-phone]",
  phoneIndia: "+91 [redacted-phone]",
  github: "https://github.com/ChanchalS7",
  linkedin: "https://linkedin.com/in/chanchals7",
  blog: "https://dev.to/chanchals7",
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
    company: "StackGuardian",
    role: "Founding Software Engineer",
    location: "Bavaria, Germany",
    period: "Jul 2024 — Jun 2025",
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
    location: "New Delhi, India",
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
    location: "Bengaluru, India",
    period: "Oct 2021 — Jun 2023",
    summary:
      "Built internal learning platforms in React and Node.js while mentoring 200+ students into MERN developers.",
    highlights: [
      "Mentored 200+ students on React, Node, and DSA through daily stand-ups, pair programming, and weekly evaluations.",
      "Developed internal products for learning and job-readiness as a React.js and Node.js product developer.",
      "Guided student project builds on the MERN stack, with structured code review and assessment.",
    ],
  },
  {
    company: "Freelance",
    role: "Freelance Web Developer",
    location: "Pune, India",
    period: "Jun 2020 — Sep 2021",
    summary:
      "Started with static sites for local vendors and grew into real-time production work on the MERN stack and Go.",
    highlights: [
      "Built frontend features and REST APIs on MongoDB, working from trainee to junior level under senior developers.",
      "Worked with Jest for testing and handled third-party API integrations.",
      "Built APIs in Golang across Gin, Fiber, and Chi frameworks.",
    ],
  },
];

export const education = [
  {
    school: "Shri G S Institute of Technology & Science",
    degree: "B.E. — Information Technology",
    period: "2016 — 2020",
  },
  {
    school: "L.N. Paliwal Higher Secondary School",
    degree: "Higher Secondary Certificate, PCM",
    period: "2015 — 2016",
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

export const languages = ["English", "Hindi (Native)"];

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
    id: "cloudguard",
    title: "cloudguard — governance",
    lines: [
      { tone: "dim", text: "$ sg policy evaluate --stack prod-eu" },
      { tone: "muted", text: "drift detected: s3 bucket acl public-read" },
      { tone: "command", text: "→ agent remediate --plan" },
      { tone: "result", prefix: "Policy restored", text: " · IaC patch applied" },
    ],
    chips: [
      { text: "K8s · control plane", tone: "signal" },
      { text: "Terraform · plan", tone: "amber" },
      { text: "SDK · generated", tone: "cobalt" },
    ],
    confidence: 97,
    footerLeft: "Governance active",
    footerRight: "policy as code",
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
    slug: "ai-threat-intelligence-workbench",
    title: "Threat Intelligence Console",
    category: "Security",
    year: "2026",
    featured: true,
    sortScore: 100,
    description:
      "A calm investigation workspace for threat intel teams combining AI assistance, evidence context, tenant-aware access, and high-signal risk views.",
    impact:
      "Turned scattered security signals into guided workflows with fewer context switches and clearer analyst priority.",
    stack: ["React", "TypeScript", "TanStack Query", "NestJS", "Keycloak", "PostgreSQL"],
    links: {
      demo: "#contact",
      github: "https://github.com/ChanchalS7",
    },
    metrics: [
      { value: "SOC", label: "operators" },
      { value: "RBAC", label: "access model" },
      { value: "AI", label: "assisted triage" },
    ],
    challenge:
      "Security teams need dense operational context without turning the UI into a wall of alerts and disconnected widgets.",
    solution:
      "I designed reusable investigation modules, separated API/BFF concerns, and kept identity, tenant access, and auditability central to the product architecture.",
    results: [
      "Created product modules that could scale across SOC, Threat Intel, and Threat Hunt workflows.",
      "Reduced interaction friction by grouping evidence, AI context, and action states into one investigation surface.",
      "Built backend access control and audit foundations suitable for security-sensitive enterprise users.",
    ],
  },
  {
    slug: "cloud-governance-control-plane",
    title: "CloudGuard Control Plane",
    category: "Cloud",
    year: "2025",
    featured: true,
    sortScore: 92,
    description:
      "A governance layer for infrastructure teams managing deployment automation, compliance checks, cost visibility, and cloud-native API orchestration.",
    impact:
      "Helped translate policy intent into Kubernetes-backed workflows platform teams could reason about and ship.",
    stack: ["Go", "Node.js", "Kubernetes", "Fern", "React", "Terraform"],
    links: {
      demo: "#contact",
      github: "https://github.com/ChanchalS7",
    },
    metrics: [
      { value: "SDK", label: "developer surface" },
      { value: "K8s", label: "control layer" },
      { value: "API", label: "governance" },
    ],
    challenge:
      "Platform products must expose complex infrastructure decisions without burying users in cloud provider details.",
    solution:
      "I helped build SDK and API layers with clear contracts, reusable UI modules, and workflows that translated governance into concrete deployment actions.",
    results: [
      "Contributed to generated SDKs that improved developer ergonomics.",
      "Built Kubernetes-backed APIs for deployment automation and orchestration.",
      "Supported compliance, cost, and security modules with reusable frontend patterns.",
    ],
  },
  {
    slug: "production-api-delivery-stack",
    title: "Production API Delivery System",
    category: "Backend",
    year: "2024",
    featured: true,
    sortScore: 84,
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
