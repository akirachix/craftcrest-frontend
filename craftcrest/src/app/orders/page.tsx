'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import useFetchOrders from '../hooks/useFetchOrders';
import useFetchUsers from '../hooks/useFetchUsers';
import OrderTable from './components/OrderTable';
import OrderModal from './components/OrderModal';
import { EnhancedOrder } from '../utils/type';

import Layout from '../shared-components/Layout';

interface MaroonDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const MaroonDropdown: React.FC<MaroonDropdownProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-40" style={{ userSelect: 'none' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-2 border rounded-md bg-white text-[#5D070D] font-semibold flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ cursor: 'pointer' }}
      >
        {value}
        <ChevronDownIcon
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {open && (
        <ul
          tabIndex={-1}
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-[#5D070D] shadow-lg border border-[#5D070D]"
          style={{ maxHeight: '240px' }}
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(option);
                }
              }}
              tabIndex={0}
              className={`cursor-pointer select-none px-5 py-2 ${
                value === option ? 'text-[#5D070D]' : ''
              } hover:bg-[#5D070D] hover:text-white`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const OrdersPage = () => {
  const { orders, loading: ordersLoading, error: ordersError } = useFetchOrders();
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();

  const [selectedOrder, setSelectedOrder] = useState<EnhancedOrder | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 8;

  const enhancedOrders: EnhancedOrder[] = orders.map((order) => {
    const buyer = users.find((u) => u.id === order.buyer);
    const artisan = users.find((u) => u.id === order.artisan);

    return {
      ...order,
      buyerName: buyer ? `${buyer.first_name} ${buyer.last_name}` : 'Unknown',
      sellerName: artisan ? `${artisan.first_name} ${artisan.last_name}` : 'Unknown',
    };
  });

  const statusFilteredOrders =
    selectedStatus === 'All Status'
      ? enhancedOrders
      : enhancedOrders.filter((order) => order.status.toLowerCase() === selectedStatus.toLowerCase());

  const exactMatchOrders =
    searchQuery && !isNaN(Number(searchQuery))
      ? statusFilteredOrders.filter((order) => order.id.toString() === searchQuery.trim())
      : [];

  const partialMatchOrders =
    searchQuery && isNaN(Number(searchQuery))
      ? statusFilteredOrders.filter(
          (order) =>
            order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.order_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.status.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  let filteredOrders: EnhancedOrder[] = [];
  if (searchQuery) {
    filteredOrders = !isNaN(Number(searchQuery)) ? exactMatchOrders : partialMatchOrders;
  } else {
    filteredOrders = statusFilteredOrders;
  }

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleView = (order: EnhancedOrder) => setSelectedOrder(order);
  const handleClose = () => setSelectedOrder(null);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
    else if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <div className="flex h-screen bg-[#F5E8D8]" style={{ color: '#5D070D' }}>
        <main className="flex-1 flex flex-col p-6 overflow-y-auto">
          {ordersLoading || usersLoading ? (
            <div className="flex-grow flex items-center justify-center text-[#5D070D] text-lg font-semibold">
              Loading...
            </div>
          ) : ordersError || usersError ? (
            <div className="flex-grow flex items-center justify-center text-red-600 text-lg font-semibold">
              Error: {ordersError || usersError}
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">Order Management</h1>
              <div className="flex flex-wrap mb-5 gap-5">
                <div className="relative flex-grow min-w-[250px] max-w-md">
                  <input
                    type="text"
                    placeholder="Search by order, buyer, seller, type, status"
                    className="w-full border border-[#5D070D] rounded-xl pl-15 pr-5 py-2 text-[#5D070D] focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value.trim());
                      setCurrentPage(1);
                    }}
                    autoComplete="off"
                    style={{ WebkitBoxShadow: '0 0 0 1000px white inset', boxShadow: '0 0 0 1000px white inset' }}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D070D] pointer-events-none" />
                </div>

                <MaroonDropdown
                  options={['All Status', 'Completed', 'Pending', 'Accepted']}
                  value={selectedStatus}
                  onChange={(val) => {
                    setSelectedStatus(val);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <OrderTable
                orders={paginatedOrders}
                totalOrders={filteredOrders.length}
                onView={handleView}
                noResults={paginatedOrders.length === 0}
              />

              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  className={`px-5 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'}`}
                  onClick={() => handlePageChange('prev')}
                  disabled={currentPage === 1}
                  title={currentPage === 1 ? 'No previous page' : undefined}
                >
                  Previous
                </button>
                <span className="text-[#5D070D] font-semibold text-sm">
                  Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
                </span>
                <button
                  className={`px-5 py-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'bg-[#5D070D] cursor-not-allowed text-white' : 'bg-[#5D070D] hover:bg-[#7a0a1a] cursor-pointer text-white'}`}
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === totalPages || totalPages === 0}
                  title={currentPage === totalPages || totalPages === 0 ? 'No next page' : undefined}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {selectedOrder && <OrderModal order={selectedOrder} onClose={handleClose} />}
        </main>
      </div>
    </Layout>
  );
};

export default OrdersPage;
