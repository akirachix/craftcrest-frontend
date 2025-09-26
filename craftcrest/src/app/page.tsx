import Link from "next/link";
import PaymentTable from "./payment/components/PaymentsTable";

export default function Home() {
    return (
      <div>
        <PaymentTable/>
      </div>
    );
  }