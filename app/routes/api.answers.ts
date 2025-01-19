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
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const userAnswer = formData.get("answer") as string;

  if (!userAnswer)
    return Response.json({ error: "Answer is required!" }, { status: 400 });

  const question = await getTodaysQuestion();

  if (!question)
    return Response.json({ error: "No question available!" }, { status: 404 });

  if (userAnswer === question.correctAnswer) {
    const isFirstOneSolver = await isFirst(question!.id);

    if (isFirstOneSolver) {
      await updateQuestionFirstAndRewardUser(question!.id, userId);
    } else {
      await rewardUser(userId);
    }
  }

  const result = await answer(userId, question!.id, userAnswer);

  return Response.json({ success: true, result });
};
