
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Skill {
  id: number;
  name: string;
}
