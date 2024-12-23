import { LoaderFunction } from "@remix-run/node";
import { queryForUsers } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("q");

  if (!search) {
    return Response.json({ users: [] });
  }

  const users = await queryForUsers(search);
  return Response.json({ users });
};
