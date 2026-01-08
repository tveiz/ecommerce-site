export interface User {
  id: string;
  email: string;
  username: string;
  photo_url?: string;
  is_admin: boolean;
  is_attendant: boolean;
  hwid?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category_id: string;
  stock: number;
  delivery_keys: string[];
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  display_order: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_paid: number;
  payment_method: 'simulacao' | 'pix_automatico' | 'pix_confiavel';
  payment_status: 'pending' | 'completed' | 'failed' | 'cancelled';
  coupon_used?: string;
  delivery_key?: string;
  discord_ticket_id?: string;
  private_chat_id?: string;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  is_active: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: number;
  site_name: string;
  site_description: string;
  theme: string;
  payment_config: {
    pix_key: string;
    pix_qr_code_image_url: string;
    preferred_banks: string[];
  };
}
