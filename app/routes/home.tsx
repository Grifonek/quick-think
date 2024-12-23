import { LoaderFunction } from "@remix-run/node";
import { getUser, requireUserId } from "~/utils/auth.server";
import UserPanel from "../components/UserPanel";
import { Layout } from "~/components/Layout";
import { useLoaderData } from "@remix-run/react";
import SearchBar from "~/components/SearchBar";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  await requireUserId(request);

  // getting user info
  const user = await getUser(request);

  return Response.json({ user });
};

function Home() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <UserPanel user={user} />
      <div className="mt-36 flex justify-center">
        <SearchBar />
      </div>
    </Layout>
  );
}

export default Home;
