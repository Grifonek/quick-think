import { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  await requireUserId(request);

  return null;
};

function myProfile() {
  return <div>My profile</div>;
}

export default myProfile;
