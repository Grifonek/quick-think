import {
  AcademicCapIcon,
  ArrowRightIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";

interface userInfoProps {
  user: {
    id: string;
    email: string;
    points: number;
    coins: number;
    username: string;
  };
  className?: string;
}

function UserInfo({ user, className }: userInfoProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => {
    setIsDropdownOpen(false);
  });

  return (
    <div
      className={`${className} cursor-pointer rounded-full flex justify-center items-center space-x-10`}
    >
      <Link to="/myProfile">{user.username.toUpperCase()}</Link>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="hover:text-indigo-700 font-bold flex items-center space-x-2"
        >
          <span>{user.points} points</span>
          <span>|</span>
          <span>{user.coins}</span>
          <AcademicCapIcon className="size-5" />
        </button>

        {isDropdownOpen && (
          <div className="absolute w-max left-0 mt-2 p-6 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center space-y-2">
              <p>
                <strong>Points:</strong> {user.points.toFixed(1)}
              </p>
              <p>
                <strong>Thinkies:</strong> {user.coins}
              </p>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-lg items-center">
                <Link to="/withdraw" className="flex gap-x-3">
                  <AcademicCapIcon className="size-5" />
                  <ArrowRightIcon className="size-5" />
                  <BanknotesIcon className="size-5" />
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
