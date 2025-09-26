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