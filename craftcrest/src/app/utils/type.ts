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