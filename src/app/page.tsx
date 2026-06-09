import Image from "next/image";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

const experience = [
  {
    company: "CPX",
    role: "Senior Full Stack Engineer",
    location: "Abu Dhabi, UAE",
    period: "Aug 2025 - Present",
    summary:
      "Building an AI-powered cyber threat intelligence platform for SOC, Threat Intel, and Threat Hunt teams.",
    highlights: [
      "Designed production frontend architecture with TypeScript, Vite, TanStack Query, and reusable module patterns.",
      "Built a NestJS BFF with Keycloak SSO, multi-tenant RBAC, Prisma, PostgreSQL audit trails, and proxy layers.",
      "Delivered security visualizations, AI chat interfaces with streaming responses, and Azure DevOps deployments.",
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
    role: "Full Stack Developer & DevOps Engineer",
    location: "Remote",
    period: "Jun 2023 - Jun 2024",
    summary:
      "Led backend and cloud delivery for production applications using Go, AWS, Docker, and Kubernetes.",
    highlights: [
      "Built REST APIs with Golang, Gin, PostgreSQL, authentication, Stripe, Twilio, and Auth0 integrations.",
      "Deployed services on AWS EC2, RDS, S3, and DynamoDB with CI/CD through GitHub Actions.",
      "Mentored developers, reviewed architecture, and improved deployment speed by automating release workflows.",
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

const skillGroups = [
  {
    title: "Languages",
    items: ["Go", "TypeScript", "JavaScript", "Node.js", "Python", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Redux", "TanStack Query", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend",
    items: ["NestJS", "Express", "Gin", "Fiber", "Django", "GraphQL", "gRPC"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite", "DynamoDB"],
  },
  {
    title: "Systems",
    items: ["Microservices", "Kafka", "Queues", "Keycloak", "Temporal", "Auth"],
  },
];

const strengths = [
  {
    icon: ShieldCheck,
    title: "Security-focused product engineering",
    text: "I build interfaces and services for operational teams where clarity, access control, and reliability matter.",
  },
  {
    icon: ServerCog,
    title: "Backend and platform depth",
    text: "Go, Node.js, cloud infrastructure, APIs, queues, databases, and deployment pipelines are part of my daily work.",
  },
  {
    icon: Code2,
    title: "Clean frontend execution",
    text: "I care about readable component systems, fast interfaces, responsive layouts, and product details that reduce friction.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#111111]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f7f6f2]/86 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="font-semibold tracking-tight">
            Chanchal Verma
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-black/55 md:flex">
            <a className="transition hover:text-black" href="#experience">
              Experience
            </a>
            <a className="transition hover:text-black" href="#skills">
              Skills
            </a>
            <a className="transition hover:text-black" href="#contact">
              Contact
            </a>
          </nav>
          <a
            href="mailto:chanchal9.dev@gmail.com"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[#111111] px-4 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            <Mail className="size-4" />
            <span className="hidden sm:inline">Email me</span>
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
        <div>
          <div className="mb-8 flex flex-wrap gap-3 text-sm font-medium text-black/60">
            <span className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2">
              <MapPin className="size-4" />
              Abu Dhabi, UAE
            </span>
            <span className="rounded-md border border-black/10 bg-white px-3 py-2">
              Full Stack | DevOps | Go | Cloud
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl lg:text-[5.9rem]">
            Full stack engineer building secure cloud products.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-black/64 sm:text-xl">
            I am Chanchal Verma, a software engineer with around 5 years of
            experience across full stack development, DevOps, Go services,
            cloud-native platforms, and production-grade cybersecurity tools.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#experience"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#111111] px-5 font-semibold text-white transition hover:bg-black/80"
            >
              View experience
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="https://github.com/ChanchalS7"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-5 font-semibold transition hover:border-black/25"
            >
              GitHub
              <ExternalLink className="size-4" />
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-black/10 border-y border-black/10 py-5">
            <Stat value="5 yrs" label="Experience" />
            <Stat value="200+" label="Developers mentored" />
            <Stat value="3" label="Cloud platforms" />
          </div>
        </div>

        <div className="lg:justify-self-end">
          <div className="relative mx-auto max-w-[420px]">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-xl bg-[#111111]" />
            <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white p-3 shadow-2xl shadow-black/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#ebe8e0]">
                <Image
                  src="/chanchal.jpg"
                  alt="Portrait of Chanchal Verma"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-[50%_24%]"
                />
              </div>
              <div className="flex flex-col gap-3 px-1 pb-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">Chanchal Verma</p>
                  <p className="text-sm text-black/55">Senior Full Stack Engineer</p>
                </div>
                <a
                  href="https://linkedin.com/in/chanchals7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-black/10 px-3 text-sm font-semibold transition hover:border-black/25"
                >
                  LinkedIn
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#111111] px-5 py-7 text-white sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 text-sm font-medium text-white/72 md:grid-cols-4">
          <span>Golang backend systems</span>
          <span>React and Next.js interfaces</span>
          <span>Kubernetes and cloud delivery</span>
          <span>Cybersecurity product engineering</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" id="about">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
              Profile
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Engineering for products that have to work.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-black/64">
            <p>
              I specialize in building scalable systems, automating workflows,
              and securing cloud infrastructure. My work spans REST APIs,
              microservices, third-party integrations, cloud deployments, and
              frontend experiences for technical teams.
            </p>
            <p>
              Recently, I have worked on cyber threat intelligence products,
              AI-assisted security workflows, SDK platforms, infrastructure APIs,
              and backend systems with payments, authentication, and real-time
              operational needs.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {strengths.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-black/10 bg-white p-6"
            >
              <item.icon className="mb-7 size-7" />
              <h3 className="text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-black/60">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className="border-y border-black/10 bg-white px-5 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
                Experience
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Recent work and impact.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-black/60">
              A practical path through product engineering, cloud platforms,
              DevOps, mentoring, and security-focused systems.
            </p>
          </div>

          <div className="space-y-5">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="grid gap-6 rounded-lg border border-black/10 bg-[#f7f6f2] p-5 sm:p-7 lg:grid-cols-[0.72fr_1.28fr]"
              >
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black/60">
                    <BriefcaseBusiness className="size-4" />
                    {item.period}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.company}
                  </h3>
                  <p className="mt-2 font-medium text-black/62">{item.role}</p>
                  <p className="mt-1 text-sm text-black/45">{item.location}</p>
                </div>
                <div>
                  <p className="text-lg leading-8 text-black/70">
                    {item.summary}
                  </p>
                  <ul className="mt-5 space-y-3 text-black/58">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 leading-7">
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-black" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
            Skills
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            A full stack toolkit with cloud depth.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-black/10 bg-white p-6"
            >
              <h3 className="font-semibold">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-black/10 bg-[#f7f6f2] px-3 py-1.5 text-sm font-medium text-black/65"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#111111] px-5 py-16 text-white sm:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/42">
              Contact
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s build something clean, secure, and useful.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href="mailto:chanchal9.dev@gmail.com"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 font-semibold text-[#111111] transition hover:bg-white/90"
            >
              <Mail className="size-4" />
              Email
            </a>
            <a
              href="tel:[redacted-phone]"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/16 px-5 font-semibold transition hover:bg-white/10"
            >
              <Phone className="size-4" />
              Call
            </a>
            <a
              href="https://dev.to/chanchals7"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/16 px-5 font-semibold transition hover:bg-white/10"
            >
              Blog
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 first:pl-0 last:pr-0">
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm leading-5 text-black/48">{label}</p>
    </div>
  );
}
