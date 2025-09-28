import { EnhancedOrder } from '../../../utils/type';

interface OrderTableProps {
  orders: EnhancedOrder[];
  onView: (order: EnhancedOrder) => void;
  noResults?: boolean;
}

const OrderTable = ({ orders, onView, noResults = false }: OrderTableProps) => {
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'completed') return 'text-green-600';
    if (s === 'pending') return 'text-orange-500';
    if (s === 'accepted') return 'text-gray-600';
    return '';
  };

  return (
    <div className="rounded-lg shadow-md w-full border border-gray-300">
      <table className="w-full rounded-lg">
        <thead>
          <tr className="bg-[#5D070D] text-white text-lg font-semibold">
            <th className="pl-6 py-3 text-left rounded-tl-lg whitespace-nowrap">Order</th>
            <th className="pl-6 py-3 text-left whitespace-nowrap">Buyer</th>
            <th className="pl-6 py-3 text-left whitespace-nowrap">Seller</th>
            <th className="pl-6 py-3 text-left whitespace-nowrap">Type</th>
            <th className="pl-6 py-3 text-left whitespace-nowrap">Quantity</th>
            <th className="pl-6 py-3 text-left whitespace-nowrap">Price</th>
            <th className="pl-6 py-3 text-left whitespace-nowrap">Status</th>
            <th className="pl-6 py-3 text-left rounded-tr-lg whitespace-nowrap">Details</th>
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
                className={`text-[#5D070D] text-base ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#FAF2E8]'
                } hover:bg-[#F5E8D8] transition-colors duration-200`}
              >
                <td className="pl-6 py-4 whitespace-nowrap font-mono">{order.id}</td>
                <td className="pl-6 py-4 whitespace-nowrap">{order.buyerName}</td>
                <td className="pl-6 py-4 whitespace-nowrap">{order.sellerName}</td>
                <td className="pl-6 py-4 whitespace-nowrap capitalize">{order.order_type}</td>
                <td className="pl-6 py-4 whitespace-nowrap">{order.quantity}</td>
                <td className="pl-6 py-4 whitespace-nowrap">Ksh {order.total_amount}</td>
                <td
                  className={`pl-6 py-4 font-semibold whitespace-nowrap ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </td>
                <td className="pl-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onView(order)}
                    className="bg-[#5D070D] hover:bg-[#7a0a1a] text-white text-base px-3 py-1 rounded-md transition cursor-pointer"
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
  );
};

export default OrderTable;
