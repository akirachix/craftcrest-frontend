"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import Metrics from "./components/Metrics";
import SellerTable from "./components/SellerTable";
import Layout from "../shared-components/Layout";

export default function SellersManagement() {
  const [search, setSearch] = useState("");

  return ( <Layout>
    <div className="flex min-h-screen bg-[#F4E5D6] font-sans">
      <main
        className="flex-1 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-8">
        <h1 className="text-3xl font-bold text-[#5D070D]">Seller Management</h1>
        <p className="text-sm text-[#5D070D] mb-2">
          Manage artisan sellers and their performance on the CraftCrest platform
        </p>
        <Metrics />
        <div className="flex gap-4 mb-4 mt-3 items-center">
          <div
            className="
              flex items-center border border-[#5D070D] rounded-lg bg-white
              px-2 py-2 w-52          /* Default: mobile */
              md:px-3 md:w-64         /* ≥768px */
              lg:w-72                 /* ≥1024px */
              xl:w-72                 /* ≥1280px */
            "
          >
            <span className="text-[#5D070D] mr-2 text-lg">
              <FiSearch />
            </span>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={element => setSearch(element.target.value)}
              className="bg-white outline-none text-base text-[#5D070D] w-full"
            />
          </div>
        </div>
        <SellerTable search={search} />
      </main>
    </div>
    </Layout>
  );
}