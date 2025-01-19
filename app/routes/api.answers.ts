import { ActionFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import {
  answer,
  getTodaysQuestion,
  isFirst,
  rewardUser,
  updateQuestionFirstAndRewardUser,
} from "~/utils/question.server";

export const action: ActionFunction = async ({ request }) => {
  // checking if user is authenticated
  const userId = await requireUserId(request);

  // getting form data
  const formData = await request.formData();

  const userAnswer = formData.get("answer") as string;

  if (!userAnswer)
    return Response.json({ error: "Answer is required!" }, { status: 400 });

  // getting todays question
  const question = await getTodaysQuestion();

  if (!question)
    return Response.json({ error: "No question available!" }, { status: 404 });

  // checking if user answer is same as correct answer
  if (userAnswer === question.correctAnswer) {
    const isFirstOneSolver = await isFirst(question!.id);

    if (isFirstOneSolver) {
      await updateQuestionFirstAndRewardUser(question!.id, userId);
    } else {
      await rewardUser(userId);
    }
  }

  // sending answer
  const result = await answer(userId, question!.id, userAnswer);

  return Response.json({ success: true, result });
};
