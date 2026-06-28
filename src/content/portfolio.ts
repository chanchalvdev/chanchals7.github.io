import type {
  PortfolioProfile,
  PortfolioProject,
  ProjectCategory,
} from "@/lib/portfolio-contracts";

export type { ProjectCategory };
export type Project = PortfolioProject;

export const profile: PortfolioProfile = {
  name: "Chanchal Verma",
  role: "AI Security Engineer • Product Engineering • Agentic AI • Golang • Node.js • React • Kubernetes • UI/UX",
  location: "Abu Dhabi, UAE",
  email: "chanchal9.dev@gmail.com",
  phone: "[redacted-phone]",
  phoneIndia: "+91 [redacted-phone]",
  github: "https://github.com/ChanchalS7",
  linkedin: "https://linkedin.com/in/chanchals7",
  blog: "https://dev.to/chanchals7",
  headline: "Designing secure systems with product calm.",
  summary:
    "I build resilient software across React, Go, cloud infrastructure, security, and AI workflows, turning complex systems into products people can trust.",
  narrative:
    "My best work happens where product clarity and platform depth meet: interfaces that feel calm under pressure, backend systems that stay reliable, and delivery workflows that help teams move without making the product fragile.",
};

export const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Method", href: "#about" },
  { label: "Systems", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const heroMetrics = [
  { value: "5+", label: "years experience" },
  { value: "20+", label: "systems shipped" },
  { value: "99.9%", label: "reliability mindset" },
  { value: "200+", label: "developers mentored" },
];

export const proofPoints = [
  "React / Next.js",
  "Go / Node.js",
  "AWS / Azure / GCP",
  "Kubernetes",
  "PostgreSQL / Redis",
  "Security / IAM",
];

export const capabilities = [
  {
    title: "Secure by design",
    text: "Security is not a final checklist. I build identity, permissions, auditability, and safe defaults into the architecture early.",
  },
  {
    title: "Product clarity",
    text: "Complex systems only become useful when flows, states, copy, and information hierarchy make decisions easier.",
  },
  {
    title: "Operational empathy",
    text: "I design for real teams using software under pressure: observable, reliable, recoverable, and calm.",
  },
];

export const experience = [
  {
    company: "CPX",
    role: "Senior Full Stack Engineer",
    location: "Abu Dhabi, UAE",
    period: "Aug 2025 - Present",
    summary:
      "Building an AI-powered cyber threat intelligence platform for SOC, Threat Intel, and Threat Hunt teams.",
    highlights: [
      "Designed frontend architecture with TypeScript, Vite, TanStack Query, and reusable product modules.",
      "Built a NestJS BFF with Keycloak SSO, multi-tenant RBAC, Prisma, PostgreSQL audit trails, and proxy layers.",
      "Delivered AI chat interfaces, streaming responses, security visualizations, and Azure DevOps deployments.",
    ],
  },
  {
    company: "StackGuardian",
    role: "Founding Software Engineer",
    location: "Belgium, Remote",
    period: "Jul 2024 - Jun 2025",
    summary:
      "Worked across product engineering, SDKs, cloud-native APIs, and platform governance workflows.",
    highlights: [
      "Contributed to SG-SDK using Go and Node.js with Fern for SDK generation.",
      "Developed Kubernetes-backed infrastructure APIs for deployment automation and orchestration.",
      "Shaped frontend modules for compliance, cost, and security insights with product and engineering leads.",
    ],
  },
  {
    company: "Thor Solutions",
    role: "Full Stack Developer and DevOps Engineer",
    location: "Remote",
    period: "Jun 2023 - Jun 2024",
    summary:
      "Led backend and cloud delivery for production applications using Go, AWS, Docker, and Kubernetes.",
    highlights: [
      "Built REST APIs with Golang, Gin, PostgreSQL, authentication, Stripe, Twilio, and Auth0 integrations.",
      "Deployed services on AWS EC2, RDS, S3, and DynamoDB with CI/CD through GitHub Actions.",
      "Mentored developers, reviewed architecture, and improved deployment speed through release automation.",
    ],
  },
  {
    company: "Masai School",
    role: "Software Engineer",
    location: "Remote",
    period: "Oct 2021 - Jun 2023",
    summary:
      "Built learning platforms and mentored 200+ developers in MERN stack, backend engineering, and code quality.",
    highlights: [
      "Created backend modules in Node.js and experimented with Go microservices for internal tools.",
      "Conducted code reviews, mock interviews, design reviews, and pair programming sessions.",
      "Worked on coding evaluation automation and student feedback systems.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Frontend systems",
    description: "Interfaces, state, data loading, design systems, and product surfaces.",
    items: ["React", "Next.js", "TypeScript", "TanStack Query", "Redux", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend platforms",
    description: "APIs, service boundaries, auth, integrations, and data workflows.",
    items: ["Go", "Node.js", "NestJS", "Express", "Gin", "Fiber", "GraphQL", "gRPC"],
  },
  {
    title: "Cloud and security",
    description: "Deployment, governance, identity, secure access, and operational reliability.",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Keycloak", "CI/CD"],
  },
  {
    title: "Data and operations",
    description: "Persistence, caching, queues, audits, and system observability.",
    items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Kafka", "Queues", "Prisma", "Temporal"],
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
