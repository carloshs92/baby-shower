-- Create user_selections table to track which users selected which products
CREATE TABLE IF NOT EXISTS user_selections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_email)
);

-- Enable Row Level Security
ALTER TABLE user_selections ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since we're not using auth)
CREATE POLICY "Allow all operations on user_selections" ON user_selections
FOR ALL USING (true) WITH CHECK (true);
