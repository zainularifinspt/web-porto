-- Migration: 006_complete_projects_schema.sql
-- Description: Ensure all columns, constraints, and indexes for project CRUD & reordering are up to date

-- Verify columns on projects table
ALTER TABLE projects
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS stars INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Live',
    ADD COLUMN IF NOT EXISTS views VARCHAR(50) DEFAULT '1.0k',
    ADD COLUMN IF NOT EXISTS architecture_notes TEXT,
    ADD COLUMN IF NOT EXISTS challenges TEXT;

-- Verify indexes for rapid search and sorting
CREATE INDEX IF NOT EXISTS idx_projects_sort_featured ON projects (is_featured DESC, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_title_search ON projects (title);
