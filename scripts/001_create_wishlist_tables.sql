-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_products table to track who claimed which products
CREATE TABLE IF NOT EXISTS public.user_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_email)
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;

-- Products policies - everyone can read products
CREATE POLICY "products_select_all" ON public.products FOR SELECT USING (true);

-- User products policies - everyone can read, insert their own, delete their own
CREATE POLICY "user_products_select_all" ON public.user_products FOR SELECT USING (true);
CREATE POLICY "user_products_insert_own" ON public.user_products FOR INSERT WITH CHECK (true);
CREATE POLICY "user_products_delete_own" ON public.user_products FOR DELETE USING (true);

-- Insert initial products
INSERT INTO public.products (title, link, image_url) VALUES
('Cuna Convertible de Madera', 'https://example.com/cuna-convertible', '/wooden-convertible-baby-crib.jpg'),
('Sistema de Cochecito 3 en 1', 'https://example.com/cochecito-3en1', '/3-in-1-baby-stroller-system.jpg'),
('Monitor de Video para Bebé', 'https://example.com/monitor-video', '/baby-video-monitor-with-camera.jpg'),
('Set de Ropa para Recién Nacido', 'https://example.com/ropa-bebe', '/baby-clothes-set-newborn.jpg'),
('Bañera para Bebé con Soporte', 'https://example.com/banera-bebe', '/baby-bathtub-with-stand.jpg'),
('Juguetes Sensoriales Educativos', 'https://example.com/juguetes-sensoriales', '/baby-sensory-toys-educational.jpg'),
('Mesa de Cambio con Almacenamiento', 'https://example.com/mesa-cambio', '/baby-changing-table-with-storage.jpg'),
('Humidificador con Luz Nocturna', 'https://example.com/humidificador', '/baby-room-humidifier-with-night-light.jpg')
ON CONFLICT DO NOTHING;
