function QuestionAllAnswers({ data }) {
  return (
    <div className="bg-gray-700 p-8 rounded-xl shadow-md w-full mt-10">
      <h2 className="text-2xl font-semibold text-gray-200">
        All User&apos;s Answers
      </h2>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.question.answers.map((ans) => (
          <li
            key={ans.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg text-gray-300 text-xl font-semibold"
          >
            {ans.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionAllAnswers;
