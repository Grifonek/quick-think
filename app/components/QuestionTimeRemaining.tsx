import { useEffect, useState } from "react";

function QuestionTimeRemaining({ fetcher }) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    setTimeRemaining(calculateTimeUntilMidnight());

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // calculating time until midnight
  function calculateTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );

    const difference = midnight.getTime() - now.getTime();

    const h = Math.floor(difference / (1000 * 60 * 60));
    const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((difference % (1000 * 60)) / 1000);

    const formattedHours = String(h).padStart(2, "0");
    const formattedMinutes = String(min).padStart(2, "0");
    const formattedSeconds = String(sec).padStart(2, "0");

    return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  }

  return (
    <div>
      <p className="text-gray-400 text-lg">
        You&apos;ve already answered today&apos;s question. Great job!
      </p>

      <div className="mt-16 flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-400 tracking-widest uppercase">
          Next Question Drops In
        </h2>
        <p className="flex max-lg:flex-col text-8xl font-extrabold text-white tracking-wider max-md:w-20 items-center justify-center">
          {timeRemaining}
        </p>
        <div className="h-2 w-64 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

export default QuestionTimeRemaining;
