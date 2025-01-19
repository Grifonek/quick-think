import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import { requireUserId } from "~/utils/auth.server";
import {
  getAllTimeBestUsers,
  getMonthlyBestUsers,
  getWeeklyBestUsers,
  queryForUsernameWithUserId,
} from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);
  const me = await queryForUsernameWithUserId(userId);

  const { time } = params;

  let users;

  switch (time) {
    case "weekly":
      users = await getWeeklyBestUsers();
      break;
    case "monthly":
      users = await getMonthlyBestUsers();
      break;
    case "all-time":
      users = await getAllTimeBestUsers();
      break;
  }

  return Response.json({
    users,
    me,
    time: time || "all-time",
  });
};

function Leaderboards() {
  const { users, me, time } = useLoaderData<typeof loader>();

  const boardName =
    time
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "All Time";

  return (
    <Layout>
      <BackHome />
      <div className="text-center text-2xl font-bold text-white mb-10">
        {boardName} Leaderboards
      </div>
      <div className="space-y-4">
        {users &&
          users.map((user, i) => (
            <div
              key={user.id}
              className={`${
                user.username === me.username ? "bg-gray-600" : "bg-gray-800"
              }  p-4 rounded-lg shadow-md flex items-center justify-between text-white`}
            >
              <div className="w-12 text-center font-bold text-indigo-400">
                #{i + 1}
              </div>

              <div className="flex-1 text-lg font-medium text-indigo-200 text-center">
                <Link
                  to={`/user/${user.username.toLowerCase()}`}
                  className="hover:underline"
                >
                  {user.username}
                </Link>
              </div>

              <div className="w-32 text-left text-sm text-gray-300">
                Coins:{" "}
                <span className="font-semibold text-indigo-400">
                  {user.coins}
                </span>
              </div>

              <div className="w-32 text-left text-sm text-gray-300">
                Points:{" "}
                <span className="font-semibold text-indigo-400">
                  {user.points}
                </span>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default Leaderboards;
