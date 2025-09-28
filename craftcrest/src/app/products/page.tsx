"use client";

import { useState, useEffect } from "react";
import { Package, Search, X } from "lucide-react";
import { Product } from "../utils/type";
import useGetProducts from "../hooks/useFetchProducts";
import Image from "next/image";
import Layout from "../shared-components/Layout";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "pottery", label: "Pottery" },
  { value: "tailoring", label: "Tailoring" },
  { value: "basketry", label: "Basketry" },
  { value: "weaving", label: "Weaving" },
  { value: "crocheting", label: "Crocheting" },
  { value: "ceramics", label: "Ceramics" },
  { value: "jewelry", label: "Jewelry" },
];

export default function ProductManagement() {
  const { products, loading, error } = useGetProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <Layout>
      <div className="flex h-[100vh] bg-[#F5E8D8]">
        <main
          className="flex-1 overflow-y-auto p-8 max-w-full"
          style={{ minWidth: 0 }}
        >
          {loading ? (
            <div className="p-8 text-center text-[#5D070D] font-semibold text-lg">
              Loading products...
            </div>
          ) : error ? (
            <div className="p-8 text-red-600 text-center font-semibold text-lg">
              Error: {error}
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-[#5D070D] mb-2">
                Product Management
              </h1>
              <p className="text-gray-800 mb-6">
                Manage and review marketplace products
              </p>

              <div className="flex flex-wrap gap-5 mb-8">
                <div className="relative flex-1 min-w-[250px] max-w-md">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5D070D]"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by product name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-[#5D070D] border border-[#5D070D] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 text-[#5D070D] border border-[#5D070D] rounded-[12px] focus:outline-none focus:ring-[#5D070D]/30 bg-white min-w-[180px]"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-[#5D070D]">
                <div className="p-4 bg-white border-b border-[#5D070D] flex items-center gap-4">
                  <Package className="text-[#5D070D]" size={32} />
                  <h2 className="font-semibold text-gray-900">
                    All Products ({filteredProducts.length})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left">
                    <thead className="bg-[#5D070D] text-white text-[18px] font-semibold rounded-tl-lg rounded-tr-lg">
                      <tr>
                        <th className="p-4 pl-10 text-left">No</th>
                        <th className="p-4 text-left">Product</th>
                        <th className="p-4 text-left">Category</th>
                        <th className="p-4 text-left">Price(Ksh)</th>
                        <th className="p-4 text-center">Stock</th>
                        <th className="p-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
                          <tr
                            key={product.id}
                            className={`${
                              index % 2 === 0 ? "bg-white" : "bg-[#FAF2E8]"
                            } hover:bg-[#F5E8D8] transition-colors duration-200 text-[#5D070D] text-[15px]`}
                          >
                            <td className="p-4 pl-10 font-semibold">
                              {startIndex + index + 1}
                            </td>
                            <td className="p-4 max-w-xs xl:p-3">
                              <div className="font-bold text-[#5D070D] text-[18px]">
                                {product.product_name.charAt(0).toUpperCase() +
                                  product.product_name.slice(1)}
                              </div>
                              <div className="text-sm line-clamp-2">
                                {product.description.charAt(0).toUpperCase() +
                                  product.description.slice(1)}
                              </div>
                            </td>
                            <td className="p-4">
                              {product.category.charAt(0).toUpperCase() +
                                product.category.slice(1)}
                            </td>
                            <td className="p-4">{product.price}</td>
                            <td className="p-4 text-center">
                              {product.stock_quantity}
                            </td>
                            <td className="p-4 text-[#5D070D]">
                              <button
                                onClick={() => handleViewDetails(product)}
                                className="px-4 py-1.5 bg-[#5D070D] text-white text-sm font-medium rounded-md cursor-pointer"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="text-center py-8 text-[#5D070D]"
                          >
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center items-center gap-4 p-4 border-t border-[#5D070D] rounded-b-lg">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-5 py-2 rounded text-sm font-semibold ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#5D070D] text-white"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-[#5D070D] font-semibold text-sm">
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-5 py-2 rounded text-sm font-semibold ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#5D070D] text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>

              {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                  <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto mx-4 text-black relative">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-[#5D070D]">
                        Product Details
                      </h2>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-1 text-gray-600 hover:text-gray-800 cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Image
                        src={selectedProduct.image || "ceramic1.jpg"}
                        alt={selectedProduct.product_name}
                        className="max-h-full max-w-[700px] object-contain"
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="px-5 py-1 text-[#5D070D] text-[16px]">
                        <strong className="mr-1 text-gray-700">
                          Product Name:
                        </strong>
                        {selectedProduct.product_name.charAt(0).toUpperCase() +
                          selectedProduct.product_name.slice(1)}
                      </p>
                      <p className="px-5 py-1 text-[#5D070D] text-[16px]">
                        <strong className="mr-1 text-gray-700">Category:</strong>{" "}
                        {selectedProduct.category.charAt(0).toUpperCase() +
                          selectedProduct.category.slice(1)}
                      </p>
                      <p className="px-5 py-1 text-[#5D070D] text-[16px]">
                        <strong className="mr-1 text-gray-700">Price:</strong> Ksh{" "}
                        {selectedProduct.price}
                      </p>
                      <p className="px-5 py-1 text-[#5D070D] text-[16px]">
                        <strong className="mr-1 text-gray-700">Stock:</strong>{" "}
                        {selectedProduct.stock_quantity}
                      </p>
                      <p className="px-5 py-1 text-[#5D070D] text-[16px]">
                        <strong className="mr-1 text-gray-700">Customizable:</strong>{" "}
                        {selectedProduct.is_customizable ? "Yes" : "No"}
                      </p>
                      <p className="px-5 py-1 text-[#5D070D] text-[16px]">
                        <strong className="mr-1 text-gray-700">Description:</strong>{" "}
                        {selectedProduct.description.charAt(0).toUpperCase() +
                          selectedProduct.description.slice(1)}
                      </p>
                      {selectedProduct.is_customizable && (
                        <p className="px-5 py-1 text-[#5D070D] text-[16px]">
                          <strong className="mr-1 text-gray-700">Custom Options:</strong>{" "}
                          {selectedProduct.custom_options || "None"}
                        </p>
                      )}
                      <div className="flex justify-end pt-4 border-t">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md bg-gray-300 cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}
