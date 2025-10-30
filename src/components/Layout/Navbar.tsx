import {  Bell, UserCircle } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between p-5 fixed top-0 left-0 w-full bg-blue-950 shadow-md z-50">
        <div className="flex gap-4 text-white">
          <UserCircle size={28} />
        </div>
        <div className="text-3xl text-white font-bold">ZEN<span className="text-green-500">TRA</span></div>

        <div className="text-white">
              <Bell size={28} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
