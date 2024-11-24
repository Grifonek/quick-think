import { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ req }) => {
  await requireUserId(req);

  return null;
};

function Home() {
  return (
    <div>
      <h1>Home page</h1>
      {/* some panel with links and user info */}
    </div>
  );
}

export default Home;
