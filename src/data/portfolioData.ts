export interface Project {
  id: string;
  name: string;
  category: 'Frontend' | 'Design System' | 'Full Stack' | 'Performance';
  tagline: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  status: string;
  highlights: string[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tech?: string[];
  badge?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Moaaz Elshazly",
    role: "Frontend Engineer & UI/UX Designer",
    statusBadge: "Available for full-time & select contracts",
    shortBio: "I design and build high-performance web applications with precision engineering, clean design systems, and obsessive attention to detail.",
    location: "San Francisco, CA / Remote Available",
    email: "mozaelshazly56@gmail.com",
    github: "https://github.com/moaazelshazly",
    linkedin: "https://www.linkedin.com/in/moaaz-elshazly-625233358",
    twitter: "https://x.com/moazelshazly55",
    resumeUrl: "#contact",
    heroConsole: {
      framework: "React 19 + TypeScript",
      architecture: "Clean Component Systems",
      benchmark: "Sub-100ms Interactions",
      standards: "WCAG 2.1 AAA Compliant"
    }
  },

  about: {
    heading: "Crafting digital experiences with architectural discipline.",
    paragraphs: [
      "I am a frontend developer and UI/UX designer focused on building polished, reliable web applications. My work sits at the intersection of design systems and frontend architecture — ensuring that what looks elegant in Figma translates into resilient, accessible code.",
      "Currently completing my degree in Computer Science while building production-grade web interfaces. I avoid unnecessary dependencies, generic templates, and bloated libraries in favor of clean architecture, semantic HTML, and performant JavaScript/TypeScript.",
      "Whether developing a complex component library from scratch or optimizing rendering pipelines for real-time dashboards, my objective is always the same: create products that feel fast, predictable, and deeply satisfying to use."
    ],
    focusAreas: [
      {
        title: "Precision Design Systems",
        description: "Token-driven component libraries with strict contrast, scalable typography, and zero-drift Figma handoffs."
      },
      {
        title: "Frontend Architecture",
        description: "Type-safe, testable applications built with React 19, modern state machines, and clean separation of concerns."
      },
      {
        title: "Performance & Accessibility",
        description: "Zero unnecessary re-renders, 60fps animations, keyboard navigation, and rigorous adherence to WCAG standards."
      }
    ]
  },

  skills: [
    {
      title: "Frontend",
      description: "Core UI engines, reactive frameworks, and browser presentation technologies.",
      skills: [
        { name: "React 19", level: "Advanced", description: "Hooks, Server Components, Concurrent Features", highlight: true },
        { name: "TypeScript", level: "Advanced", description: "Generics, Strict Typing, Utility Types", highlight: true },
        { name: "Next.js / Vite", level: "Proficient", description: "SSR, SSG, Routing, Fast HMR Bundling" },
        { name: "Modern CSS / PostCSS", level: "Advanced", description: "CSS Variables, Flexbox/Grid, Animations", highlight: true },
        { name: "Tailwind CSS", level: "Proficient", description: "Token integration, JIT, Utility composition" },
        { name: "State Architecture", level: "Proficient", description: "Zustand, Context API, Redux Toolkit" },
        { name: "Web Performance", level: "Proficient", description: "Core Web Vitals, Bundle analysis, Tree shaking" }
      ]
    },
    {
      title: "Backend",
      description: "Server runtimes, API architectures, and data persistence layers.",
      skills: [
        { name: "Node.js", level: "Beginner", description: "Asynchronous I/O, REST APIs, Microservices", highlight: true },
        { name: "Express.js", level: "Beginner", description: "Middleware design, routing, authentication" },
        { name: "RESTful APIs", level: "Advanced", description: "Clean API contract design & error handling", highlight: true },
        { name: "GraphQL", level: "Intermediate", description: "Schemas, Queries, Mutations, Apollo" },
        { name: "PostgreSQL", level: "Beginner", description: "Relational schemas, queries, indexing" },
        { name: "Supabase / Firebase", level: "Proficient", description: "Auth, Realtime subscriptions, Storage" }
      ]
    },
    {
      title: "Programming",
      description: "Languages, algorithmic thinking, and software engineering principles.",
      skills: [
        { name: "TypeScript", level: "Advanced", description: "Primary engineering language", highlight: true },
        { name: "JavaScript (ESNext)", level: "Advanced", description: "Prototypes, Event loop, Async/await" },
        { name: "C#", level: "Intermediate", description: "Scripting, data parsing, backend utilities" },
        { name: "SQL", level: "Proficient", description: "Data querying, joins, schema migrations" },
        { name: "Algorithms & DS", level: "Proficient", description: "Computational complexity, graph & tree structures" }
      ]
    },
    {
      title: "UI/UX",
      description: "Design systems, human-computer interaction, and aesthetic refinement.",
      skills: [
        { name: "Design Systems", level: "Advanced", description: "Token structures, design parity, component specs", highlight: true },
        { name: "Figma", level: "Advanced", description: "Auto-layout, Components, Variables, Prototypes", highlight: true },
        { name: "Accessibility (WCAG)", level: "Advanced", description: "Screen readers, ARIA roles, color contrast" },
        { name: "Typography & Layout", level: "Advanced", description: "Hierarchical scales, optical tracking, baseline grid" },
        { name: "Micro-Interactions", level: "Proficient", description: "Restrained physics, state indicators, hover feedback" }
      ]
    },
    {
      title: "Tools",
      description: "Development workflow, version control, testing, and cloud infrastructure.",
      skills: [
        { name: "Git & GitHub", level: "Advanced", description: "Branching strategies, PR reviews, CI workflows", highlight: true },
        { name: "Vite", level: "Advanced", description: "Modern build tooling, plugins, bundle optimization" },
        { name: "Docker", level: "Intermediate", description: "Containerized development environments" },
        { name: "Vitest / RTL", level: "Proficient", description: "Unit tests, integration tests, mock engines" },
        { name: "Vercel / Netlify", level: "Proficient", description: "Edge deployments, preview environments" },
        { name: "Chrome DevTools", level: "Advanced", description: "Memory profiling, network waterfall, flame charts", highlight: true }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "chronos-studio",
      name: "Chronos Design System & Studio",
      category: "Design System",
      tagline: "Token-driven component architecture with zero-drift synchronization.",
      description: "An open, multi-brand React design system built on strict WCAG AAA guidelines. Includes an interactive live sandbox to inspect layout tokens, typography scales, and keyboard interactions.",
      problemSolved: "Eliminates design-to-code divergence by feeding automated token pipelines directly from Figma variables into CSS custom properties with built-in contrast checkers.",
      technologies: ["React 19", "TypeScript", "CSS Variables", "Vitest", "Storybook"],
      githubUrl: "https://github.com/alexchen-dev/chronos-design-system",
      demoUrl: "https://chronos-system.example.com",
      status: "v2.4 Production",
      highlights: ["35+ accessible primitives", "100% WCAG AAA contrast ratio", "Zero runtime overhead"],
      featured: true
    },
    {
      id: "pulse-flow",
      name: "Pulse Flow — Telemetry & Metrics Engine",
      category: "Frontend",
      tagline: "High-frequency streaming telemetry dashboard rendering at continuous 60 FPS.",
      description: "A developer-focused performance monitor that visualizes thousands of incoming websocket telemetry events per second without dropping frames or triggering main-thread layout thrash.",
      problemSolved: "Offloads high-volume time-series parsing to dedicated Web Workers, utilizing HTML5 Canvas rendering buffers to keep the React UI responsive and fluid.",
      technologies: ["React", "TypeScript", "Web Workers", "Canvas API", "WebSockets"],
      githubUrl: "https://github.com/alexchen-dev/pulse-flow-telemetry",
      demoUrl: "https://pulseflow.example.com",
      status: "Active",
      highlights: ["60 FPS under 10k events/sec", "Sub-15ms ingest latency", "Worker-isolated thread"],
      featured: true
    },
    {
      id: "devnotes-canvas",
      name: "DevNotes — Keyboard-First Markdown Canvas",
      category: "Full Stack",
      tagline: "Distraction-free technical documentation workspace with instantaneous local cache.",
      description: "A minimalist markdown editor crafted for software engineers. Features integrated command palette navigation, split-screen AST preview, syntax highlighting, and local-first offline syncing.",
      problemSolved: "Replaces sluggish, bloated note apps with a lightning-fast native-feeling desktop experience that starts in under 200ms and syncs without cloud lock-in.",
      technologies: ["Next.js", "TypeScript", "IndexedDB", "Zustand", "Shiki"],
      githubUrl: "https://github.com/alexchen-dev/devnotes-canvas",
      demoUrl: "https://devnotes.example.com",
      status: "Open Source",
      highlights: ["Instant local-first storage", "<40ms keystroke latency", "Command-K workflow"],
      featured: true
    },
    {
      id: "aura-ledger",
      name: "Aura Ledger — Financial Analytics Dashboard",
      category: "Performance",
      tagline: "Interactive portfolio analytics with real-time multi-currency reconciliation.",
      description: "A financial intelligence platform presenting multi-asset portfolios, profit-loss trees, and predictive projections across global currencies with instant filtering and sorting.",
      problemSolved: "Transforms dense, multi-thousand row tabular datasets into intuitive responsive tables and high-density charts with sub-100ms calculation speeds.",
      technologies: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "SVG Charts"],
      githubUrl: "https://github.com/alexchen-dev/aura-financial-ledger",
      demoUrl: "https://aura-ledger.example.com",
      status: "Beta v1.1",
      highlights: ["Sub-100ms calculation engine", "Keyboard table navigation", "Exportable audit logs"],
      featured: false
    }
  ] as Project[],

  timeline: [
    {
      id: "exp-1",
      type: "experience",
      title: "Frontend Engineering Intern / Fellow",
      institution: "Vanguard Tech Innovations",
      period: "2024 — Present",
      location: "San Francisco, CA (Hybrid)",
      description: "Developing mission-critical internal client dashboards and design system components for distributed engineering teams.",
      bullets: [
        "Architected 14+ foundational component primitives adopted across 3 core product teams, cutting feature turnaround time by 30%.",
        "Refactored data-heavy client tables using virtual scrolling, reducing memory footprint by 40% and eliminating scroll stutter.",
        "Authored comprehensive unit and integration test suites using Vitest and React Testing Library, achieving 92% coverage."
      ],
      tech: ["React", "TypeScript", "CSS Variables", "Vitest", "GitLab CI"],
      badge: "Current Role"
    },
    {
      id: "exp-2",
      type: "experience",
      title: "Independent UI/UX & Web Developer",
      institution: "Freelance & Open Source",
      period: "2023 — 2024",
      location: "Remote",
      description: "Designed and engineered modern web applications, landing interfaces, and design libraries for tech startups and creator platforms.",
      bullets: [
        "Built responsive marketing and dashboard web apps adhering to strict accessibility (WCAG AA/AAA) and SEO requirements.",
        "Collaborated with technical founders to translate raw product concepts into interactive Figma prototypes and performant codebases.",
        "Maintained open-source React UI utilities with active community documentation and automated CI releases."
      ],
      tech: ["React", "TypeScript", "Next.js", "Figma", "Tailwind CSS"],
      badge: "Contract"
    },
    {
      id: "edu-1",
      type: "education",
      title: "B.S. in Computer Science",
      institution: "State University of Technology",
      period: "2021 — 2025 (Expected)",
      location: "United States",
      description: "Focusing on Software Engineering, Human-Computer Interaction, and Distributed Web Systems.",
      bullets: [
        "Relevant Coursework: Web Application Architecture, Algorithms & Complexity, Database Management Systems, Computer Networks.",
        "Lead Developer in Collegiate Hackathon Club; mentored junior students in TypeScript and modern frontend best practices.",
        "Dean's Honor List for academic excellence across consecutive semesters."
      ],
      tech: ["Algorithms", "Data Structures", "Web Systems", "HCI"],
      badge: "Academic"
    }
  ] as TimelineItem[]
};
