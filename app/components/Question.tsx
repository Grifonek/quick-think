interface Question {
  id: string;
  createdAt: string;
  title: string;
  text: string;
  startDate: string;
  correctAnswer: string;
  firstAnswerId: string;
}

interface QuestionProps {
  question: Question;
  answer: string;
  handleAnswerChange: (value: string) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

function Question({
  question,
  answer,
  handleAnswerChange,
  handleSubmit,
  isSubmitting,
}: QuestionProps) {
  return (
    <div className="bg-gray-700 p-8 rounded-xl shadow-md text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-white mb-6">
        {question.title ? question.title : "No Question for Today"}
      </h1>
      <h2 className="text-xl font-light text-gray-300 mb-8">{question.text}</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center"
      >
        <input
          type="text"
          value={answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full max-w-md p-4 bg-gray-800 text-white rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:opacity-90 focus:outline-none focus:ring-8 focus:ring-indigo-500 transition ${
            isSubmitting && "cursor-not-allowed"
          }`}
        >
          {isSubmitting && answer !== "" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Question;
