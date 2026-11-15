import { LogOut } from "lucide-react";
import React from "react";

const LogoutBtn = ({ handleLogout }) => {
  return (
    <button
      onClick={handleLogout}
      className="border border-red-500 backdrop-filter backdrop-blur-md flex items-center gap-2 bg-red-700/60 text-white px-4 py-2 rounded-3xl hover:bg-red-600/80 transition-colors font-medium cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
};

export default LogoutBtn;
