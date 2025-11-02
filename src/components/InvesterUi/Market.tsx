import React, { useState } from "react";
import { motion } from "framer-motion";
import {  Globe } from "lucide-react";
import { ClipLoader } from "react-spinners";

interface Asset {
  symbol: string;
  price: number;
  change: number;
  volume: string;
}

const stockData: Asset[] = [
  { symbol: "AAPL", price: 182.36, change: 0.85, volume: "58.2M" },
  { symbol: "NVDA", price: 124.75, change: 2.1, volume: "32.4M" },
  { symbol: "TSLA", price: 210.32, change: -1.2, volume: "45.3M" },
  { symbol: "MSFT", price: 330.21, change: 1.5, volume: "27.8M" },
  { symbol: "AMZN", price: 154.9, change: 0.5, volume: "61.2M" },
  { symbol: "AAPL", price: 182.36, change: 0.85, volume: "58.2M" },
  { symbol: "NVDA", price: 124.75, change: 2.1, volume: "32.4M" },
  { symbol: "TSLA", price: 210.32, change: -1.2, volume: "45.3M" },
  { symbol: "MSFT", price: 330.21, change: 1.5, volume: "27.8M" },
  { symbol: "AMZN", price: 154.9, change: 0.5, volume: "61.2M" },
  { symbol: "AAPL", price: 182.36, change: 0.85, volume: "58.2M" },
  { symbol: "NVDA", price: 124.75, change: 2.1, volume: "32.4M" },
  { symbol: "TSLA", price: 210.32, change: -1.2, volume: "45.3M" },
  { symbol: "MSFT", price: 330.21, change: 1.5, volume: "27.8M" },
  { symbol: "AMZN", price: 154.9, change: 0.5, volume: "61.2M" },
];

const cryptoData: Asset[] = [
  { symbol: "BTC", price: 65324, change: 2.1, volume: "$18.5B" },
  { symbol: "ETH", price: 3120, change: 1.4, volume: "$9.2B" },
  { symbol: "BNB", price: 420, change: 0.8, volume: "$1.1B" },
  { symbol: "SOL", price: 155, change: 3.6, volume: "$2.4B" },
  { symbol: "XRP", price: 0.62, change: -0.4, volume: "$1.9B" },
];

const ITEMS_PER_PAGE = 10;

const Market: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"stocks" | "crypto">("stocks");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const data = activeTab === "stocks" ? stockData : cryptoData;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen  text-black p-3">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold flex items-center">
            <Globe className="mr-2" /> Market Overview
          </h1>
          <div className="flex gap-3 text-white">
            <button
              onClick={() => {
                setActiveTab("stocks");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "stocks"
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              Stocks
            </button>
            <button
              onClick={() => {
                setActiveTab("crypto");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "crypto"
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              Crypto
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#36A2EB" size={50} />
          </div>
        ) : (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm border-gray-200  overflow-x-auto min-h-[420px]"
            variants={containerVariants}
          >
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2">Symbol / Volume</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-right py-3 px-2">Change (%)</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((asset, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-700 hover:bg-gray-700/40 transition-all"
                  >
                    <td className="py-3 px-2">
                      <div className="font-semibold">{asset.symbol}</div>
                      <div className="text-xs text-gray-400">
                        Vol: {asset.volume}
                      </div>
                    </td>
                    <td className="text-right py-3 px-2">
                      ${asset.price.toLocaleString()}
                    </td>
                    <td
                      className={`text-right py-3 px-2 ${
                        asset.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change}%
                    </td>
                  </tr>
                ))}
                {/* Fill empty rows to keep table height consistent */}
                {Array.from({
                  length: Math.max(0, ITEMS_PER_PAGE - currentData.length),
                }).map((_, i) => (
                  <tr key={`empty-${i}`} className="h-[52px]">
                    <td colSpan={3}></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap text-white pb-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Market;
