import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";

function QuestionReminder({
  setIsOpened,
}: {
  setIsOpened: (value: boolean) => void;
}) {
  return (
    <div className="fixed left-1/2 bottom-10 transform -translate-x-1/2 w-11/12 md:w-2/3 bg-indigo-600 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-12 w-12 rounded-full bg-yellow-300 animate-ping"></div>
          <div className="rounded-full bg-yellow-100 p-2">
            <ExclamationCircleIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="ml-4">
          <h2 className="font-bold text-xl">
            You haven&apos;t answered today&apos;s question!
          </h2>
          <p className="text-md text-indigo-200">
            Answer the question now to earn points and rewards.
          </p>
        </div>
      </div>

      <div className="flex">
        <Link
          to={"/dailyQuestion"}
          className="bg-yellow-500 hover:bg-yellow-600 text-indigo-800 font-semibold px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          Answer Now
        </Link>
        <button
          onClick={() => setIsOpened(false)}
          className="ml-4 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default QuestionReminder;
