import React, { useState, useEffect } from "react";
import { useSellers } from "@/app/hooks/useFetchSellers";
import useFetchOrders from "@/app/hooks/useFetchOrders"
import useFetchRatings from "@/app/hooks/useFetchRatings"
import StarRating from "../StarRating";

export default function SellerTable({ search }: { search: string }) {
  const { sellers } = useSellers();
  const { orders } = useFetchOrders();
  const { ratings } = useFetchRatings();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    function updatePageSize() {
      setPageSize(window.innerWidth <= 1366 ? 8 : 10);
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const filtered = sellers.filter(seller =>
    seller.first_name.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = filtered.length ? Math.ceil(filtered.length / pageSize) : 1;
  const sellersToShow = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-[#F4E5D6] text-[#5D070D]" style={{ border: "2px solid #5D070D" }}>
            <th className="py-3 px-4 text-left font-semibold">Seller Name</th>
            <th className="py-3 px-4 text-left font-semibold">Completed orders</th>
            <th className="py-3 px-4 text-left font-semibold">Rejected</th>
            <th className="py-3 px-4 text-left font-semibold">Ratings</th>
          </tr>
        </thead>
        <tbody>
          {sellersToShow.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-[#5D070D] py-6 text-lg font-semibold">
                Result Not Found
              </td>
            </tr>
          ) : (
            sellersToShow.map((seller, i) => {
              const completed = orders.filter(
                o => o.artisan === seller.id && o.status === "completed"
              ).length;
              const rejected = orders.filter(
                o => o.artisan === seller.id && o.status === "rejected"
              ).length;
              const sellerRatings = ratings
                .filter(r =>
                  orders.find(o => o.id === r.order && o.artisan === seller.id)
                )
                .map(r => r.rating)
                .filter((rating): rating is number => rating !== null && rating !== undefined);

              const avgRating = sellerRatings.length
                ? ((sellerRatings.reduce((a, b) => a + b, 0) / sellerRatings.length + 0.5) | 0)
                : 0;

              return (
                <tr key={i}>
                  <td className="py-2 px-4 text-black">
                    {seller.first_name + " " + seller.last_name}
                  </td>
                  <td className="py-2 px-4 text-black">{completed}</td>
                  <td className="py-2 px-4 text-black">{rejected}</td>
                  <td className="py-2 px-4 text-black">
                    <StarRating rating={avgRating} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-4 mt-4 fixed bottom-3 right-[50%]">
        <button
          className="px-5 py-2 rounded bg-[#F4E5D6] border border-[#5D070D] text-[#5D070D] font-semibold disabled:opacity-40"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-[#5D070D] font-semibold">
          Page {page} Of {pageCount}
        </span>
        <button
          className="px-5 py-2 rounded bg-[#5D070D] text-white font-semibold disabled:opacity-40"
          onClick={() => setPage(page + 1)}
          disabled={page === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}