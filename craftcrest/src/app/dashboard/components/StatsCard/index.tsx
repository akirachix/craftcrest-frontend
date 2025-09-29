import { StatsCardProps } from '../../../utils/type';

export const StatsCard = ({ title, value, icon: Icon }: StatsCardProps) => {
  return (
    <div className="bg-[#5D070D] rounded-lg p-6 shadow-sm border mb-5 border-gray-100 
      h-28 flex items-center justify-between
      xl:h-28 xl:flex xl:items-center xl:justify-between
      ">
      
      <div className="flex flex-col space-y-1">
        <p className="text-lg text-white text-[18px] whitespace-nowrap xl:text-[18px]">{title}</p>
        <p className="text-2xl font-semibold text-white text-[20px] whitespace-nowrap xl:text-[20px]">{value}</p>
      </div>
      <div className="ml-4">
        <Icon className="w-10 h-12 xl:h-12 text-white" />
      </div>
    </div>
  );
};
