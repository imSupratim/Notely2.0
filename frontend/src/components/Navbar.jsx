import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Upload,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  User,
} from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";
import Navlink from "./Navbar/Navlink";
import Logo from "./Navbar/Logo";
import LogoutBtn from "./Navbar/LogoutBtn";
import Greetings from "./Navbar/Greetings";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("name");

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      toast.success("Logged out");
      navigate("/login");

      setIsOpen(false);
    } catch (error) {}
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white/10 backdrop-filter border-white backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden flex justify-between py-2 md:flex items-center gap-6">
          {userId ? (
            <>
              <Logo closeMenu={closeMenu} />

              <div className="flex gap-7 items-center">
                <Navlink dest="/" title="Home" />
                <Navlink dest="/upload" title="Upload" />
                <Navlink dest="/roadmap" title="Roadmap" />
                <Navlink dest="/allroadmaps" title="Saved" />
              </div>

              <div className="flex gap-4 items-center">
                <Greetings name={userName.split(" ")[0]} />
                <LogoutBtn handleLogout={handleLogout} />
              </div>
            </>
          ) : (
            <>
              <div></div>
              <div className="flex gap-4 py-3">
                <Navlink dest="/login" title="Login" />
                <Navlink dest="/register" title="Register" />
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between py-1">
          <Logo closeMenu={closeMenu} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/20 backdrop-blur-md backdrop-filter border-t border-slate-200">
          <div className="px-4 py-4 space-y-3">
            {userId ? (
              <>
                <div className="px-4 py-2 bg-indigo-50/30 backdrop-blur-2xl rounded-lg border border-indigo-100">
                  <p className="text-sm text-slate-600">
                    Hi,{" "}
                    <span className="font-semibold text-indigo-600">
                      {userName}
                    </span>
                  </p>
                </div>

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  Home
                </Link>

                <Link
                  to="/upload"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  Upload
                </Link>

                <Link
                  to="/roadmap"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  Roadmap
                </Link>

                <Link
                  to="/allroadmaps"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                >
                  Saved
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/50 border backdrop-blur-2xl backdrop-filter border-red-600 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium"
                >
                  <UserPlus className="w-5 h-5" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
