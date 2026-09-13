export interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  story: string;
  role: string;
  demo_url: string | null;
  repo_url: string | null;
  thumbnail_url: string;
  is_featured: boolean;
  sort_order: number;
  stars?: number | null;
  status?: string | null;
  views?: string | null;
  architecture_notes?: string | null;
  challenges?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectImageRow {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface TechnologyRow {
  id: string;
  name: string;
  created_at: string;
}

export interface ProjectTechnologyRow {
  project_id: string;
  technology_id: string;
}

export interface ProjectFeatureRow {
  id: string;
  project_id: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface ProjectInsert {
  title: string;
  slug: string;
  summary: string;
  story: string;
  role: string;
  demo_url?: string | null;
  repo_url?: string | null;
  thumbnail_url: string;
  is_featured?: boolean;
  sort_order?: number;
  stars?: number | null;
  status?: string | null;
  views?: string | null;
  architecture_notes?: string | null;
  challenges?: string | null;
}

export interface ProjectWithDetails extends ProjectRow {
  images: ProjectImageRow[];
  technologies: string[];
  features?: ProjectFeatureRow[];
}

export interface AboutProfileRow {
  id: string;
  name: string;
  headline: string;
  bio: string; // JSON string or string array in JSON
  photo_url: string;
  avatar_fallback: string;
  status: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  stats: string; // JSON string representing stats object
  created_at: string;
  updated_at: string;
}

export interface SkillCategoryRow {
  id: string;
  name: string;
  icon_name: string;
  sort_order: number;
  created_at: string;
}

export interface SkillRow {
  id: string;
  category_id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  years_of_exp: number;
  description: string | null;
  is_key: boolean;
  sort_order: number;
  created_at: string;
}

export interface ExperienceRow {
  id: string;
  role: string;
  company: string;
  location: string | null;
  period: string;
  is_current: boolean;
  summary: string;
  contributions: string; // JSON string array
  technologies: string; // JSON string array
  sort_order: number;
  created_at: string;
}

export interface EducationRow {
  id: string;
  degree: string;
  institution: string;
  year: string;
  focus: string;
  sort_order: number;
  created_at: string;
}

export interface AboutProfileUpdate {
  name?: string;
  headline?: string;
  bio?: string[];
  photo_url?: string;
  avatar_fallback?: string;
  status?: string;
  location?: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  stats?: {
    yearsOfExperience?: number;
    completedProjects?: number;
    codeCommits?: string;
    clientSatisfaction?: string;
  };
}

export type ContactMessageCategory = "project" | "consultation" | "hire" | "general";
export type ContactMessageStatus = "unread" | "read" | "replied" | "archived";

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: ContactMessageCategory;
  message: string;
  status: ContactMessageStatus;
  ip_address?: string | null;
  user_agent?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessageInsert {
  name: string;
  email: string;
  subject: string;
  category?: ContactMessageCategory;
  message: string;
  ip_address?: string | null;
  user_agent?: string | null;
}

export interface ContactMessageUpdate {
  status?: ContactMessageStatus;
  notes?: string | null;
}
