import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Lock,
  PlusCircle,
  ArrowDownCircle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
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
import "react-toastify/dist/ReactToastify.css";

// Register Chart.js elements
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
  investorNav: number;
  investorReturn: number;
  lockInStatus: string;
  portfolio: { strategy: string; percentage: number; value: number }[];
  transactions: { date: string; type: string; amount: string }[];
  navHistory: { date: string; nav: number }[];
  loading: boolean;
}

// Mock Redux action
const fetchPortfolioData = () => ({ type: "FETCH_PORTFOLIO_DATA" });

// Mock initial state
const initialState: FundState = {
  investorNav: 250000,
  investorReturn: 9.2,
  lockInStatus: "Jan 2026",
  portfolio: [
    { strategy: "Long/Short Equity", percentage: 40, value: 10000000 },
    { strategy: "Crypto Arbitrage", percentage: 20, value: 5000000 },
    { strategy: "Forex", percentage: 15, value: 3750000 },
    { strategy: "Real Assets", percentage: 15, value: 3750000 },
    { strategy: "Cash", percentage: 10, value: 2500000 },
  ],
  transactions: [
    { date: "Oct 20, 2025", type: "withdraw", amount: "$5,000" },
    { date: "Oct 15, 2025", type: "added", amount: "$10,000" },
  ],
  navHistory: [
    { date: "Jan", nav: 200000 },
    { date: "Feb", nav: 210000 },
    { date: "Mar", nav: 220000 },
    { date: "Apr", nav: 230000 },
    { date: "May", nav: 240000 },
    { date: "Jun", nav: 245000 },
    { date: "Jul", nav: 250000 },
  ],
  loading: false,
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

const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const {
    investorNav,
    investorReturn,
    lockInStatus,
    portfolio,
    transactions,
    navHistory,
    loading,
  } = useSelector((state: { fund: FundState }) => state.fund || initialState);

  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  // Line chart data
  const lineData = {
    labels: navHistory.map((item) => item.date),
    datasets: [
      {
        label: "Investor NAV",
        data: navHistory.map((item) => item.nav),
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
        text: "NAV History",
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.h1
          className="text-3xl font-bold mb-6 flex items-center"
          variants={itemVariants}
        >
          <TrendingUp className="mr-2" /> Portfolio
        </motion.h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#36A2EB" size={50} />
          </div>
        ) : (
          <>
            {/* Portfolio Snapshot */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8"
              variants={itemVariants}
            >
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-sm md:text-lg md:font-semibold flex items-center">
                   Total balance
                </h2>
                <p className="text-xl md:text-2xl mt-2">${investorNav.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-sm md:text-lg md:font-semibold flex items-center">
                  <Lock className="mr-2" /> Lock Status
                </h2>
                <p className="text-xl md:text-2xl mt-2">{lockInStatus.toLocaleString()}</p>
              </div>
            </motion.div>

            {/* Add Fund / Withdraw Buttons */}
            <motion.div className="flex gap-4 mb-8 " variants={itemVariants}>
              <div className="flex flex-col items-center gap-2">
                <button className="flex flex-col items-center gap-2 bg-gray-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                  <PlusCircle />
                </button>
                <p>Add Fund</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button className="flex flex-col items-center gap-2 bg-gray-600 hover:bg-red-700 px-4 py-2 rounded-lg">
                  <ArrowDownCircle />
                </button>
                <p> Withdraw</p>
              </div>
            </motion.div>

            {/* Portfolio Line Chart */}
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold mb-4">
                Portfolio NAV History
              </h2>
              <div className="w-full md:w-3/4 mx-auto">
                <Line data={lineData} options={lineOptions} />
              </div>
            </motion.div>

            {/* Fund Allocation Table */}
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold mb-4">Fund Allocation</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Strategy</th>
                    <th className="text-right py-2">Percentage</th>
                    <th className="text-right py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2">{item.strategy}</td>
                      <td className="text-right py-2">{item.percentage}%</td>
                      <td className="text-right py-2">
                        ${item.value.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Transactions */}
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-lg font-semibold mb-4">
                Recent Transactions
              </h2>
              <ul className="text-sm space-y-2">
                {transactions.map((tx, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-gray-700 py-2"
                  >
                    <span>{tx.date}</span>
                    <span>{tx.type}</span>
                    <span>{tx.amount}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Portfolio;
