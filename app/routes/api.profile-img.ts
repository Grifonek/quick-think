import { ActionFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { setUserImage } from "~/utils/user.server";

export const loader = async () => {
  return Response.json({ message: "POST only" });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const newProfileImg = formData.get("profileImg")?.toString();

  if (!newProfileImg) {
    return Response.json(
      { error: "No profile image provided." },
      { status: 400 }
    );
  }

  // saving new img to the BD
  await setUserImage(userId, newProfileImg);

  return Response.json({ success: true });
};
