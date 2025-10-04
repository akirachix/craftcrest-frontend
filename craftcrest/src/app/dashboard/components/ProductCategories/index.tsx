import { LayoutGrid } from 'lucide-react';
import {ProductCategoriesProps} from '../../../utils/type'

const categoryColors = {
  'Pottery': '#8B1538',
  'Ceramics': '#DC2626', 
  'Tailoring': '#FCD34D',
  'Weaving': '#2F7329',
  'Crocheting':'#8B1538',
  'Jewelry':'#2F7329'
};

export const ProductCategories = ({ data }: ProductCategoriesProps) => {
  return (
    <div className="bg-white rounded-lg p-4 w-[32vw] h-[55vh] shadow-sm border border-gray-100 xl:mt-[-19] xl:h-64 flex flex-col">
      <div className="flex items-center gap-2 mb-4 flex-shrink-0">
        <LayoutGrid className="w-4 h-4 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-900 xl:text-[18px]">Product Categories</h3>
      </div>

      <div className="space-y-3 xl:space-y-2 overflow-y-auto flex-grow pr-2">
        {data.map((category, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-700">{category.name}</span>
              <span className="text-xs text-gray-600">{category.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${category.percentage}%`,
                  backgroundColor: categoryColors[category.name as keyof typeof categoryColors] 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};