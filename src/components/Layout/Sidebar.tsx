import React, { useState } from "react";
import { Home, BarChart2, Briefcase, FileText } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Market", icon: <BarChart2 size={20} /> },
    { name: "Portfolio", icon: <Briefcase size={20} /> },
    { name: "Reports", icon: <FileText size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <div className="p-6 text-xl font-semibold">🏠 Home Dashboard</div>;
      case "Market":
        return <div className="p-6 text-xl font-semibold">📈 Market Overview</div>;
      case "Portfolio":
        return <div className="p-6 text-xl font-semibold">💼 Portfolio Details</div>;
      case "Reports":
        return <div className="p-6 text-xl font-semibold">📊 Reports & Analytics</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[90vh] bg-gray-900 text-white mt-16">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-24 lg:w-56 bg-gray-900 border-r border-gray-800 flex-col items-center py-6 shadow-lg">
        <nav className="flex flex-col gap-3 w-full">
          {menuItems.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col lg:flex-row items-center lg:justify-start lg:pl-6 gap-2 py-3 cursor-pointer transition-colors ${
                activeTab === item.name
                  ? "bg-gray-800 text-blue-400"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium lg:block hidden">{item.name}</span>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 text-gray-900 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Mobile Footer Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 flex justify-around py-3 shadow-inner z-50">
        {menuItems.map((item) => (
          <motion.div
            whileTap={{ scale: 0.9 }}
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center text-xs cursor-pointer transition-colors ${
              activeTab === item.name
                ? "text-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
