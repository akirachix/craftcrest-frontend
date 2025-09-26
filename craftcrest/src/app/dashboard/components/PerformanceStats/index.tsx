import { AlertCircle, CheckCircle, Star, Clock } from 'lucide-react';
import { PerformanceStatsProps } from '../../../utils/type';

export const PerformanceStats = ({ data }: PerformanceStatsProps) => {
  const stats = [
    {
      icon: AlertCircle,
      label: 'Rejection Rate',
      value: `${data.rejectionRate}%`,
      target: 'Target: <=10%',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: CheckCircle,
      label: 'Paid Orders',
      value: data.paidOrders.toString(),
      target: 'Target: >=10 orders',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Star,
      label: 'Average Customer Rating',
      value: data.averageRating.toFixed(1),
      target: 'Target: >=4.0 out of 5',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: CheckCircle,
      label: 'Order Fulfillment Rate',
      value: `${data.fulfillmentRate}%`,
      target: 'Target: >=90%',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border w-[30vw] border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Performance Stats</h3>

      <div className=" bg-[#F5E8D8]">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100">
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.target}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};