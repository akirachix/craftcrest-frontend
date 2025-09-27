'use client'
import { TrendingUp, ShoppingCart, UserCheck } from 'lucide-react';
import { useDashboardData } from "../hooks/useDashboardData"
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
      <div className="flex-1 p-8 bg-[#F5E8D8]">
        <div>
          <div className="h-8 bg-gray-300 rounded w-48 "></div>
          <div className="grid grid-cols-3 gap-6 mb-8"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-300 h-80 rounded-lg"></div>
            <div className="bg-gray-300 h-80 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-1 p-8 bg-[#F5F1EB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 ">Error loading dashboard data</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (

    <Layout>
    <div className="flex-1 p-8 bg-[#f0e5e6] mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl font-semibold text-gray-900 ml-20 ">Dashboard</h1>
      <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-2 mb-3">
        <StatsCard
          title="Total Sales"
          value={`Ksh ${(data.totalSales).toLocaleString()}`}
          icon={TrendingUp}
          iconColor="text-white"
        />
        <StatsCard
          title="Total Orders"
          value={`${(data.totalOrders)} Orders`}
          icon={ShoppingCart}
          iconColor="text-white"
        />
        <StatsCard
          title="Verified Sellers"
          value={`${(data.verifiedSellers)} Sellers`}
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
    </div>
    </Layout>
  );
};

export default Dashboard;