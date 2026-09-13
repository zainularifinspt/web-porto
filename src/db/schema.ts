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
}
