import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentTable from "./components/PaymentsTable";
import { useFetchPayments } from "@/app/hooks/useFetchPayments";

jest.mock("@/app/hooks/useFetchPayments");
jest.mock("@/app/shared-components/Sidebar", () => () => <div data-testid="sidebar" />);
jest.mock("@/app/shared-components/Button", () => ({ buttonText, onClickHandler }: any) => (
    <button onClick={onClickHandler}>{buttonText}</button>
));
jest.mock("lucide-react", () => ({
    CreditCard: ({ size }: any) => <svg data-testid="credit-card" width={size} />,
    ChevronDown: ({ size }: any) => <svg data-testid="chevron-down" width={size} />,
    ChevronUp: ({ size }: any) => <svg data-testid="chevron-up" width={size} />,
    X: ({ size }: any) => <svg data-testid="icon-x" width={size} />,
}));

const mockPayments = [
    {
        id: 1,  
        amount: "1000",
        paid_at: String(new Date(2025, 8, 15).getTime()), 
        order: "A123",
        status: "held",
        artisan: "Jane Doe",
        transaction_code: "TXCODE1",
        date: "7-8-2025",
    },
    {
        id: 2,
        amount: "500",
        paid_at: String(new Date(2025, 8, 5).getTime()),
        order: "B456",
        status: "released",
        artisan: "John Smith",
        transaction_code: "TXCODE2",
        date: "7-8-2025",
    },
    {
        id: 3,
        amount: "750",
        paid_at: String(new Date(2025, 7, 28).getTime()), 
        order: "C789",
        status: "refunded",
        artisan: "Alice Bob",
        transaction_code: "TXCODE3",
        date: "7-8-2025",
    },
];

describe("PaymentTable", () => {
    beforeEach(() => {
        (useFetchPayments as jest.Mock).mockReturnValue({
            paymentList: mockPayments,
            isLoadingPayments: false,
            paymentsError: null,
        });
    });

    it("renders payments table and all payment rows", () => {
        render(<PaymentTable />);
        expect(screen.getByText("Payment Management")).toBeInTheDocument();
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
        expect(screen.getByText("All Payments (3)")).toBeInTheDocument();
        expect(screen.getByText("PAY00 1")).toBeInTheDocument();
        expect(screen.getByText("PAY00 2")).toBeInTheDocument();
        expect(screen.getByText("PAY00 3")).toBeInTheDocument();
    });

    it("filters payments by status", async () => {
        render(<PaymentTable />);
        fireEvent.click(screen.getByRole("button", { name: /All Statuses/i }));
        const escrowOptions = screen.getAllByText("Escrow");
        fireEvent.click(escrowOptions.find(el => el.tagName.toLowerCase() === 'li')!);
        expect(screen.getByText("All Payments (1)")).toBeInTheDocument();
        expect(screen.getByText("PAY00 1")).toBeInTheDocument();
        expect(screen.queryByText("PAY00 2")).not.toBeInTheDocument();
        expect(screen.queryByText("PAY00 3")).not.toBeInTheDocument();
    });

    it("filters payments by payment ID", () => {
        render(<PaymentTable />);
        fireEvent.change(screen.getByPlaceholderText("Search by Payment ID"), {
            target: { value: "2" },
        });
        expect(screen.getByText("All Payments (1)")).toBeInTheDocument();
        expect(screen.getByText("PAY00 2")).toBeInTheDocument();
        expect(screen.queryByText("PAY00 1")).not.toBeInTheDocument();
    });
    it("shows 'Payment not found' when no matches", () => {
        render(<PaymentTable />);
        fireEvent.change(screen.getByPlaceholderText("Search by Payment ID"), {
            target: { value: "999" },
        });
        expect(screen.getByText("Payment not found")).toBeInTheDocument();
    });

    it("shows loading and error states", () => {
        (useFetchPayments as jest.Mock).mockReturnValue({
            paymentList: [],
            isLoadingPayments: true,
            paymentsError: null,
        });
        render(<PaymentTable />);
        expect(screen.getByText("Loading payments...")).toBeInTheDocument();

        (useFetchPayments as jest.Mock).mockReturnValue({
            paymentList: [],
            isLoadingPayments: false,
            paymentsError: { message: "Failed to fetch" },
        });
        render(<PaymentTable />);
        expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
    });

    it("paginates payments", () => {
        const bigList = Array.from({ length: 15 }, (_, i) => ({
            ...mockPayments[0],
            id: i + 10, 
        }));
        (useFetchPayments as jest.Mock).mockReturnValue({
            paymentList: bigList,
            isLoadingPayments: false,
            paymentsError: null,
        });
        render(<PaymentTable />);
        expect(screen.getByText(/Page 1 Of 3/)).toBeInTheDocument();
        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByText(/Page 2 Of 3/)).toBeInTheDocument();
        fireEvent.click(screen.getByText("Previous"));
        expect(screen.getByText(/Page 1 Of 3/)).toBeInTheDocument();
    });
});

describe("PaymentModal", () => {
    const payment = {
        id: 1,
        amount: "1000",
        paid_at: "2025-09-15T00:00:00.000Z",
        order: "A123",
        status: "held",
        artisan: "Jane Doe",
        transaction_code: "TXCODE1",
        date: "2025-09-15", 
    };

});
