"use client";

import React, { useState, useEffect } from "react";
import {Users } from "lucide-react";
import { useSellers } from "@/app/hooks/useFetchSellers";
import useFetchOrders from "@/app/hooks/useFetchOrders";
import useFetchRatings from "@/app/hooks/useFetchRatings";
import StarRating from "../StarRating";

export default function SellerTable({ search }: { search: string }) {
  const { sellers, loading: sellersLoading } = useSellers();
  const { orders, loading: ordersLoading } = useFetchOrders();
  const { ratings, loading: ratingsLoading } = useFetchRatings();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    function updatePageSize() {
      setPageSize(window.innerWidth <= 1366 ? 7 : 8);
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const loading = sellersLoading || ordersLoading || ratingsLoading;
  const filtered = sellers.filter((seller) =>
    seller.first_name.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = filtered.length ? Math.ceil(filtered.length / pageSize) : 1;
  const sellersToShow = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, sellers.length]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-[#5D070D]">
      {loading ? (
        <div className="flex justify-center items-center py-20 text-[#5D070D] font-semibold">
          Loading...
        </div>
      ) : (
        <>
          <div className="p-4 bg-white border-b border-[#5D070D] flex items-center gap-4">
            <Users className="text-[#5D070D]" size={28} />
            <h2 className="font-semibold text-[#5D070D] text-[18px]">
              Sellers ({filtered.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-[#5D070D] text-white font-semibold text-[17px]">
                <tr>
                  <th className="pl-10 py-3">Seller Name</th>
                  <th className="pl-10 py-3 text-left">Completed Orders</th>
                  <th className="pl-10 py-3 text-left">Rejected</th>
                  <th className="pl-10 py-3">Ratings</th>
                </tr>
              </thead>
              <tbody>
                {sellersToShow.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-lg text-[#5D070D] font-semibold">
                      Result Not Found
                    </td>
                  </tr>
                ) : (
                  sellersToShow.map((seller, i) => {
                    const completed = orders.filter(
                      (o) => o.artisan === seller.id && o.status === "completed"
                    ).length;
                    const rejected = orders.filter(
                      (o) => o.artisan === seller.id && o.status === "rejected"
                    ).length;
                    const sellerRatings = ratings
                      .filter(
                        (r) =>
                          orders.find((o) => o.id === r.order && o.artisan === seller.id)
                      )
                      .map((r) => r.rating)
                      .filter((rating): rating is number => rating !== null && rating !== undefined);

                    const avgRating = sellerRatings.length
                      ? ((sellerRatings.reduce((a, b) => a + b, 0) / sellerRatings.length + 0.5) | 0)
                      : 0;

                    return (
                      <tr
                        key={seller.id || i}
                        className={`${
                          i % 2 === 0 ? "bg-white" : "bg-[#FAF2E8]"
                        } hover:bg-[#F5E8D8] text-[#5D070D] text-[15px] transition-colors duration-200`}
                      >
                        <td className="py-4 pl-10 font-semibold">
                          {seller.first_name} {seller.last_name}
                        </td>
                        <td className="py-4 pl-10">{completed}</td>
                        <td className="py-4 pl-10">{rejected}</td>
                        <td className="py-4 pl-10">
                          <StarRating rating={avgRating} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center gap-4 p-4 border-t border-[#5D070D] rounded-b-lg">
            <button
              className={`px-5 py-2 rounded text-sm font-semibold ${
                page === 1 || loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#5D070D] text-white"
              }`}
              onClick={() => setPage(page - 1)}
              disabled={page === 1 || loading}
            >
              Previous
            </button>
            <span className="text-[#5D070D] font-semibold text-sm">
              Page {page} Of {pageCount}
            </span>
            <button
              className={`px-5 py-2 rounded text-sm font-semibold ${
                page === pageCount || loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#5D070D] text-white"
              }`}
              onClick={() => setPage(page + 1)}
              disabled={page === pageCount || loading}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
