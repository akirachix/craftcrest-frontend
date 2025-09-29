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
            <p className="text-red-600">Error loading dashboard data</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-screen bg-[#f0e5e6]" style={{ color: '#5D070D' }}>
        
        <main className="flex-1 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-20 max-w-full md:max-w-7xl xl:max-w-[1440px] mx-auto flex flex-col min-h-0 overflow-y-auto :overflow-y-visible xl:overflow-y-auto">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">Dashboard</h1>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-19 sm:mb-6 min-h-[100px]">
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

          <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-6 lg:gap-8 md:mb-10">
            <div className="w-full h-56 sm:h-64 md:h-72 lg:h-auto">
              <SalesTrendsChart data={data.salesTrends} />
            </div>
            <div className="w-full  h-56 sm:h-64 md:h-72 lg:h-auto">
              <SellerVerificationChart data={data.sellerVerification} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ProductCategories data={data.productCategories} />
            <PerformanceStats data={data.performanceStats} />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
