import {  Bell, UserCircle } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between p-5 fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="flex gap-4 text-gray-700">
          <UserCircle size={28} />
        </div>
        <div className="text-2xl text-blue-950 font-bold">Dashboard</div>

        <div>
              <Bell size={28} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
