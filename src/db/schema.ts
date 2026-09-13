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
