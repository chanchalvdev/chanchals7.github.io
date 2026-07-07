export type ProjectCategory =
  | "AI"
  | "Backend"
  | "Cloud"
  | "Frontend"
  | "Security";

export type ProjectStatus = "Shipping" | "Research" | "Maintained";

export type PortfolioProfile = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  phoneIndia?: string;
  github: string;
  linkedin: string;
  blog: string;
  headline: string;
  summary: string;
  narrative: string;
};

export type PortfolioMetric = {
  value: string;
  label: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  sortScore: number;
  description: string;
  impact: string;
  stack: string[];
  links: {
    demo?: string;
    github?: string;
  };
  metrics: PortfolioMetric[];
  challenge: string;
  solution: string;
  results: string[];
  status?: ProjectStatus;
  role?: string;
  evidence?: string[];
  coverImage?: string;
  detailImage?: string;
  /** Enables the case-study page link and external source link on the card. */
  caseStudyReady?: boolean;
};

export type ConsoleSceneLine = {
  text: string;
  tone: "dim" | "muted" | "command" | "result";
  /** Optional accent-colored prefix rendered in cyan before the text. */
  prefix?: string;
};

export type ConsoleSceneChip = {
  text: string;
  tone: "amber" | "coral" | "violet" | "signal" | "cobalt";
};

/** One rotating scene of the hero terminal visual. */
export type ConsoleScene = {
  id: string;
  title: string;
  lines: ConsoleSceneLine[];
  chips: ConsoleSceneChip[];
  confidence: number;
  footerLeft: string;
  footerRight: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  body: {
    heading: string;
    paragraphs: string[];
  }[];
};

export type ProductSignal = {
  label: string;
  value: string;
  delta?: string;
  tone: "up" | "stable" | "focus";
};

export type LivePortfolioSignals = {
  refreshedAt: string;
  contributionTotal: number;
  activeWeeks: number;
  focusRepos: number;
  weeks: number[][];
};
