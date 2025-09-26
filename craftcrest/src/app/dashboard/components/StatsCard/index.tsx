
import {StatsCardProps} from '../../../utils/type'


export const StatsCard = ({ title, value, icon: Icon }: StatsCardProps) => {
  return (
    <div className="bg-[#5D070D] ml-20 rounded-lg p-6 shadow-sm border mb-5  border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg text-white mb-1">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
        <div>
          <Icon className="w-9 h-10" />
        </div>
      </div>
    </div>
  );
};