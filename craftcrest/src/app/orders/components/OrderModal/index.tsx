import { EnhancedOrder } from '../../../utils/type';
import { useEffect, useRef } from 'react';

interface OrderModalProps {
  order: EnhancedOrder;
  onClose: () => void;
}

const OrderModal = ({ order, onClose }: OrderModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    const s = status;
    if (s === 'completed') return 'text-green-600';
    if (s === 'pending') return 'text-orange-500';
    if (s === 'accepted') return 'text-gray-600';
    return 'text-[#5D070D]'; 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
     
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(93, 7, 13, 0.5)' }}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full"
        style={{ color: '#5D070D', fontSize: '1.125rem', lineHeight: '1.6' }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black-500 hover:text-red-600 transition"
          aria-label="Close"
          style={{ fontSize: '1.8rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Order Details</h2>
        <p><strong>Order:</strong> {order.id.toString()}</p>
        <p><strong>Buyer:</strong> {order.buyerName}</p>
        <p><strong>Seller:</strong> {order.sellerName}</p>
        <p><strong>Type:</strong> {order.order_type.charAt(0).toUpperCase() + order.order_type.slice(1)}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`${getStatusColor(order.status)} font-semibold`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total Amount:</strong> Ksh {order.total_amount}</p>
        <p>
          <strong>Payment Status:</strong>{' '}
          <span className={`${getStatusColor(order.payment_status)} font-semibold`}>
            {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderModal;

