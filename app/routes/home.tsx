import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Layout } from "~/components/Layout";
import QuestionReminder from "~/components/QuestionReminder";
import SearchBar from "~/components/SearchBar";
import { getUser, requireUserId } from "~/utils/auth.server";
import { hasAnsweredTodaysQuestion } from "~/utils/question.server";
import UserPanel from "../components/UserPanel";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // getting user info
  const user = await getUser(request);

  // checks if user has answered today's question
  const hasUserAnsweredTodaysQuestion = await hasAnsweredTodaysQuestion(userId);

  return Response.json({ user, hasUserAnsweredTodaysQuestion });
};

function Home() {
  const { user, hasUserAnsweredTodaysQuestion } =
    useLoaderData<typeof loader>();

  const [isOpened, setIsOpened] = useState<boolean>(
    !hasUserAnsweredTodaysQuestion
  );

  return (
    <Layout>
      <UserPanel user={user} />
      <div className="mt-36 flex justify-center">
        <SearchBar />
      </div>
      {isOpened && <QuestionReminder setIsOpened={setIsOpened} />}
    </Layout>
  );
}

export default Home;
