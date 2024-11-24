import {
  redirect,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// export const loader: LoaderFunction = async ({ req }) => {
//   await requireUserId(req);

//   return redirect("/home");
// };

export default function Index() {
  return (
    <div className="flex h-screen">
      <h1 className="text-blue-400">Quick Think!</h1>
    </div>
  );
}
