-- Migration: 005_create_social_links_schema.sql
-- Description: Create social_links and contact_channels configuration tables

-- 1. Table: social_links
CREATE TABLE IF NOT EXISTS social_links (
    id VARCHAR(100) PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    handle VARCHAR(100) NOT NULL,
    icon_name VARCHAR(100) NOT NULL DEFAULT 'Globe',
    description TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: contact_channels
CREATE TABLE IF NOT EXISTS contact_channels (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    value VARCHAR(255) NOT NULL,
    action_label VARCHAR(100) NOT NULL,
    action_url TEXT NOT NULL,
    icon_name VARCHAR(100) NOT NULL DEFAULT 'Mail',
    badge VARCHAR(100),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_social_links_sort_order ON social_links(sort_order);
CREATE INDEX IF NOT EXISTS idx_contact_channels_sort_order ON contact_channels(sort_order);
