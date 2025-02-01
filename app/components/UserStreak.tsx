import { FireIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function UserStreak({
  streak,
  hasAlreadyAnswered,
}: {
  streak: number;
  hasAlreadyAnswered: boolean;
}) {
  const backgrounds = [
    "bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500",
    "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-cyan-400 via-teal-500 to-green-500",
  ];

  const [currentBackground, setCurrentBackground] = useState(
    backgrounds[Math.floor(Math.random() * backgrounds.length)]
  );
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const changeBackground = () => {
    const newBackgrounds = backgrounds.filter((bg) => bg !== currentBackground);

    const newBackground =
      newBackgrounds[Math.floor(Math.random() * newBackgrounds.length)];

    setCurrentBackground(newBackground);
  };

  return (
    isOpened && (
      <div
        className={`fixed left-1/2 bottom-10 transform -translate-x-1/2 w-11/12 md:w-2/3 text-white p-6 rounded-lg shadow-lg flex justify-between items-center animate-bounce-once ${currentBackground}`}
      >
        <div className="flex items-center">
          <button
            onClick={() => setIsOpened(false)}
            className="relative flex items-center justify-center"
          >
            <div className="absolute h-14 w-14 rounded-full bg-yellow-300 animate-ping"></div>
            <div className="rounded-full bg-yellow-100 p-3 flex items-center justify-center">
              <FireIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </button>
          <div className="ml-6">
            <h2 className="font-bold text-3xl tracking-wide">
              🔥{streak} Day{streak > 1 ? "s" : ""} Streak!
            </h2>
            {!hasAlreadyAnswered && (
              <p className="text-lg text-yellow-100 mt-2">
                Keep it going! Answer the question now to maintain your streak
                and earn rewards.
              </p>
            )}
          </div>
        </div>
        {!hasAlreadyAnswered && (
          <button
            onClick={changeBackground}
            className="bg-white text-orange-600 py-4 px-4 rounded-full font-bold text-xl shadow-lg hover:bg-yellow-200 transition duration-200"
          >
            🚀
          </button>
        )}
      </div>
    )
  );
}

export default UserStreak;
