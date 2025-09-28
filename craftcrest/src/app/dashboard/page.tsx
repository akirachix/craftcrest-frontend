'use client';

import { TrendingUp, ShoppingCart, UserCheck } from 'lucide-react';
import { useDashboardData } from "../hooks/useDashboardData";
import { StatsCard } from './components/StatsCard';
import { SalesTrendsChart } from './components/SalesTrendsChart';
import { SellerVerificationChart } from './components/SellerVerificationChart';
import { ProductCategories } from './components/ProductCategories';
import { PerformanceStats } from './components/PerformanceStats';
import Layout from '../shared-components/Layout';

const Dashboard = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 p-8 bg-white flex items-center justify-center min-h-screen">
          <div className="text-[#5D070D] font-semibold text-lg">Loading dashboard data...</div>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="flex-1 p-8 bg-white flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 ">Error loading dashboard data</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }


  return (
    <Layout>
      <div className="flex h-screen w-full bg-[#f0e5e6]" style={{ color: '#5D070D' }}>
        <main className="flex-1 overflow-y-auto p-12 max-w-7xl mx-auto flex flex-col min-h-screen">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-6 h-[15vh] w-full">
            <StatsCard
              title="Total Sales"
              value={`Ksh ${data.totalSales.toLocaleString()}`}
              icon={TrendingUp}  
              iconColor="text-white"
            />
            <StatsCard
              title="Total Orders"
              value={`${data.totalOrders} Orders`}
              icon={ShoppingCart}  
              iconColor="text-white"
            />
            <StatsCard
              title="Verified Sellers"
              value={`${data.verifiedSellers} Sellers`}
              icon={UserCheck} 
              iconColor="text-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SalesTrendsChart data={data.salesTrends} />
            <SellerVerificationChart data={data.sellerVerification} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductCategories data={data.productCategories} />
            <PerformanceStats data={data.performanceStats} />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
