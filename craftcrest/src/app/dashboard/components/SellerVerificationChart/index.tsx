import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Settings } from 'lucide-react';
import { SellerVerificationChartProps } from '../../../utils/type'

export const SellerVerificationChart = ({ data }: SellerVerificationChartProps) => {
  const chartData = [
    { name: 'Verified', value: data.verified, color: '#8B1538' },
    { name: 'Unverified', value: data.unverified, color: '#E5E5E5' }
  ];
  const total = data.verified + data.unverified;

  return (
    <div className="bg-white rounded-xl p-6 w-[40vw] max-w-[30vw] h-[30vh] lg:h-[290] shadow-xl border border-gray-50 flex flex-col xl:h-60 ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-[#8B1538]">Seller Verification</h3>

      </div>
      <div className="flex  flex-grow   ">
        <div className="relative w-[20vw] h-[10vw] ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                paddingAngle={3}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-gray-400">Total</span>
            <span className="text-2xl font-semibold text-[#8B1538]">{total}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full xl:h-35">
          <div>
            <div className=" mt-6 flex items-center gap-3 mb-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: '#8B1538' }}
              ></div>
              <span className="text-sm text-gray-600">Verified</span>
              <span className="text-sm font-semibold text-[#8B1538] ml-auto">{data.verified} ({((data.verified / total) * 100).toFixed(0)}%)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Unverified</span>
              <span className="text-sm font-semibold text-[#8B1538] ml-auto">{data.unverified} ({((data.unverified / total) * 100).toFixed(0)}%)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
            <img src="/images/Verified Badge.svg"
              alt="verification Badge"
              className="h-10 object-contain "/>
            <span className="text-sm text-gray-600">Verification rate:</span>
            <span className="text-sm font-semibold text-[#8B1538] ml-auto">{data.verificationRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
