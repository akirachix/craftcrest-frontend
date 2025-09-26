"use client";
import SellersManagement from "./sellerManagement/page";
import { Dashboard } from './dashboard/components/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SellersManagement/>
      <Dashboard />
    </div>
  );
}


