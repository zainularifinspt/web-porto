export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
  caption?: string;
  sortOrder: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  story: string;
  role: string;
  demoUrl?: string;
  repoUrl?: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  technologies: string[];
  images?: ProjectImage[];
  stats?: {
    stars?: number;
    status?: "Live" | "Beta" | "Open Source" | "In Development";
    views?: string;
  };
}
