import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Layout } from "~/components/Layout";
import QuestionReminder from "~/components/QuestionReminder";
import SearchBar from "~/components/SearchBar";
import { isTodayOrYesterday } from "~/hooks/isTodayOrYesterday";
import { getUser, requireUserId } from "~/utils/auth.server";
import { hasAnsweredTodaysQuestion } from "~/utils/question.server";
import { getUserStreak } from "~/utils/user.server";
import UserPanel from "../components/UserPanel";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // getting user info
  const user = await getUser(request);

  // checks if user has answered today's question
  const hasUserAnsweredTodaysQuestion = await hasAnsweredTodaysQuestion(userId);

  // getting user streak
  const userStreak = await getUserStreak(userId);

  return Response.json({ user, hasUserAnsweredTodaysQuestion, userStreak });
};

function Home() {
  const { user, hasUserAnsweredTodaysQuestion, userStreak } =
    useLoaderData<typeof loader>();

  const [isOpened, setIsOpened] = useState<boolean>(
    !hasUserAnsweredTodaysQuestion
  );

  const todayOrYesterday = isTodayOrYesterday(userStreak);

  return (
    <Layout>
      <UserPanel user={user} />
      <div className="mt-14 flex flex-col items-center space-y-10">
        {todayOrYesterday && (
          <div className="w-full max-w-3xl bg-indigo-600 text-center text-white p-2 lg:p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">
              🔥{userStreak.streak} Day{userStreak.streak > 1 ? "s" : ""}{" "}
              Streak!
            </h2>
            <p className="mt-2 text-lg">
              {hasUserAnsweredTodaysQuestion
                ? "Great job! You've answered today's question. Keep the streak alive tomorrow!"
                : "Don't lose your streak! Answer today's question to keep it going."}
            </p>
          </div>
        )}

        <div className="flex w-full justify-center max-w-3xl">
          <SearchBar />
        </div>

        {isOpened && <QuestionReminder setIsOpened={setIsOpened} />}
      </div>
    </Layout>
  );
}

export default Home;
