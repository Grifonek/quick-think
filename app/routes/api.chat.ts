import { ActionFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { createNewMessage, getTodaysQuestion } from "~/utils/question.server";

export const action: ActionFunction = async ({ request }) => {
  // checking if user is authenticated
  const userId = await requireUserId(request);

  // getting form data
  const formData = await request.formData();

  const userMessage = formData.get("message") as string;

  if (!userMessage)
    return Response.json({ error: "Message is required!" }, { status: 400 });

  // getting todays question
  const question = await getTodaysQuestion();

  // sending message
  const message = await createNewMessage(userId, question!.id, userMessage);

  return Response.json({ success: true, message });
};
