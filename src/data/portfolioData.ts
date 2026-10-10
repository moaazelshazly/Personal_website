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
  // GitHub Live Metadata
  stars?: number;
  forks?: number;
  openIssues?: number;
  updatedAt?: string;
  language?: string;
  defaultBranch?: string;
  repoFullName?: string;
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
    role: "Frontend Engineer & Software Developer",
    statusBadge: "Available for full-time & select contracts",
    shortBio: "frontend developer engineering responsive web applications, interactive tools, and typing benchmark engines with clean design systems.",
    location: "Tanta, Egypt / Remote Available",
    email: "mozaelshazly56@gmail.com",
    github: "https://github.com/moaazelshazly",
    avatarUrl: "https://avatars.githubusercontent.com/u/181676567?v=4",
    bio: "new learner also student thank you!!",
    publicReposCount: 4,
    linkedin: "https://www.linkedin.com/in/moaaz-elshazly-625233358",
    twitter: "https://x.com/moazelshazly55",
    resumeUrl: "https://drive.google.com/file/d/16omyvVwcIHoGDtfjArk11kBUcll_PQD8/view?usp=drive_link",
    heroConsole: {
      framework: "React 19 + TypeScript",
      architecture: "Clean Component Systems",
      benchmark: "Sub-100ms Interactions",
      standards: "WCAG 2.1 AAA Compliant"
    }
  },

  about: {
    heading: "Engineering digital experiences with discipline, clean architecture, and curiosity.",
    paragraphs: [
      "I am a Computer Science student and frontend developer driven by building clean, high-performance web applications. My focus spans modern reactive frontend architecture, interactive web experiences, and accessible design systems.",
      "I love exploring how things work under the hood — whether that means dissecting JavaScript event loops in browser games, optimizing keystroke telemetry in React applications, or solving complex algorithmic problems with optimal time and space complexity in C++.",
      "I believe in writing clean, readable, type-safe code that delivers exceptional user experiences with zero unnecessary runtime bloat."
    ],
    focusAreas: [
      {
        title: "Modern React & TypeScript",
        description: "Building responsive, predictable interfaces with React 19, strict TypeScript type checking, and modern bundlers like Vite."
      },
      {
        title: "Algorithms & Problem Solving",
        description: "Rigorous practice with Data Structures & Algorithms (NeetCode 150), asymptotic analysis, and computational efficiency."
      },
      {
        title: "Clean Design & Accessibility",
        description: "Token-driven component architectures, responsive layouts, high contrast ratios (WCAG AAA), and smooth micro-interactions."
      }
    ]
  },

  skills: [
    {
      title: "Frontend",
      description: "Core UI engines, reactive frameworks, and browser presentation technologies.",
      skills: [
        { name: "React 19", level: "Advanced", description: "Hooks, Functional Components, State Architecture", highlight: true },
        { name: "TypeScript", level: "Advanced", description: "Generics, Strict Typing, Interfaces", highlight: true },
        { name: "JavaScript (ESNext)", level: "Advanced", description: "Async/await, Event loop, DOM APIs, Closures", highlight: true },
        { name: "Modern CSS / CSS3", level: "Advanced", description: "CSS Variables, Flexbox/Grid, Animations, Transitions", highlight: true },
        { name: "HTML5 / Semantic Web", level: "Advanced", description: "Accessible markup, Canvas API, Forms", highlight: true },
        { name: "Vite", level: "Proficient", description: "Modern build tooling, Fast HMR, Bundling" },
        { name: "Responsive Design", level: "Advanced", description: "Mobile-first layouts, Fluid typography" }
      ]
    },
    {
      title: "Programming & Algorithms",
      description: "Languages, computational thinking, and algorithmic problem solving.",
      skills: [
        { name: "C++", level: "Proficient", description: "Data structures, NeetCode/LeetCode problem solving, STL", highlight: true },
        { name: "Algorithms & Data Structures", level: "Proficient", description: "Graphs, Trees, Dynamic Programming, Sorting", highlight: true },
        { name: "TypeScript", level: "Advanced", description: "Type-safe systems engineering", highlight: true },
        { name: "OOP & Design Patterns", level: "Proficient", description: "Encapsulation, Modular separation, Clean code" }
      ]
    },
    {
      title: "Backend & APIs",
      description: "Server communication, REST APIs, and data integration.",
      skills: [
        { name: "RESTful APIs", level: "Advanced", description: "GitHub API integration, HTTP protocols, Fetch/Axios", highlight: true },
        { name: "JSON Data Architecture", level: "Advanced", description: "Data schemas, Serialization, State hydration", highlight: true },
        { name: "Node.js Basics", level: "Intermediate", description: "Runtime environment, npm packaging, CLI scripts" }
      ]
    },
    {
      title: "Tools & Workflow",
      description: "Version control, developer tooling, and modern deployment environments.",
      skills: [
        { name: "Git & GitHub", level: "Advanced", description: "Branching, PRs, Version control, GitHub APIs", highlight: true },
        { name: "VS Code", level: "Advanced", description: "Extensions, Debugging, Custom snippets" },
        { name: "npm / Package Management", level: "Proficient", description: "Dependency management, build scripts" },
        { name: "Chrome DevTools", level: "Advanced", description: "Network inspection, Console debugging, Performance", highlight: true }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "personal-website",
      name: "Personal Website & Engineering Portfolio",
      category: "Frontend",
      tagline: "Modern, high-performance portfolio and engineering showcase designed with architectural discipline.",
      description: "An open, production-grade React 19 portfolio application built with TypeScript and Vite. Implements custom design tokens, keyboard-first command menu (Cmd+K), sub-100ms interaction latencies, and live GitHub API synchronization.",
      problemSolved: "Consolidates technical projects, live GitHub repository integrations, design token sandbox, and interactive developer tooling in a zero-drift responsive web app with strict WCAG AAA contrast.",
      technologies: ["React 19", "TypeScript", "Vite", "Design Systems", "CSS Variables", "GitHub API"],
      githubUrl: "https://github.com/moaazelshazly/Personal_website",
      demoUrl: "https://github.com/moaazelshazly/Personal_website",
      status: "Production Active",
      highlights: ["Live GitHub API data integration", "Linear-inspired design system with tokens", "Command-K global search navigation", "Zero runtime CSS overhead"],
      featured: true,
      stars: 0,
      forks: 0,
      language: "TypeScript",
      defaultBranch: "main"
    },
    {
      id: "typingapp-react",
      name: "TypingApp React — Speed & Accuracy Engine",
      category: "Frontend",
      tagline: "Interactive typing speed benchmark tracking real-time WPM, keystroke metrics, and error rates.",
      description: "A responsive web application built with React and Vite for testing and improving typing speed. Features real-time Words Per Minute (WPM) telemetry, accuracy percentage, character-by-character validation, and timer countdown mechanics.",
      problemSolved: "Solves UI input lag during rapid typing by decoupling keystroke event recording from the calculation loop, preventing frame drops and layout thrash even during 120+ WPM bursts.",
      technologies: ["React", "JavaScript", "Vite", "CSS3", "State Architecture"],
      githubUrl: "https://github.com/moaazelshazly/TypingApp_React",
      status: "Active Project",
      highlights: ["Sub-16ms keystroke input response", "Real-time WPM & accuracy telemetry", "Custom timer & sentence randomizer", "Instant visual error diagnostics"],
      featured: true,
      stars: 0,
      forks: 0,
      language: "JavaScript",
      defaultBranch: "main"
    },
    {
      id: "js-game",
      name: "Word Guess Arcade — Vanilla JS Engine",
      category: "Frontend",
      tagline: "Interactive browser puzzle game built with native JavaScript, custom DOM physics, and animations.",
      description: "A minimalist, retro-inspired word guessing game built with zero external framework dependencies. Implements custom DOM manipulation, state transitions, animated feedback, hint reveal mechanics, and full keyboard accessibility.",
      problemSolved: "Demonstrates foundational mastery of the JavaScript event loop, DOM tree mutation performance, and CSS keyframe animations without relying on third-party runtime bundles.",
      technologies: ["JavaScript (ESNext)", "HTML5 DOM", "CSS3 Animations", "Event Handling"],
      githubUrl: "https://github.com/moaazelshazly/JsGame",
      status: "Completed",
      highlights: ["Zero external dependencies", "Native event loop architecture", "Keyboard-accessible interaction", "Dynamic hint and state feedback"],
      featured: true,
      stars: 0,
      forks: 0,
      language: "JavaScript",
      defaultBranch: "main"
    },
    {
      id: "neetcode-submissions",
      name: "Algorithms & Data Structures Repository",
      category: "Performance",
      tagline: "Curated solutions to complex algorithmic challenges and computer science patterns in C++.",
      description: "An organized repository of optimal C++ solutions for NeetCode and LeetCode problems. Focuses on data structures (Binary Search Trees, Heaps, Graphs, Hash Maps) and algorithmic strategies (Dynamic Programming, Sliding Window, Two Pointers).",
      problemSolved: "Provides memory-efficient and asymptotically optimal solutions with rigorous Big-O time and space complexity documentation for competitive programming and technical interviews.",
      technologies: ["C++", "Algorithms", "Data Structures", "Big-O Analysis", "NeetCode"],
      githubUrl: "https://github.com/moaazelshazly/neetcode-submissions",
      status: "Active Lab",
      highlights: ["Optimal asymptotic time & space", "Graphs, Dynamic Programming, Trees", "Clean C++ algorithmic implementations", "NeetCode 150 patterns"],
      featured: false,
      stars: 0,
      forks: 0,
      language: "C++",
      defaultBranch: "main"
    },
    {
      id: "mine-project",
      name: "Mine Project — Collaborative Repository",
      category: "Full Stack",
      tagline: "Collaborative software engineering project exploring component integration and team workflows.",
      description: "A collaborative engineering repository built with Git version control workflows, modular architecture, and structured team branch management.",
      problemSolved: "Facilitates clean multi-developer collaboration, code isolation, and git version control discipline across shared feature modules.",
      technologies: ["Git", "Modular Architecture", "Web Engineering"],
      githubUrl: "https://github.com/Mohamed-Elsayed-Saad/Mine-Project",
      status: "Collaborative",
      highlights: ["Multi-contributor Git workflow", "Clean code organization", "Feature branch reviews"],
      featured: false,
      stars: 0,
      forks: 0,
      language: "Web",
      defaultBranch: "main"
    }
  ] as Project[],

  timeline: [
    {
      id: "exp-1",
      type: "experience",
      title: "Frontend & Web Application Developer",
      institution: "Independent & Open Source Projects",
      period: "2024 — Present",
      location: "Remote",
      description: "Architecting and developing modern web applications, interactive tools, and design systems using React 19, TypeScript, and Vite.",
      bullets: [
        "Engineered high-performance React applications including a real-time Typing Benchmark engine and interactive Vanilla JS arcade game.",
        "Integrated live GitHub API synchronization pipelines for real-time repository telemetry, commit updates, and metadata rendering.",
        "Designed and refined accessible design systems adhering to strict WCAG AAA color contrast ratios and keyboard-first navigation patterns."
      ],
      tech: ["React 19", "TypeScript", "Vite", "REST APIs", "CSS Variables"],
      badge: "Active"
    },
    {
      id: "edu-1",
      type: "education",
      title: "B.S. in Computer Science",
      institution: "Faculty of Computer Science",
      period: "2022 — Present",
      location: "Tanta, Egypt",
      description: "Specializing in Software Engineering, Algorithms & Data Structures, and Web Technologies.",
      bullets: [
        "Extensive problem-solving coursework covering Graph Algorithms, Dynamic Programming, and Computational Complexity (NeetCode / LeetCode).",
        "Building practical full-stack and frontend systems with clean architecture, type safety, and modern software design patterns."
      ],
      tech: ["C++", "Algorithms", "Data Structures", "TypeScript", "OOP"],
      badge: "Academic"
    }
  ] as TimelineItem[]
};
