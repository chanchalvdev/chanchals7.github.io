import type {
  BlogPost,
  PortfolioProfile,
  PortfolioProject,
  ProjectCategory,
} from "@/lib/portfolio-contracts";

export type { BlogPost, ProjectCategory };
export type Project = PortfolioProject;

export const profile: PortfolioProfile = {
  name: "Chanchal Verma",
  role: "Senior Full Stack Engineer",
  location: "Abu Dhabi, UAE",
  email: "chanchal9.dev@gmail.com",
  phone: "[redacted-phone]",
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

export const posts: BlogPost[] = [
  {
    slug: "secure-ai-workflows-without-losing-product-clarity",
    title: "Secure AI workflows without losing product clarity",
    date: "2026-05-18",
    readTime: "6 min",
    tags: ["AI", "Security", "Product"],
    excerpt:
      "How I think about AI interfaces for operational teams where trust, context, and actionability matter more than novelty.",
    body: [
      {
        heading: "The product problem",
        paragraphs: [
          "AI features in security products fail when they behave like isolated chat boxes. Analysts need context, provenance, access control, and a clear path from insight to action.",
          "The interface has to make uncertainty visible while still helping users move faster.",
        ],
      },
      {
        heading: "The engineering shape",
        paragraphs: [
          "I prefer separating the AI interaction layer from authorization, audit, tenant context, and evidence retrieval. That keeps product iteration fast without weakening security boundaries.",
          "Streaming is useful when it reduces wait anxiety, but it should be paired with stable citations, explicit actions, and saved investigation state.",
        ],
      },
    ],
  },
  {
    slug: "what-platform-engineering-taught-me-about-frontend-systems",
    title: "What platform engineering taught me about frontend systems",
    date: "2026-04-10",
    readTime: "5 min",
    tags: ["Frontend", "Cloud", "Architecture"],
    excerpt:
      "The best product frontends for technical users are not just pretty screens. They are decision systems with strong contracts.",
    body: [
      {
        heading: "Frontend as a contract",
        paragraphs: [
          "When the UI represents infrastructure, ambiguous states create real operational risk. Loading, error, permission, and pending states are part of the product contract.",
          "That is why I treat component architecture and API contracts as one system, not two separate concerns.",
        ],
      },
      {
        heading: "Design for repeated use",
        paragraphs: [
          "Operational users come back every day. Dense views, predictable navigation, and clear scan patterns often matter more than cinematic visuals.",
          "The best interfaces feel calm because the system underneath them is disciplined.",
        ],
      },
    ],
  },
  {
    slug: "go-services-and-react-products-belong-closer-than-you-think",
    title: "Go services and React products belong closer than you think",
    date: "2026-03-02",
    readTime: "4 min",
    tags: ["Go", "React", "Backend"],
    excerpt:
      "A practical note on why backend service design and frontend product flow should influence each other early.",
    body: [
      {
        heading: "Shared decisions",
        paragraphs: [
          "A backend endpoint is not just data transport. It shapes latency, error handling, user confidence, and the number of decisions the frontend must simulate.",
          "When product and backend design happen together, the result is simpler code and a clearer user experience.",
        ],
      },
      {
        heading: "Where it pays off",
        paragraphs: [
          "Auth, pagination, audit events, optimistic updates, and long-running workflows all improve when the UI and API agree on real user intent.",
          "That is where full stack thinking becomes a product advantage instead of just a hiring label.",
        ],
      },
    ],
  },
];

export const githubActivity = {
  username: "ChanchalS7",
  summary: "Consistent product engineering across frontend systems, Go services, platform APIs, and security-focused workflows.",
  totals: [
    { value: "1,180", label: "sample contributions" },
    { value: "42", label: "active weeks" },
    { value: "7", label: "focus repos" },
  ],
  weeks: Array.from({ length: 28 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const seed = (week * 11 + day * 7 + 3) % 19;
      if (week < 2 || week > 26) return Math.max(0, seed - 13);
      return seed > 14 ? 4 : seed > 10 ? 3 : seed > 6 ? 2 : seed > 2 ? 1 : 0;
    }),
  ),
};
