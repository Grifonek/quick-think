import { Link } from "@remix-run/react";

function QuestionAnswerModalWindow({ handleModalClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10 z-50">
      <div className="flex flex-col bg-white rounded-lg p-6 shadow-lg text-center items-center justify-center space-y-7 w-3/5 h-1/5">
        <h2 className="text-4xl font-semibold">Congratulations!</h2>
        <p className="text-gray-600 text-xl">
          You have submitted your answer! <span className="text-3xl">🙌</span>
        </p>
        <button
          onClick={handleModalClose}
          className="bg-indigo-500 text-white text-xl py-2 px-4 rounded-md hover:bg-indigo-600 transition"
        >
          <Link to="/home">Close</Link>
        </button>
      </div>
    </div>
  );
}

export default QuestionAnswerModalWindow;
