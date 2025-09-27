"use client";
import Link from "next/link";
import PaymentTable from "./payment/components/PaymentsTable";
import ProductManagement from "./products";
import SellersManagement from "./sellerManagement/page";
import { Dashboard } from './dashboard/components/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen flex bg-gray-50">
       <ProductManagement />
      <SellersManagement/>
      <Dashboard />
      <PaymentTable/>
    </div>
  );
}


