import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import UserInfo from "./UserInfo";
import LogoutBtn from "./LogoutBtn";

function UserPanel({ user }) {
  const [isExpandOpen, setIsExpandOpen] = useState(false);
  const expandRef = useOutsideClick(() => {
    setIsExpandOpen(false);
  });

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

        {/* Today's Question */}
        <div className="py-2 px-4">
          <Link
            to="/dailyQuestion"
            className="text-gray-900 hover:text-indigo-400 text-lg font-medium transition"
          >
            Today&apos;s Question
          </Link>
        </div>

        {/* ThinkPass */}
        <div className="py-2 px-4">
          <Link
            to="/thinkPass"
            className="text-gray-900 hover:text-indigo-400 text-lg font-medium transition"
          >
            ThinkPass
          </Link>
        </div>

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
            className={`${
              isExpandOpen ? "block" : "hidden"
            } absolute left-0 w-48 mt-2 bg-gray-100 text-gray-900 shadow-lg rounded-xl z-10`}
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

        {/* User Info and Logout */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UserInfo user={user} />
          </div>
          <LogoutBtn />
        </div>
      </div>
    </nav>
  );
}

export default UserPanel;
