import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import AnnouncementSection from "./AnnouncementSection";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Redux state type
interface FundState {
  nav: number;
  ytdReturn: number;
  sharpeRatio: number;
  topStrategy: string;
  loading: boolean;
  currentInvestments: {
    type: string;
    name: string;
    amount: number;
    percentage: number;
  }[];
  navHistory: { date: string; value: number }[];
}

// Mock Redux action to fetch fund data
const fetchFundData = () => ({ type: "FETCH_FUND_DATA" });

// Mock initial state
const initialState: FundState = {
  nav: 25000000,
  ytdReturn: 9.2,
  sharpeRatio: 1.4,
  topStrategy: "Long/Short Equity",
  loading: false,
  currentInvestments: [
    { type: "Crypto", name: "Bitcoin", amount: 5000000, percentage: 20 },
    { type: "Stock", name: "Tesla", amount: 3000000, percentage: 12 },
    { type: "Forex", name: "EUR/USD", amount: 2000000, percentage: 8 },
    { type: "Real Assets", name: "Gold", amount: 4000000, percentage: 16 },
    { type: "Cash", name: "USD", amount: 5000000, percentage: 20 },
  ],
  navHistory: [
    { date: "Jan", value: 20000000 },
    { date: "Feb", value: 21000000 },
    { date: "Mar", value: 22000000 },
    { date: "Apr", value: 23000000 },
    { date: "May", value: 24000000 },
    { date: "Jun", value: 24500000 },
    { date: "Jul", value: 25000000 },
  ],
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const HomeUI: React.FC = () => {
  const dispatch = useDispatch();
  const {
    nav,
    ytdReturn,
    topStrategy,
    loading,
    currentInvestments,
    navHistory,
  } = useSelector((state: { fund: FundState }) => state.fund || initialState);

  useEffect(() => {
    dispatch(fetchFundData());
  }, [dispatch]);

  // Line chart for Total Asset NAV
  const lineData = {
    labels: navHistory.map((item) => item.date),
    datasets: [
      {
        label: "Total Asset NAV",
        data: navHistory.map((item) => item.value),
        fill: false,
        borderColor: "#36A2EB",
        backgroundColor: "#36A2EB",
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Total Asset NAV Over Time",
        color: "#fff",
        font: { size: 16 },
      },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      {/* Announcement */}
      <AnnouncementSection />

      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#36A2EB" size={50} />
          </div>
        ) : (
          <>
            {/* Fund Snapshot */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8"
              variants={itemVariants}
            >
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold flex items-center">
                  <TrendingUp className="mr-2" /> Total Asset Under Management
                  (AUM)
                </h2>
                <p className="text-2xl mt-2">
                  ${nav.toLocaleString()}{" "}
                  <span className="text-green-400 text-sm">+1.8% MoM</span>
                </p>
              </div>
              <div className=" grid grid-cols-2 gap-3">
             
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold">YTD Return</h2>
                  <p className="text-2xl mt-2">{ytdReturn}%</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold">Top Strategy</h2>
                  <p className="text-2xl mt-2">
                    {topStrategy}{" "}
                    <span className="text-green-400 text-sm">+12.5%</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Current Investments */}
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold mb-4">
                Current Investments
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-right py-2">Amount</th>
                      <th className="text-right py-2">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentInvestments.map((inv, idx) => (
                      <tr key={idx} className="border-b border-gray-700">
                        <td className="py-2">{inv.type}</td>
                        <td className="py-2">{inv.name}</td>
                        <td className="text-right py-2">
                          ${inv.amount.toLocaleString()}
                        </td>
                        <td className="text-right py-2">{inv.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Total Asset NAV Line Chart */}
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold mb-4">
                Total Asset NAV Over Time
              </h2>
              <div className="w-full md:w-3/4 mx-auto">
                <Line data={lineData} options={lineOptions} />
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default HomeUI;
