-- Migration: 002_project_details_and_stats.sql
-- Description: Expand projects table with metrics (stars, status, views, architecture_notes) and create project_features table

-- 1. Alter projects table to add stats and architecture notes
ALTER TABLE projects 
    ADD COLUMN IF NOT EXISTS stars INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Live',
    ADD COLUMN IF NOT EXISTS views VARCHAR(50) DEFAULT '1.0k',
    ADD COLUMN IF NOT EXISTS architecture_notes TEXT,
    ADD COLUMN IF NOT EXISTS challenges TEXT;

-- 2. Create project_features table for structured key feature breakdowns
CREATE TABLE IF NOT EXISTS project_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_stars ON projects(stars);
CREATE INDEX IF NOT EXISTS idx_project_features_project_id ON project_features(project_id);
CREATE INDEX IF NOT EXISTS idx_project_features_sort_order ON project_features(sort_order);
