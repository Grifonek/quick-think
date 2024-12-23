import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import Question from "~/components/Question";
import { requireUserId } from "~/utils/auth.server";
import { getTodaysQuestion, hasAnswered } from "~/utils/question.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // await updateQuest();

  // getting today's question
  const question = await getTodaysQuestion();

  const hasAlreadyAnswered = await hasAnswered(userId, question!.id);

  if (!hasAlreadyAnswered) {
    return Response.json({
      question,
    });
  } else {
    return null;
  }
};

function DailyQuestion() {
  const fetcher = useFetcher();
  const data = useLoaderData<typeof loader>();

  const [answer, setAnswer] = useState<string>("");

  function handleAnswerChange(value: string) {
    setAnswer(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetcher.submit({ answer }, { method: "post", action: "/api/answers" });
  }

  return (
    <Layout>
      <BackHome />
      <div className="text-center mt-10">
        <h1 className="font-bold text-4xl mb-4">Today&apos;s question</h1>
        <h2>There is a new one each day!</h2>
        {data ? (
          <Question
            question={data.question}
            answer={answer}
            handleAnswerChange={handleAnswerChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          "already submitted answer"
        )}
        {fetcher.data?.success && <p>Answer submitted!</p>}
        {fetcher.data?.error && <p>{fetcher.data.error}</p>}
      </div>
    </Layout>
  );
}

export default DailyQuestion;
