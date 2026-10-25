-- MyCupid Database Schema for Supabase
CREATE TABLE IF NOT EXISTS public.declarations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  partner_name TEXT NOT NULL,
  your_name TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  headline TEXT,
  love_letter TEXT NOT NULL,
  music_title TEXT,
  music_artist TEXT,
  youtube_url TEXT,
  spotify_url TEXT,
  photos TEXT[] DEFAULT '{}',
  timeline JSONB DEFAULT '[]',
  enable_quiz BOOLEAN DEFAULT false,
  quiz_questions JSONB DEFAULT '[]',
  enable_memory_game BOOLEAN DEFAULT false,
  memory_photos TEXT[] DEFAULT '{}',
  theme TEXT DEFAULT 'rose',
  plan TEXT DEFAULT 'basic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant lookup by slug
CREATE INDEX IF NOT EXISTS idx_declarations_slug ON public.declarations(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE public.declarations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to view declarations by slug
CREATE POLICY "Public read declarations" 
ON public.declarations FOR SELECT 
USING (true);

-- Allow public insert to create new declarations
CREATE POLICY "Public insert declarations" 
ON public.declarations FOR INSERT 
WITH CHECK (true);
