-- Migration: 004_create_contact_messages_schema.sql
-- Description: Create contact_messages table for storing visitor inquiries and message status

-- 1. Table: contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'general', -- 'project', 'consultation', 'hire', 'general'
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unread', -- 'unread', 'read', 'replied', 'archived'
    ip_address VARCHAR(100),
    user_agent TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for efficient retrieval, sorting, and administrative filtering
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_category ON contact_messages(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Trigger function for auto-updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_messages_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on contact_messages
DROP TRIGGER IF EXISTS trigger_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER trigger_contact_messages_updated_at
BEFORE UPDATE ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION update_contact_messages_timestamp();
