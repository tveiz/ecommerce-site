-- Tabela de usuários (usa a tabela 'auth.users' integrada do Supabase)
-- Criaremos uma tabela de perfil para armazenar dados extras
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    photo_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    is_attendant BOOLEAN DEFAULT FALSE,
    hwid TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- INSERIR O USUÁRIO ADMIN PADRÃO (senha você define depois via interface do Supabase Auth)
-- Primeiro, crie o usuário manualmente na aba 'Authentication' do Supabase com o email 'tm9034156@gmail.com'.
-- Depois, execute este comando no SQL Editor, substituindo 'id_do_usuario' pelo ID real do usuário criado:
-- INSERT INTO user_profiles (id, username, email, is_admin, hwid) VALUES ('id_do_usuario', 'adm00', 'tm9034156@gmail.com', TRUE, 'adm-hwid-fixo');

CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    stock INTEGER DEFAULT 0 CHECK (stock >= 0 AND stock <= 1000),
    delivery_keys TEXT[], -- Array para armazenar múltiplas chaves de entrega
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount_percentage INTEGER CHECK (discount_percentage > 0 AND discount_percentage <= 100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    total_paid DECIMAL(10,2),
    payment_method TEXT CHECK (payment_method IN ('simulacao', 'pix_automatico', 'pix_confiavel')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'cancelled')),
    coupon_used TEXT,
    delivery_key TEXT, -- Chave entregue ao cliente
    discord_ticket_id TEXT,
    private_chat_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    site_name TEXT DEFAULT 'Meu E-commerce',
    site_description TEXT DEFAULT 'Descrição do meu site incrível',
    theme TEXT DEFAULT 'normal',
    payment_config JSONB DEFAULT '{"pix_key": "", "pix_qr_code_image_url": "", "preferred_banks": []}'::jsonb,
    CONSTRAINT single_row CHECK (id = 1)
);

-- Inserir configurações padrão
INSERT INTO site_settings (site_name, site_description) 
VALUES ('Meu E-commerce', 'Descrição do meu site incrível');
