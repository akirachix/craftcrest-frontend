import { EnhancedOrder } from '../../../utils/type';
import { ShoppingCart } from "lucide-react";

interface OrderTableProps {
  orders: EnhancedOrder[];
  totalOrders: number;
  onView: (order: EnhancedOrder) => void;
  noResults?: boolean;
}

const OrderTable = ({ orders, totalOrders, onView, noResults = false }: OrderTableProps) => {
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'completed') return 'text-green-600';
    if (s === 'pending') return 'text-orange-500';
    if (s === 'accepted') return 'text-gray-600';
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full border border-[#5D070D]">
      <div className="p-4 bg-white border-b border-[#5D070D] flex items-center gap-4">
        <ShoppingCart className="text-[#5D070D]" size={26} />
        <h2 className="font-semibold text-[#5D070D] text-[18px]">
          Orders ({totalOrders})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-[#5D070D] text-white font-semibold text-[17px]">
            <tr>
              <th className="pl-10 py-3 whitespace-nowrap">Order</th>
              <th className="pl-10 py-3 whitespace-nowrap">Buyer</th>
              <th className="pl-10 py-3 whitespace-nowrap">Seller</th>
              <th className="pl-10 py-3 whitespace-nowrap">Type</th>
              <th className="pl-10 py-3 whitespace-nowrap">Status</th>
              <th className="pl-10 py-3 whitespace-nowrap lg:pr-4">Details</th>
            </tr>
          </thead>

          <tbody>
            {noResults ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-lg text-[#5D070D] font-semibold">
                  No results found
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`text-[#5D070D] text-[15px] ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FAF2E8]'
                  } hover:bg-[#F5E8D8] transition-colors duration-200`}
                >
                  <td className="pl-10 py-4 whitespace-nowrap font-mono">{order.id}</td>
                  <td className="pl-10 py-4 whitespace-nowrap">{order.buyerName}</td>
                  <td className="pl-10 py-4 whitespace-nowrap">{order.sellerName}</td>
                  <td className="pl-10 py-4 whitespace-nowrap capitalize">{order.order_type}</td>
                  <td
                    className={`pl-10 py-4 font-semibold whitespace-nowrap ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </td>
                  <td className="pl-10 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onView(order)}
                      className="bg-[#5D070D] hover:bg-[#7a0a1a]  text-white text-sm px-2 py-1 rounded-md transition cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
