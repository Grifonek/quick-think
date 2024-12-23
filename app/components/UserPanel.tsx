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
    <nav className="bg-white shadow-md px-4 py-2 rounded-lg">
      <div className="max-w-screen-xl mx-auto items-center justify-between flex">
        <Link to="/home" className="text-indigo-500 text-xl font-semibold">
          Quick Think
        </Link>

        <div className="py-2 px-4 text-gray-900 hover:text-blue-500">
          <Link to="/dailyQuestion">Today&apos;s question</Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsExpandOpen(!isExpandOpen)}
            className="py-2 px-4 text-gray-900 hover:text-blue-500 flex items-center"
          >
            <span>Leaderboards</span>
            <ChevronDownIcon
              className={`size-5 transition-transform ${
                isExpandOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`${
              isExpandOpen ? "block" : "hidden"
            } absolute left-0 w-full mt-2 bg-white shadow-lg rounded-xl`}
            ref={expandRef}
          >
            <div className="flex flex-col items-center cursor-pointer px-5 py-2">
              <Link
                to="/leaderboards/all-time"
                className="py-2 hover:underline"
              >
                <span>All time</span>
              </Link>
              <Link to="/leaderboards/weekly" className="py-2 hover:underline">
                <span>Weekly</span>
              </Link>
              <Link to="/leaderboards/monthly" className="py-2 hover:underline">
                <span>Monthly</span>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <UserInfo user={user} />
        </div>

        <LogoutBtn />
      </div>
    </nav>
  );
}

export default UserPanel;
