
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentTable from "./page";
import { Payment } from "../utils/type";

jest.mock("../hooks/useFetchPayments", () => ({
  useFetchPayments: jest.fn(),
}));

import { useFetchPayments } from "../hooks/useFetchPayments";

const mockPayments: Payment[] = [
  {
    id: 1,
    artisan: "Artisan A",
    amount: "1000",
    order: "ORD001",
    status: "Held",
    date: "2025-08-15",
    transaction_code: "TXN123",
    paid_at: new Date("2025-08-15").toISOString(),
  },
  {
    id: 2,
    artisan: "Artisan B",
    amount: "2000",
    order: "ORD002",
    status: "Refunded",
    date: "2025-09-10",
    transaction_code: "TXN456",
    paid_at: new Date("2025-09-10").toISOString(),
  },
  {
    id: 3,
    artisan: "Artisan C",
    amount: "3000",
    order: "ORD003",
    status: "Released",
    date: "2025-09-20",
    transaction_code: "TXN789",
    paid_at: new Date("2025-09-20").toISOString(),
  },
];

describe("PaymentTable", () => {
  beforeEach(() => {
    (useFetchPayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      error: null,
    });
  });

  it("renders header and payment rows", () => {
    render(<PaymentTable />);
    expect(screen.getByText("Payment Management")).toBeInTheDocument();
    expect(screen.getByText("All Payments (3)")).toBeInTheDocument();

    
    const paymentIdCell = screen.getByText("PAY00 1");
    expect(paymentIdCell).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useFetchPayments as jest.Mock).mockReturnValue({
      payments: [],
      loading: true,
      error: null,
    });
    render(<PaymentTable />);
    expect(screen.getByText(/loading payments/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    (useFetchPayments as jest.Mock).mockReturnValue({
      payments: [],
      loading: false,
      error: "Failed to load",
    });
    render(<PaymentTable />);
    expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
  });

  it("filters payments by payment ID search", () => {
    render(<PaymentTable />);
    fireEvent.change(screen.getByPlaceholderText("Search by Payment ID"), { target: { value: "2" } });

    expect(screen.queryByText("PAY00 1")).not.toBeInTheDocument();
    expect(screen.getByText("PAY00 2")).toBeInTheDocument();
  });

  

  it("opens and closes payment details modal", () => {
    render(<PaymentTable />);
    fireEvent.click(screen.getAllByRole("button", { name: /view/i })[0]);
    expect(screen.getByText(/Payment 1 Details/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(screen.queryByText(/Payment 1 Details/i)).not.toBeInTheDocument();
  });

  it("handles pagination correctly", () => {
    const manyPayments = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      artisan: `Artisan ${i + 1}`,
      amount: (1000 + i * 100).toString(),
      order: `ORD${i + 1}`,
      status: "Held" as const,
      date: "2025-09-01",
      transaction_code: `TXN${1000 + i}`,
      paid_at: new Date("2025-09-01").toISOString(),
    }));

    (useFetchPayments as jest.Mock).mockReturnValue({
      payments: manyPayments,
      loading: false,
      error: null,
    });

    render(<PaymentTable />);
    expect(screen.getByText("Page 1 Of 3")).toBeInTheDocument();

    expect(screen.getByText("PAY00 1")).toBeInTheDocument();
    expect(screen.getByText("PAY00 7")).toBeInTheDocument();
    expect(screen.queryByText("PAY00 8")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText("Page 2 Of 3")).toBeInTheDocument();

    expect(screen.getByText("PAY00 8")).toBeInTheDocument();
    expect(screen.queryByText("PAY00 1")).not.toBeInTheDocument();
  });
});
