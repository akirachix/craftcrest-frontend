<<<<<<< HEAD
import { LucideIcon } from 'lucide-react';

export interface Payment {
  amount: string;
  transaction_code: string;
  status: string;
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
  rejection_reason?: string;
  delivery_confirmed: boolean;
  rejection_date?: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  
}

export interface Product {
  id: string;
  artisan_id: number;
  product_name: string;
  description: string;
  category: "pottery" | "tailoring" | "basketry" | "weaving" | "crocheting" | "ceramics" | "jewelry";
  price: number;
  stock_quantity: number;
  image: string | null;
  is_customizable: boolean;
  custom_options?: string | null;
  seller: string;
}

export interface Rating {
  rating: number | null;
  review_text?: string;
  order?: number | null;
  buyer?: number | null;
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
=======
export type Seller = {
  id: number;
  user_type: string;
  first_name: string;
  last_name: string;
  created_at?: string;
};

export type Order = {
  id: number;
  artisan: number;
  status: string;
  order?: number;
};

export type Rating = {
  id: number;
  rating: number;
  order: number;
};

export type Payment = {
  id: number;
  amount: string;
  artisan: number;
};
>>>>>>> 46ac5e4a615909039317161fe4b650a90c8e59bf
