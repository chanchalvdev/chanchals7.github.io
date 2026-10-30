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
  role: "AI Engineer • Forward Deployed Engineer • AI Security • Agentic AI • LLMOps • Python • Go • TypeScript • Kubernetes • Cloud-native security",
  location: "Abu Dhabi, UAE",
  email: "chanchalverma.dev@gmail.com",
  github: "https://github.com/chanchalvdev",
  linkedin: "https://linkedin.com/in/chanchalvdev/",
  twitter: "https://x.com/chanchalvdev",
  youtube: "https://www.youtube.com/@chanchalvdev",
  blog: "https://medium.com/@chanchalvdev",
  headline: "I build AI agents that ship — and keep them safe.",
  summary:
    "AI Engineer with 6+ years turning unclear problems into production software. I work on-site at client locations with analysts, operators, and decision-makers to find the problem actually worth solving, then build the AI agents, backends, and interfaces that solve it. At CPX that means a multi-agent AI platform used daily by threat intelligence and incident response teams.",
  narrative:
    "The best requirements are never in the spec. I sit with the people doing the work, watch where their day breaks down, and turn vague asks into a working prototype in days. Then I stay through rollout, iterating with every stakeholder and hardening the system with guardrails, human review, and audit trails, until it's something they trust and use every day.",
};

export const heroRoles = [
  "AI Engineer",
  "Forward Deployed Engineer",
  "Agentic AI Builder",
  "AI Security Engineer",
];

export const heroMetrics = [
  { value: "6+", label: "years experience" },
  { value: "UAE · Germany · India · US", label: "worked across" },
  { value: "200+", label: "developers mentored" },
];

