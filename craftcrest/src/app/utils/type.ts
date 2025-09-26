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

 


  