-- Migration: Add seller profile fields to users table
-- Date: 2026-02-15
-- Purpose: Support FunWithFeet-style marketplace with seller details

-- Add new columns to users table
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS age INTEGER,
  ADD COLUMN IF NOT EXISTS country VARCHAR(2),
  ADD COLUMN IF NOT EXISTS bio TEXT;

-- Add indexes for performance (optional)
CREATE INDEX IF NOT EXISTS idx_users_country ON users(country);

-- Example data for testing (remove in production)
-- UPDATE users SET 
--   age = 25,
--   country = 'US',
--   bio = 'Professional content creator from LA. High quality photos available 💕'
-- WHERE telegram_username = '@testuser';

-- Verify migration
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('age', 'country', 'bio');
