import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BackHome from "~/components/BackHome";
import Board from "~/components/Board";
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

  // getting currently logged in user
  const me = await queryForUsernameWithUserId(userId);

  // getting board name from parameters
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
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "All Time";

  return (
    <Layout>
      <BackHome />
      <Board boardName={boardName} users={users} me={me} />
    </Layout>
  );
}

export default Leaderboards;
