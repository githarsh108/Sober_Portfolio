
import { Project, Experience, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Fitness Fusion",
    category: "AI-powered fitness platform (SAI)",
    image: "https://plus.unsplash.com/premium_photo-1712761996875-3057cee4f6af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.github.com/githarsh108"
  },
  {
    id: 2,
    title: "Travel Buddy",
    category: "AI-powered iterinary platform",
    image: "https://images.unsplash.com/photo-1678667720699-5c0fc04ac166?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VFJBVkVMJTIwQVBQfGVufDB8fDB8fHww",
    link: "https://www.github.com/githarsh108"
  },
  {
    id: 3,
    title: "Text to Diagram Generator",
    category: "Creating system designs with text",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U1lTVEVNJTIwREVTSUdOfGVufDB8fDB8fHww",
    link: "https://www.github.com/githarsh108"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    company: "E-team(Humanize IQ)",
    role: "AI Engineer",
    period: "2023 — Present",
    description: "Architecting the core platform from 0 to 1. Implementing high-performance real-time data streaming and a custom shader-based UI engine."
  },
  {
    id: 2,
    company: "Webspace IT",
    role: "Software Engineer",
    period: "2021 — 2023",
    description: "Led the migration of a legacy monolithic frontend to a modern micro-frontend architecture, improving deployment speeds by 40%."
  },
  {
    id: 3,
    company: "Hashedbit Innovation",
    role: "Frontend Specialist",
    period: "2019 — 2021",
    description: "Crafted award-winning interactive experiences for clients like Nike and Apple. Specialized in GSAP and WebGL integrations."
  }
];

export const SKILLS: Skill[] = [
  { id: 1, name: "React / Next.js" },
  { id: 2, name: "TypeScript" },
  { id: 3, name: "GSAP / Framer" },
  { id: 4, name: "Three.js / GLSL" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "PostgreSQL" },
  { id: 7, name: "Tailwind CSS" },
  { id: 8, name: "AWS / Vercel" }
];