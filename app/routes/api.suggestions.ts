import { LoaderFunction } from "@remix-run/node";
import { queryForUsers } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  // getting URL
  const url = new URL(request.url);

  // searching for "q"
  const search = url.searchParams.get("q");

  if (!search) {
    return Response.json({ users: [] });
  }

  // getting all users satisfying search
  const users = await queryForUsers(search);

  return Response.json({ users });
};
