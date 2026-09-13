export interface SkillItem {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExp?: number;
  description?: string;
  isKey?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  isCurrent?: boolean;
  summary: string;
  contributions: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  focus: string;
}

export interface AboutProfile {
  name: string;
  headline: string;
  bio: string[];
  photoUrl: string;
  avatarFallback: string;
  status: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  stats: {
    yearsOfExperience: number;
    completedProjects: number;
    codeCommits: string;
    clientSatisfaction: string;
  };
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  education: EducationItem[];
}
