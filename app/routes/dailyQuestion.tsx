import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import Question from "~/components/Question";
import { requireUserId } from "~/utils/auth.server";
import { getTodaysQuestion, hasAnswered } from "~/utils/question.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // await updateQuest();

  // if no question for today, show message
  let noQuestion = false;

  // getting today's question
  const question = await getTodaysQuestion();

  if (!question) {
    noQuestion = true;

    return Response.json({ noQuestion, hasAlreadyAnswered: false });
  }

  const hasAlreadyAnswered = await hasAnswered(userId, question!.id);

  return Response.json({
    question,
    noQuestion,
    hasAlreadyAnswered,
  });
};

function DailyQuestion() {
  const fetcher = useFetcher();
  const data = useLoaderData<typeof loader>();
  // console.log(data);

  const [answer, setAnswer] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleAnswerChange(value: string) {
    setAnswer(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetcher.submit({ answer }, { method: "post", action: "/api/answers" });

    handleModalOpen();
  }

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

  useEffect(() => {
    setTimeRemaining(calculateTimeUntilMidnight());

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // console.log(data.question.answers);

  return (
    <Layout>
      <BackHome />
      <div className="text-center mt-10">
        <h1 className="font-bold text-4xl mb-10 text-white">
          Today&apos;s question
        </h1>

        {data.noQuestion ? (
          <p className="text-gray-400 text-lg">
            No question for today... Come back tomorrow!
          </p>
        ) : data.hasAlreadyAnswered ? (
          <div>
            <p className="text-gray-400 text-lg">
              You&apos;ve already answered today&apos;s question. Great job!
            </p>

            <div className="mt-16 flex flex-col items-center space-y-6">
              <h2 className="text-2xl font-semibold text-gray-400 tracking-widest uppercase">
                Next Question Drops In
              </h2>
              <p className="text-8xl font-extrabold text-white tracking-wider">
                {timeRemaining}
              </p>
              <div className="h-2 w-64 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <Question
              question={data.question}
              answer={answer}
              handleAnswerChange={handleAnswerChange}
              handleSubmit={handleSubmit}
            />
          </div>
        )}

        {data.question?.answers?.length > 0 && data.hasAlreadyAnswered && (
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
        )}

        {fetcher.data?.success && isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10 z-50">
            <div className="flex flex-col bg-white rounded-lg p-6 shadow-lg text-center items-center justify-center space-y-7 w-3/5 h-1/5">
              <h2 className="text-4xl font-semibold">Congratulations!</h2>
              <p className="text-gray-600 text-xl">
                You have submitted your answer!{" "}
                <span className="text-3xl">🙌</span>
              </p>
              <button
                onClick={handleModalClose}
                className="bg-indigo-500 text-white text-xl py-2 px-4 rounded-md hover:bg-indigo-600 transition"
              >
                <Link to="/home">Close</Link>
              </button>
            </div>
          </div>
        )}

        {fetcher.data?.error && (
          <p className="text-red-500 text-lg mt-4">{fetcher.data.error}</p>
        )}
      </div>
    </Layout>
  );
}

export default DailyQuestion;
