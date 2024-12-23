import { LoaderFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  await requireUserId(request);

  return null;
};

function Leaderboards() {
  const params = useParams();

  const boardName = params.time
    ? params.time
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  return (
    <Layout>
      <BackHome />
      <div>{boardName} Leaderboards</div>
    </Layout>
  );
}

export default Leaderboards;
