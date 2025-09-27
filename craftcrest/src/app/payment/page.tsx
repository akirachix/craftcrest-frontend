"use client";
import { useState, useEffect, useRef } from "react";
import { CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import type { Payment } from "@/app/utils/type";
import { useFetchPayments } from "@/app/hooks/useFetchPayments";

import PaymentModal from "./components/PaymentModal";
import Button from "@/app/shared-components/Button";

import Layout from "../shared-components/Layout";

const paymentStatus: { [key: string]: string } = {
  held: "bg-yellow-200  text-red-800 border-yellow-300",
  refunded: "bg-red-100 text-red-600 border-red-400",
  released: "bg-green-100 text-green-700 border-green-400",
};

const statusClass = (status: string) => {
  return paymentStatus[status];
};

const formatDate = (dateValue: string) => {
  if (!dateValue) return "-";
  const timestamp = Number(dateValue);
  const date = !isNaN(timestamp) ? new Date(timestamp) : new Date(dateValue);
  return date.toLocaleDateString();
};

export default function PaymentTable() {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const { payments, loading, error } = useFetchPayments();
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const itemsPerPage = 7;
  const PAYMENT_ID_PREFIX = "PAY00";
  const CURRENCY_PREFIX = "Ksh ";

  const filtered = Array.isArray(payments)
    ? payments.filter((payment) => {
      const matchesId = payment.id.toString().includes(search);
      const matchesStatus = statusFilter
        ? payment.status === statusFilter
        : true;
      if (!monthFilter) return matchesId && matchesStatus;
      const date = new Date(payment.paid_at);
      const [year, month] = monthFilter.split("-").map(Number);
      return (
        matchesId &&
        matchesStatus &&
        date.getFullYear() === year &&
        date.getMonth() + 1 === month
      );
    })
    : [];

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);
  const currentPage = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusOpen(false);
      }
    }
    if (isStatusOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStatusOpen]);
  if (loading) return <div className="p-8">Loading payments...</div>;
  if (error)
    return <div className="p-8 text-red-600">Error: {error}</div>;
  const displayStatus = (status: string) => {
    if (status === "held") return "Escrow";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "held", label: "Escrow" },
    { value: "refunded", label: "Refunded" },
    { value: "released", label: "Released" },
  ];
  return (
    <Layout>
    <div className="bg-[#F5E8D8] h-screen flex">
      
      <div className="w-full max-w-9xl p-8">
        <h1 className="text-3xl font-bold text-[#5D070D] mb-2">
          Payment Management
        </h1>
        <p className="text-gray-800 mb-4">
          Manage and review marketplace payments
        </p>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Payment ID"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-[#5D070D] rounded text-[#5D070D] focus:ring-1 focus:ring-[#5D070D]"
          />
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-[#5D070D] rounded text-[#5D070D] focus:ring-1 focus:ring-[#5D070D]"
          />

          <div className="relative inline-block w-48" ref={statusDropdownRef}>
            <button
              type="button"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="w-full pl-4 pr-10 py-2 border border-[#5D070D] rounded text-[#5D070D] text-left focus:ring-1 focus:ring-[#5D070D]"
            >
              {statusOptions.find((o) => o.value === statusFilter)?.label ||
                "All Statuses"}
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[#5D070D]">
                {isStatusOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {isStatusOpen && (
              <ul className="absolute z-10 mt-1 w-full border border-[#5D070D] rounded bg-white shadow-md">
                {statusOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      setStatusFilter(option.value);
                      setPage(1);
                      setIsStatusOpen(false);
                    }}
                    className="px-4 py-2 text-[#5D070D] hover:bg-red-900 hover:text-white cursor-pointer"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b border-[#5D070D] flex items-center gap-4">
            <CreditCard className="text-[#5D070D]" size={32} />
            <h2 className="font-semibold text-gray-900">
              All Payments ({filtered.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5E8D8] border-2 border-[#5D070D]">
                <tr>
                  {[
                    "Payment ID","Amount","Date","Order","Status", "Details",
                  ].map((header) => (
                    <th
                      key={header}
                      className="text-left p-3 font-bold text-[#5D070D]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-4 text-[#5D070D] text-lg font-medium text-center"
                    >
                      Payment not found
                    </td>
                  </tr>
                ) : (
                  currentPage.map((payment, index) => (
                    <tr
                      key={payment.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-yellow-100"
                        } hover:bg-gray-50 text-[#5D070D] text-[15px]`}
                    >
                      <td className="p-3 font-bold">
                        {PAYMENT_ID_PREFIX} {payment.id}
                      </td>
                      <td className="p-3">{CURRENCY_PREFIX} {payment.amount}</td>
                      <td className="p-3">{formatDate(payment.paid_at)}</td>
                      <td className="p-3">Order {payment.order}</td>
                      <td className="p-3 text-[15px] font-bold">
                        <span
                          className={`inline-block px-2 py-1 rounded ${statusClass(
                            payment.status
                          )}`}
                        >
                          {displayStatus(payment.status)}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button
                          buttonText="View"
                          variant="primary"
                          onClickHandler={() => {
                            setSelectedPayment(payment);
                            setIsModalOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="fixed bottom-2 left-0 right-0 shadow-md z-10 flex justify-center items-center gap-2 sm:gap-4 p-4">
            <button
              className="px-3 py-1 sm:px-5 sm:py-2 rounded bg-[#F4E5D6] border border-[#5D070D] text-[#5D070D] font-semibold disabled:opacity-40 text-sm sm:text-base"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-[#5D070D] font-semibold text-sm sm:text-base">
              Page {page} Of {totalPages}
            </span>
            <button
              className="px-3 py-1 sm:px-5 sm:py-2 rounded bg-[#5D070D] text-white font-semibold disabled:opacity-40 text-sm sm:text-base"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        {isModalOpen && selectedPayment && (
          <PaymentModal
            payment={selectedPayment}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
    </Layout>
  );
}