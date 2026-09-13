-- Migration: 003_create_about_schema.sql
-- Description: Create tables for About Me profile, skill categories, skills, experiences, and education

-- 1. Table: about_profiles
CREATE TABLE IF NOT EXISTS about_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    headline VARCHAR(255) NOT NULL,
    bio JSONB NOT NULL DEFAULT '[]'::jsonb,
    photo_url TEXT NOT NULL,
    avatar_fallback VARCHAR(10) NOT NULL DEFAULT 'DEV',
    status VARCHAR(100) NOT NULL DEFAULT 'Available',
    location VARCHAR(255) NOT NULL DEFAULT 'Indonesia',
    email VARCHAR(255) NOT NULL,
    github_url TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    stats JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: skill_categories
CREATE TABLE IF NOT EXISTS skill_categories (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(100) NOT NULL DEFAULT 'Code',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table: skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id VARCHAR(100) NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL DEFAULT 'Intermediate',
    years_of_exp INTEGER DEFAULT 1,
    description TEXT,
    is_key BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table: experiences
CREATE TABLE IF NOT EXISTS experiences (
    id VARCHAR(100) PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    period VARCHAR(100) NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT false,
    summary TEXT NOT NULL,
    contributions JSONB NOT NULL DEFAULT '[]'::jsonb,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table: education
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    year VARCHAR(100) NOT NULL,
    focus VARCHAR(255) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skills_sort_order ON skills(sort_order);
CREATE INDEX IF NOT EXISTS idx_skill_categories_sort_order ON skill_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_experiences_sort_order ON experiences(sort_order);
CREATE INDEX IF NOT EXISTS idx_education_sort_order ON education(sort_order);

-- Optional trigger for auto-updating about_profiles updated_at timestamp
DROP TRIGGER IF EXISTS trigger_about_profiles_updated_at ON about_profiles;
CREATE TRIGGER trigger_about_profiles_updated_at
BEFORE UPDATE ON about_profiles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
