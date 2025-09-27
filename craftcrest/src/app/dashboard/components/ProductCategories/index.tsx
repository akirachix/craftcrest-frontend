import { LayoutGrid } from 'lucide-react';

import {ProductCategoriesProps} from '../../../utils/type'

const categoryColors = {
  'Pottery': '#8B1538',
  'Ceramics': '#DC2626', 
  'Tailoring': '#FCD34D',
  'Weaving': '#2F7329'
};

export const ProductCategories = ({ data }: ProductCategoriesProps) => {
  return (
    <div className="bg-white rounded-lg p-6  w-[32vw] h-[40vh] shadow-sm border ml-20 border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <LayoutGrid className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Product Categories</h3>
      </div>

      <div className="space-y-4">
        {data.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="text-sm text-gray-600">{category.percentage}%</span>
            </div>
            <div className="w-[25vw] bg-gray-200 h-5 rounded-full">
              <div
                className="h-5 rounded-full transition-all duration-300"
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