import { LucideIcon } from 'lucide-react';

export interface CartItem {
  [key: string]: unknown;
}

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
  cart: CartItem[] | null;
  buyer: number;
  artisan: number;
}

export interface Payment {
  id: number;
  artisan: string;
  amount: string;
  order: string;
  status: "Held" | "Refunded" | "Released";
  date: string;
  transaction_code: string;
  paid_at: string;
  releasedDate?: string;
}

export interface PaymentTableProps {
  payment: Payment[];
}

export interface User {
  id: number;
  user_type: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  national_id?: string;
  image?: string;
  otp_verified?: boolean;
  otp_exp?: string | null;
  is_active?: boolean;
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
  cart: CartItem[] | null;
  buyer: number;
  artisan: number;
}

export interface UserOrderInfo {
  rejection_reason?: string;
  delivery_confirmed: boolean;
  rejection_date?: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  artisan: number;
  order?: number;
}

export interface Product {
  id: string;
  product_name: string;
  description: string;
  category: "pottery" | "tailoring" | "basketry" | "weaving" | "crocheting" | "ceramics" | "jewelry";
  price: number;
  stock_quantity: number;
  image: string | null;
  is_customizable: boolean;
  custom_options?: string | null;
}

export interface Rating {
  rating: number | null;
  review_text?: string;
  order?: number | null;
  buyer?: number | null;
  id: number;
}

export interface PerformanceStatsProps {
  data: {
    rejectionRate: number;
    paidOrders: number;
    averageRating: number;
    fulfillmentRate: number;
  };
}

export interface ProductCategoriesProps {
  data: Array<{
    name: string;
    percentage: number;
  }>;
}

export interface SalesTrendsChartProps {
  data: Array<{
    month: string;
    value: number;
  }>;
}

export interface SellerVerificationChartProps {
  data: {
    verified: number;
    unverified: number;
    verificationRate: number;
  };
}

export interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
}

export type Seller = {
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
};