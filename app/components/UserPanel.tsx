import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import UserInfo from "./UserInfo";
import LogoutBtn from "./LogoutBtn";

function UserPanel({ user }) {
  const [isExpandOpen, setIsExpandOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const expandRef = useOutsideClick(() => setIsExpandOpen(false));

  return (
    <nav className="bg-gradient-to-r from-gray-200 via-gray-100 to-white shadow-md px-6 py-4 rounded-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/home"
          className="text-indigo-400 text-2xl font-extrabold tracking-wide"
        >
          Quick Think
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="size-8" />
          ) : (
            <Bars3Icon className="size-8" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-20">
          <Link
            to="/dailyQuestion"
            className="text-gray-900 hover:text-indigo-400 text-lg font-medium transition"
          >
            Today&apos;s Question
          </Link>

          <Link
            to="/thinkPass"
            className="text-gray-900 hover:text-indigo-400 text-lg font-medium transition"
          >
            ThinkPass
          </Link>

          {/* Leaderboards Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExpandOpen(!isExpandOpen)}
              className="py-2 px-4 text-gray-900 hover:text-indigo-400 text-lg font-medium flex items-center transition"
            >
              <span>Leaderboards</span>
              <ChevronDownIcon
                className={`size-5 text-indigo-400 ml-2 transition-transform ${
                  isExpandOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute left-0 w-48 mt-2 bg-gray-100 text-gray-900 shadow-lg rounded-xl z-10 ${
                isExpandOpen ? "block" : "hidden"
              }`}
              ref={expandRef}
            >
              <div className="flex flex-col text-center py-2">
                <Link
                  to="/leaderboards/all-time"
                  className="py-2 hover:bg-gray-200 hover:text-indigo-400 rounded transition"
                >
                  All Time
                </Link>
                <Link
                  to="/leaderboards/monthly"
                  className="py-2 hover:bg-gray-200 hover:text-indigo-400 rounded transition"
                >
                  Monthly
                </Link>
                <Link
                  to="/leaderboards/weekly"
                  className="py-2 hover:bg-gray-200 hover:text-indigo-400 rounded transition"
                >
                  Weekly
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* User Info and Logout */}
        <div className="hidden lg:flex items-center space-x-4">
          <UserInfo user={user} />
          <LogoutBtn />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col mt-4 space-y-4 bg-gray-100 p-4 rounded-lg shadow-lg items-center">
          <Link
            to="/dailyQuestion"
            className="block text-gray-900 hover:text-indigo-400 text-lg font-medium transition"
          >
            Today&apos;s Question
          </Link>
          <Link
            to="/thinkPass"
            className="block text-gray-900 hover:text-indigo-400 text-lg font-medium transition"
          >
            ThinkPass
          </Link>

          {/* Leaderboards Dropdown (Mobile) */}
          <div className="relative flex flex-col items-center ml-4">
            <button
              onClick={() => setIsExpandOpen(!isExpandOpen)}
              className="w-full text-left py-2 text-gray-900 hover:text-indigo-400 text-lg font-medium flex items-center transition"
            >
              <span>Leaderboards</span>
              <ChevronDownIcon
                className={`size-5 text-indigo-400 ml-2 transition-transform ${
                  isExpandOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Items */}
            {isExpandOpen && (
              <div className="space-y-2">
                <Link
                  to="/leaderboards/all-time"
                  className="block py-2 hover:bg-gray-200 hover:text-indigo-400 rounded transition"
                >
                  All Time
                </Link>
                <Link
                  to="/leaderboards/monthly"
                  className="block py-2 hover:bg-gray-200 hover:text-indigo-400 rounded transition"
                >
                  Monthly
                </Link>
                <Link
                  to="/leaderboards/weekly"
                  className="block py-2 hover:bg-gray-200 hover:text-indigo-400 rounded transition"
                >
                  Weekly
                </Link>
              </div>
            )}
          </div>

          {/* User Info and Logout */}
          <div className="flex mt-4 max-lg: space-x-4">
            <UserInfo user={user} />
            <LogoutBtn />
          </div>
        </div>
      )}
    </nav>
  );
}

export default UserPanel;
