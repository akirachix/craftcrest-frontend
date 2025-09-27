export interface EnhancedOrder {
  id: number;
  buyerName: string;
  sellerName: string;
  order_type: string;
  quantity: number;
  total_amount: string;
  status: string;
  created_at: string;
  rejection_reason: string | null;
  delivery_confirmed: boolean;
  rejection_date: string | null;
  payment_status: string;
  updated_at: string;
  cart: any | null;
  buyer: number;
  artisan: number;
}


export interface Order {
  id: number;
  order_type: string;
  status: string;
  quantity: number;
  total_amount: string;
  rejection_reason: string | null;
  delivery_confirmed: boolean;
  rejection_date: string | null;
  payment_status: string;
  created_at: string;
  updated_at: string;
  cart: any | null;
  buyer: number;
  artisan: number;
}

export interface User {
  id: number;
  user_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  national_id: string | null;
  image: string | null;
  otp_verified: boolean;
  otp_exp: string | null;
  latitude: string | null;
  longitude: string | null;
}