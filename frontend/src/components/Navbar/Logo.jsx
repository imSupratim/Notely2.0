import { Brain } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({closeMenu}) => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
      onClick={closeMenu}
    >
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-1.5">
        <Brain className="w-5 h-5 text-white" />
      </div>
      Notely
    </Link>
  );
};

export default Logo;
