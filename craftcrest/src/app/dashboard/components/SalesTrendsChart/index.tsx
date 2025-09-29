import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import {SalesTrendsChartProps} from '../../../utils/type'


export const SalesTrendsChart = ({ data }: SalesTrendsChartProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-xl border w-[28vw] border-gray-100 xl:h-[30vh] xl:mb-9">
      <div className="flex items-center justify-between mb-6 xl:mb-1">
        <h3 className="text-lg font-semibold text-gray-900">Sales Trends</h3>
        <select className="border border-gray-300 text-[#5D070D] rounded px-3 py-1 text-sm">
          <option>Monthly</option>
        </select>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 14, fill: '#666' }}
            />
            <Bar 
              dataKey="value" 
              fill="#DC2626"
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};