-- Create table for single user selections (only one person can reserve each product)
CREATE TABLE IF NOT EXISTS public.user_selections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE, -- UNIQUE ensures only one person can reserve each product
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_selections ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read all selections
CREATE POLICY "Anyone can view user selections" ON public.user_selections
  FOR SELECT USING (true);

-- Policy: Anyone can insert their own selection
CREATE POLICY "Anyone can insert user selections" ON public.user_selections
  FOR INSERT WITH CHECK (true);

-- Policy: Users can only delete their own selections
CREATE POLICY "Users can delete own selections" ON public.user_selections
  FOR DELETE USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- Policy: Users can update their own selections
CREATE POLICY "Users can update own selections" ON public.user_selections
  FOR UPDATE USING (user_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);
