import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BackHome from "~/components/BackHome";
import { requireUserId } from "~/utils/auth.server";
import { userAnswers, userFirstAnswers } from "~/utils/question.server";
import { queryForUsername } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  const { username } = params;

  // if (typeof username !== "string") return redirect("/home");
  if (typeof username !== "string") {
    throw new Response("Invalid user ID", { status: 400 });
  }

  const user = await queryForUsername(username);

  if (!user)
    throw new Response(null, { status: 404, statusText: "User not found!" });

  const allAnsweredQuestions = await userAnswers(userId);
  const countOfAllAnsweredQuestions = allAnsweredQuestions.length;
  const firstOneSolver = await userFirstAnswers(userId);
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

  const formattedDate = new Date(data.user.createdAt).toLocaleDateString(
    "de-DE"
  );

  return (
    <div>
      <BackHome />

      <div className="flex justify-center items-center space-x-10 mt-10">
        <div className="space-y-4">
          <h1 className="font-bold text-3xl">{data.user.username}</h1>
          <h3 className="font-semibold">{data.user.email}</h3>
          <p>{data.user.points} points</p>
          <p className="flex items-center gap-x-1">
            {data.user.coins}
            <AcademicCapIcon
              className="size-5 text-indigo-500"
              title="Coins earned"
            />
          </p>

          <h2>
            Member of the community since{" "}
            <span className="font-semibold">{formattedDate}</span>
          </h2>
        </div>
        <div className="size-60 bg-indigo-500 rounded-full"></div>
      </div>

      <div className="mt-10 text-center">
        <h1 className="font-bold text-4xl mb-4">Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 mx-3 rounded shadow">
            <h2 className="text-lg font-semibold">Solved Questions</h2>
            <p className="text-3xl font-bold text-indigo-500">
              {data.countOfAllAnsweredQuestions}
            </p>
          </div>
          <div className="bg-gray-100 p-4 mx-3 rounded shadow">
            <h2 className="text-lg font-semibold">First One Solver</h2>
            <p className="text-3xl font-bold text-indigo-500">
              {data.countFirstOneSolver}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserById;
