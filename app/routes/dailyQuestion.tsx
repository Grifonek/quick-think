import { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import QuestionBody from "~/components/QuestionBody";
import UserStreak from "~/components/UserStreak";
import { isTodayOrYesterday } from "~/hooks/isTodayOrYesterday";
import { requireUserId } from "~/utils/auth.server";
import {
  getAllMessagesForTodaysQuestion,
  getTodaysQuestion,
  hasAnswered,
} from "~/utils/question.server";
import { getUserStreak } from "~/utils/user.server";
import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Question - Quick Think" },
    {
      name: "description",
      content: "Your daily question to make you think hard and earn point",
    },
    { name: "keywords", content: "question, quiz, challenge, trivia" },
    { property: "og:title", content: "Daily Question - Quick Think" },
    {
      property: "og:description",
      content: "Your daily question to make you think hard and earn point",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // if no question for today, show message
  let noQuestion = false;

  // getting today's question
  const question = await getTodaysQuestion();

  // getting user streak
  const userStreak = await getUserStreak(userId);

  if (!question) {
    noQuestion = true;

    return Response.json({ noQuestion, hasAlreadyAnswered: false, userStreak });
  }

  // has user already answered this question
  const hasAlreadyAnswered = await hasAnswered(userId, question!.id);

  // getting all messages for question
  const questionMessages = await getAllMessagesForTodaysQuestion();

  return Response.json({
    question,
    noQuestion,
    hasAlreadyAnswered,
    userStreak,
    questionMessages,
    userId,
  });
};

function DailyQuestion() {
  const fetcher = useFetcher();
  const data = useLoaderData<typeof loader>();

  const todayOrYesterday = isTodayOrYesterday(data.userStreak);

  return (
    <Layout>
      <BackHome />
      <QuestionBody data={data} fetcher={fetcher} />
      {todayOrYesterday && (
        <UserStreak
          streak={data.userStreak.streak}
          hasAlreadyAnswered={data.hasAlreadyAnswered}
        />
      )}
    </Layout>
  );
}

export default DailyQuestion;