export const proofPoints = [
  "Agentic AI / MCP",
  "RAG / LLM Evals",
  "Python / FastAPI",
  "Go / TypeScript",
  "React / Next.js",
  "Kubernetes / Azure",
  "AI Security",
  "Langfuse / OTel",
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
    role: "Senior Full Stack Engineer (AI Engineering)",
    location: "Abu Dhabi, UAE",
    period: "Aug 2025 — Present",
    summary:
      "Building a multi-tenant, multi-agent AI platform for threat intelligence and incident response teams, working directly with senior analysts and securing every agent with scoped tools, guardrails, and human review.",
    highlights: [
      "Built multiple AI agents in Python with Agno and LangGraph for CTI and IR teams, covering threat actor profiling, MITRE ATT&CK TTP mapping, malware and vulnerability intelligence, and incident analysis. They cut senior analysts' analysis time and their dependency on L1 analysts.",
      "Designed a composable agent framework: agents built from reusable skills and scripts, connected to multiple MCP servers, each running with its own scoped tools and credentials to limit the damage of a prompt injection.",
      "Built the agent supervision layer in Python and Go with run monitoring, guardrails, output validation, human-in-the-loop approval, and an audit log of every agent action.",
      "Exposed agents through FastAPI services with Pydantic and async Python; built RAG pipelines over threat intelligence with Qdrant; run self-hosted models on on-prem NVIDIA H100 servers and air-gapped environments to meet UAE data residency rules.",
      "Designed the Go backend-for-frontend that orchestrates agent execution with Kafka and Temporal, so long-running AI workflows stay fault-tolerant and resumable.",
      "Instrumented agents and services with Langfuse and OpenTelemetry so a single agent run can be traced across every service it touches.",
      "Implemented enterprise SSO with Keycloak and SAML plus multi-tenant RBAC, so onboarding a new customer is configuration, not code.",
      "Deploy to AKS through Azure DevOps and Argo CD with blue-green rollouts; applied zero-trust networking, Azure Key Vault secrets, and SAST, dependency, and container scanning in CI/CD. Own the React and TypeScript frontend for analyst dashboards.",
    ],
  },
  {
    company: "HCL Technologies (client: HP Inc.)",
    role: "Technical Lead",
    location: "Bengaluru, India",
    period: "Apr 2025 — Aug 2025",
    summary:
      "Client-facing technical lead for HP Inc., leading a distributed team building Go microservices on Kubernetes across time zones.",
    highlights: [
      "Led a distributed team building scalable Go microservices on Kubernetes with event-driven messaging on RabbitMQ and Kafka.",
      "Added OpenTelemetry distributed tracing and Grafana service health dashboards; used pprof and Go benchmarks to find and fix performance bottlenecks.",
      "Handled production monitoring, incident diagnosis, and root-cause analysis in Splunk, and ran cross-team code reviews.",
      "Moved releases to blue-green and progressive rollouts on Kubernetes with autoscaling, so the team could ship more often with less risk.",
    ],
  },
  {
    company: "StackGuardian",
    role: "Founding Software Engineer",
    location: "Germany — Remote",
    period: "Jul 2024 — Mar 2025",
    summary:
      "Founding engineer on a multi-tenant cloud security and governance platform, built from zero alongside the CTO without a formal product spec.",
    highlights: [
      "Built policy-as-code guardrails and no-code policy builders that let customers enforce Terraform and IaC security rules before anything reaches their cloud accounts.",
      "Added compliance insights and security and cost alerts mapping cloud resources to SOC 2 and ISO 27001 controls for EU customers working under GDPR.",
      "Worked on SG-SDK in Go and Node.js, generating client SDKs with Fern to cut customer integration time; wrote Python for platform automation and policy tooling.",
      "Wrote Terraform for the platform's own infrastructure, kept secrets in HashiCorp Vault, deployed through Argo CD, and built the self-service product in Next.js, React, and TypeScript.",
    ],
  },
  {
    company: "Thor Solutions",
    role: "Full Stack Developer & DevOps Engineer",
    location: "Remote, India",
    period: "Jan 2023 — Jun 2024",
    summary:
      "Led backend and cloud delivery for client products in Go and PostgreSQL, including one for a US-based client.",
    highlights: [
      "Led backend development in Go (Gin) and PostgreSQL across several production applications.",
      "Built the Go backend for iWTNS, a Flutter Android app, with Auth0 authentication, Stripe payments, and Twilio OTP and voice calls.",
      "Deployed on AWS (EC2, S3, RDS, DynamoDB) with Docker and Kubernetes behind load balancers with autoscaling, and set up GitHub Actions CI/CD, cutting deployment time by 30%.",
      "Guided a small developer team through code reviews and architecture decisions.",
    ],
  },
  {
    company: "Masai School",
    role: "Associate Software Engineer (Instructional)",
    location: "Remote, India",
    period: "Oct 2021 — Jan 2023",
    summary:
      "Mentored around 200 developers in full stack MERN and Python, and built backend modules for the assessment and coding-evaluation platforms.",
    highlights: [
      "Mentored around 200 students across cohort batches in the MERN stack and Python, many from non-technical backgrounds.",
      "Ran live coding, pair programming, design reviews, and mock technical interviews to prepare students for engineering roles.",
      "Reviewed student projects and gave feedback on code quality, REST API design, and database modelling.",
      "Built backend modules in Node.js and Python for the job-suitability assessment and automated coding-evaluation platforms, and prototyped Go microservices for internal tools.",
    ],
  },
  {
    company: "Smashing Infolabs",
    role: "Full Stack Developer",
    location: "Indore, India",
    period: "Jul 2020 — Oct 2021",
    summary:
      "Built SaaS products, admin dashboards, and internal business tools on the MERN stack with SQL databases.",
    highlights: [
      "Wrote REST APIs in Node.js and Express backed by MongoDB and SQL, and built React frontends focused on usability and performance.",
      "Designed database schemas and queries in MongoDB and SQL to power reporting dashboards.",
      "Added web and Android features to the Liter platform and packaged the web app as an Android APK with Cordova, so the product reached mobile without a second codebase.",
      "Maintained internal applications used across teams, took part in code reviews, and wrote technical documentation.",
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

export const languages = ["English (Professional)", "Hindi (Native)", "Arabic (Basic, learning)"];

export const skillGroups = [
  {
    title: "AI & Agentic Systems",
    description: "Agent frameworks, RAG, evaluation, observability, and open-weight model serving.",
    items: [
      "Agno",
      "Pydantic AI",
      "LangChain",
      "LangGraph",
      "Langfuse",
      "RAG",
      "AI Evals",
      "Observability",
      "Inferencing",
      "MCP",
      "Qdrant",
      "MiniMax-M3",
      "GPT-OSS-120B",
    ],
  },
  {
    title: "Frontend & UI/UX",
    description: "Interfaces, state, data loading, design systems, and product surfaces.",
    items: ["React", "Next.js", "TypeScript", "TanStack Query", "Redux", "Tailwind CSS", "Vite", "Figma"],
  },
  {
    title: "Backend Platforms",
    description: "APIs, service boundaries, auth, integrations, and data workflows.",
    items: ["Python", "FastAPI", "Django", "Go", "Gin", "Node.js", "NestJS", "gRPC"],
  },
  {
    title: "AI Security",
    description: "Securing agents and LLM apps against the OWASP Top 10 for LLMs.",
    items: [
      "Prompt Injection",
      "OWASP LLM Top 10",
      "Guardrails",
      "Output Validation",
      "Tool & Credential Scoping",
      "Human-in-the-Loop",
      "Data Leakage",
      "Threat Modeling",
    ],
  },
  {
    title: "Cloud & Security",
    description: "Deployment, identity, secrets, zero trust, and air-gapped infrastructure.",
    items: [
      "Azure (AKS)",
      "AWS",
      "GCP",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Argo CD",
      "Keycloak / SAML",
      "HashiCorp Vault",
      "Zero Trust",
      "Air-gapped / H100",
      "SAST & Scanning",
    ],
  },
  {
    title: "Data & Operations",
    description: "Persistence, messaging, durable workflows, and system observability.",
    items: [
      "PostgreSQL",
      "DuckDB",
      "Redis",
      "MongoDB",
      "Kafka",
      "RabbitMQ",
      "Temporal",
      "OpenTelemetry",
      "Grafana",
      "Prometheus",
      "Splunk",
    ],
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
    slug: "agentops-ai",
    title: "AgentOps AI — Local-first RAG & Agent Platform",
    category: "AI",
    year: "2026",
    featured: true,
    sortScore: 90,
    caseStudyReady: true,
    description:
      "A production-minded RAG platform that runs entirely on local models: multi-tenant document ingestion, hybrid retrieval, and grounded answers with validated citations. The foundation is built; the agent harness on top of it is in progress.",
    impact:
      "Agents are only as trustworthy as the retrieval and isolation beneath them. Building those first means every tool added later inherits tenant scoping, cited evidence, and an honest answer when the documents don't contain one.",
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Ollama", "Docker", "GitHub Actions"],
    links: {
      demo: `mailto:${profile.email}`,
    },
    metrics: [
      { value: "107", label: "tests passing" },
      { value: "Hybrid", label: "vector + keyword search" },
      { value: "$0", label: "local model cost" },
    ],
    challenge:
      "RAG demos tend to fall apart on real documents: versions contradict each other, vector search misses exact terms, one tenant's data can reach another's results, and a model can cite sources it never saw. Those problems have to be solved before an agent is handed tools.",
    solution:
      "I built a FastAPI service on PostgreSQL and pgvector that validates uploads, chunks by document structure, and indexes in one transaction so a document is never half-searchable. Search fuses vector and full-text results with reciprocal rank fusion, and every retriever builds on a single tenant-scoped query. Local Ollama models answer with JSON-schema output, retrieved text is fenced as untrusted, and citations are checked against the retrieved evidence.",
    results: [
      "Ingestion for PDF, Markdown and text with magic-byte checks, content-hash idempotency and filename versioning, verified on a sample corpus with deliberately conflicting documents.",
      "Live end-to-end runs answered a v1-vs-v2 question citing both documents, returned insufficient_evidence for an out-of-scope question, and showed a second tenant 0 results.",
      "107 unit and integration tests against real Postgres and pgvector, plus 3 live model tests, with Ruff and strict Mypy clean and CI on GitHub Actions.",
      "In progress: a policy-gated agent harness, a LangGraph workflow with human approval, evaluation, and drift monitoring.",
    ],
    coverImage: "/agentops-title.png",
    detailImage: "/agentops-architecture.png",
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

// What the writing covers. Used as suggested categories in the admin editor
// and as topic links on the homepage and blog index — set a post's category to
// one of these labels for it to show up under that topic.
export const writingTopics = [
  { label: "AI Engineering", blurb: "Agents, RAG, evals and LLMOps in production" },
  { label: "Forward Deployed", blurb: "Embedding with teams and shipping on-site" },
  { label: "AI Security", blurb: "Securing agents, LLM apps and their data" },
  { label: "Case Studies", blurb: "Real systems, the decisions behind them" },
  { label: "Research", blurb: "Papers, experiments and MS in AI notes" },
];
