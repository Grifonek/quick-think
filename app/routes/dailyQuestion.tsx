import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import QuestionBody from "~/components/QuestionBody";
import { requireUserId } from "~/utils/auth.server";
import { getTodaysQuestion, hasAnswered } from "~/utils/question.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // if no question for today, show message
  let noQuestion = false;

  // getting today's question
  const question = await getTodaysQuestion();

  if (!question) {
    noQuestion = true;

    return Response.json({ noQuestion, hasAlreadyAnswered: false });
  }

  // has user already answered this question
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

  return (
    <Layout>
      <BackHome />
      <QuestionBody data={data} fetcher={fetcher} />
    </Layout>
  );
}

export default DailyQuestion;
