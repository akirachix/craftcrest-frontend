"use client";

import type { Payment } from "@/app/utils/type";
import { X } from "lucide-react";

function formatPaymentDate(dateString: string | Date): string {
  if (!dateString) return "Invalid Date";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
const ORDER_ID_PREFIX = "Order";
const PAYMENT_ID_PREFIX = "Payment";
const PAYMENT_ID_SUFFIX = "Details";
const AMOUNT_PREFIX = "Ksh";

const displayStatus = (status: string) => {
  if (status === "held") return "Escrow";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

type PaymentModalProps = {
  payment: Payment;
  onClose: () => void;
};

export default function PaymentModal({ payment, onClose }: PaymentModalProps) {
  return (
    <div className="fixed inset-0 bg-red-900/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[370px] p-6 relative text-red-900">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-900 rounded px-2 py-1"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-semibold mb-6">{PAYMENT_ID_PREFIX} {payment.id} {PAYMENT_ID_SUFFIX}</h2>

        <div className="text-lg grid grid-cols gap-y-3">
          <div>
          <span className="font-semibold">Artisan:</span>
          <span> {payment.artisan}</span>

          </div>
          <div>
          <span className="font-semibold">Order:</span>
          <span> {ORDER_ID_PREFIX} {payment.order}</span>
          </div>
        <div>
        <span className="font-semibold">Status:</span>

        <span className={`inline-block px-2 py-1 rounded ${(payment.status)}`}>{displayStatus(payment.status)} </span>      
          </div>

          <div>
            
          <span className="font-semibold">Paid:</span>
          <span> {formatPaymentDate(payment.paid_at)}</span>
          </div>
          <div>
          <span className="font-semibold">Amount:</span>
          <span> {AMOUNT_PREFIX} {payment.amount}</span>
          </div>
          <div>
            
          <span className="font-semibold">Transaction Code:</span>
          <span> {payment.transaction_code}</span>
          </div>
    

        </div>
      </div>
    </div>
  );
}
