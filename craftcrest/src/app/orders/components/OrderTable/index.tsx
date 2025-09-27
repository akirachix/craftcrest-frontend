import { EnhancedOrder } from '../../../utils/type';

interface OrderTableProps {
  orders: EnhancedOrder[];
  onView: (order: EnhancedOrder) => void;
  noResults?: boolean;
}

const OrderTable = ({ orders, onView, noResults = false }: OrderTableProps) => {
  const getStatusColor = (status: string) => {
    const s = status;
    if (s === 'completed') return 'text-green-600';
    if (s === 'pending') return 'text-orange-500';
    if (s === 'accepted') return 'text-gray-600';
    return '';
  };

  return (
    <div className="rounded-lg m-auto shadow-md">
      <table className="w-5/5 rounded-lg">
        <thead>
          <tr className="bg-[#5D070D] text-white text-[18px] font-semibold">
            <th className="pl-15 py-3 text-left rounded-tl-lg">Order </th>
            <th className="pl-16 py-3 text-left">Buyer</th>
            <th className="pl-16 py-3 text-left">Seller</th>
            <th className="pl-16 py-3 text-left">Type</th>
            <th className="pl-16 py-3 text-left">Quantity</th>
            <th className="pl-16 py-3 text-left">Price</th>
            <th className="pl-16 py-3 text-left">Status</th>
            <th className="pl-16 py-3 text-left rounded-tr-lg">Details</th>
          </tr>
        </thead>

        <tbody>
          {noResults ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-lg text-[#5D070D] font-semibold">
                No result found
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr
                key={order.id}
                className={`text-[#5D070D] text-[16px] ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#FAF2E8]'
                } hover:bg-[#F5E8D8] transition-colors duration-200`}
              >
                <td className="pl-18 py-4">{order.id}</td>
                <td className="pl-16 py-4">{order.buyerName}</td>
                <td className="pl-16 py-4">{order.sellerName}</td>
                <td className="pl-16 py-4 capitalize">{order.order_type}</td>
                <td className="pl-25 py-4">{order.quantity}</td>
                <td className="pl-16 py-4">Ksh {order.total_amount}</td>
                <td className={`pl-16 py-4 font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </td>
                <td className="pl-16 py-4">
                  <button
                    onClick={() => onView(order)}
                    className="bg-[#5D070D] hover:bg-[#7a0a1a] text-white text-[15px] px-2 py-1 rounded-md transition cursor-pointer"
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
