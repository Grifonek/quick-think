import { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  await requireUserId(request);

  return null;
};

function Withdraw() {
  return <div>Withdraw money</div>;
}

export default Withdraw;
