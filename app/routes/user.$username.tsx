import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import SearchedUserInfo from "~/components/SearchedUserInfo";
import { requireUserId } from "~/utils/auth.server";
import { userAnswers, userFirstAnswers } from "~/utils/question.server";
import { queryForUsername } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  // ensuring that user is authenticated
  await requireUserId(request);

  // getting user from url parameters
  const { username } = params;

  // username not string, error
  if (typeof username !== "string") {
    throw new Response("Invalid user ID", { status: 400 });
  }

  // getting user
  const user = await queryForUsername(username);

  if (!user)
    throw new Response(null, { status: 404, statusText: "User not found!" });

  // getting all answered questions
  const allAnsweredQuestions = await userAnswers(user.id);

  // getting number of all answered questions
  const countOfAllAnsweredQuestions = allAnsweredQuestions.length;

  // getting answeres when being first one solver
  const firstOneSolver = await userFirstAnswers(user.id);

  // getting count of being first one solver
  const countFirstOneSolver = firstOneSolver.length;

  return Response.json({
    user,
    allAnsweredQuestions,
    countOfAllAnsweredQuestions,
    countFirstOneSolver,
  });
};

function UserById() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <BackHome />
      <SearchedUserInfo data={data} />
    </Layout>
  );
}

export default UserById;
