import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";

function IndexButtons({
  user,
}: {
  user: {
    id: string;
    email: string;
    username: string;
    points: number;
    coins: number;
  };
}) {
  const [isLoading, setIsLoading] = useState<
    "home" | "login" | "signup" | null
  >(null);
  const navigate = useNavigate();

  function handleButtonClick(route: string, type: "home" | "login" | "signup") {
    setIsLoading(type);
    navigate(route);
  }

  return (
    <div className="flex gap-6 mt-6">
      {user ? (
        <button
          onClick={() => handleButtonClick("/home", "home")}
          disabled={isLoading === "home"}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full shadow-lg text-lg transition flex items-center gap-2 ${
            isLoading === "home" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading === "home" ? (
            <ArrowPathIcon className="w-5 h-5 animate-spin" />
          ) : (
            "Go Home"
          )}
        </button>
      ) : (
        <button
          onClick={() => handleButtonClick("/login", "login")}
          disabled={isLoading === "login"}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full shadow-lg text-lg transition flex items-center gap-2 ${
            isLoading === "login" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading === "login" ? (
            <ArrowPathIcon className="w-5 h-5 animate-spin" />
          ) : (
            "Log In"
          )}
        </button>
      )}
      {!user && (
        <button
          onClick={() => handleButtonClick("/signup", "signup")}
          disabled={isLoading === "signup"}
          className={`bg-white border border-indigo-500 hover:bg-indigo-50 text-indigo-500 px-8 py-4 rounded-full shadow-lg text-lg transition flex items-center gap-2 ${
            isLoading === "signup" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading === "signup" ? (
            <ArrowPathIcon className="w-5 h-5 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </button>
      )}
    </div>
  );
}

export default IndexButtons;
