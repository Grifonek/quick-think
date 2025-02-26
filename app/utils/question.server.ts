import { prisma } from "./prisma.server";
import {
  addRewardLevel,
  queryForUsernameWithUserId,
  updateUserStreak,
} from "./user.server";

// finds all answers of some question
export const existingAnswers = async (questionId: string) => {
  return prisma.answer.findMany({
    where: { questionId },
  });
};

// checks if user is first one solver with CORRECT answer on todays question
export const isFirst = async (questionId: string) => {
  const answers = await existingAnswers(questionId);

  const todaysQuestion = await getTodaysQuestion();

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].answer === todaysQuestion?.correctAnswer) return false;
  }

  return true;
  // return answers.length === 0;
};

// created answer for question and user
export const answer = async (
  userId: string,
  questionId: string,
  userAnswer: string
) => {
  // const question = await prisma.question.findUnique({
  //   where: { id: questionId },
  //   select: { answers: true },
  // });

  // const updatedAnswers = question?.answers || [];
  // updatedAnswers.push({ userId, answer: userAnswer });

  // await prisma.question.update({
  //   where: { id: questionId },
  //   data: {
  //     answers: updatedAnswers,
  //   },
  // });

  return prisma.answer.create({
    data: {
      userId,
      questionId,
      answer: userAnswer,
      isFirst: await isFirst(questionId),
    },
  });
};

// if is answer correct, update user points
export const rewardUser = async (userId: string) => {
  // update user streak
  await updateUserStreak(userId);

  // update points
  const updatedUser = prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: 10 },
    },
  });

  // add reward level if points get higher
  await addRewardLevel(userId);

  return updatedUser;
};

// if is the first one solver, then updates question and rewards user
export const updateQuestionFirstAndRewardUser = async (
  questionId: string,
  userId: string
) => {
  await prisma.question.update({
    where: { id: questionId },
    data: { firstAnswerId: userId },
  });

  // update user streak
  await updateUserStreak(userId);

  const updatedUser = prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: 15 },
      coins: { increment: 1 },
    },
  });

  // add reward level if points get higher
  await addRewardLevel(userId);

  return updatedUser;
};

// finds all answers for user
export const userAnswers = async (userId: string) => {
  return prisma.answer.findMany({
    where: { userId },
    // include: { question: true },
  });
};

// finds all first answers for user
export const userFirstAnswers = async (userId: string) => {
  return prisma.question.findMany({
    where: { firstAnswerId: userId },
  });
};

// checks if user already answered at some question
export const hasAnswered = async (userId: string, questionId: string) => {
  return prisma.answer.findFirst({
    where: {
      userId,
      questionId,
    },
  });
};

// checks if user already answered today's question
export const hasAnsweredTodaysQuestion = async (userId: string) => {
  const todaysQuestion = await getTodaysQuestion();

  if (!todaysQuestion) return;

  return await hasAnswered(userId, todaysQuestion!.id);
};

// gets today's question
export const getTodaysQuestion = async () => {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  return prisma.question.findFirst({
    where: {
      startDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      answers: true,
      messages: true,
    },
  });
};

// helper function for defining createdAt
export const updateQuest = async () => {
  await prisma.question.updateMany({
    where: {
      createdAt: undefined,
    },
    data: {
      createdAt: new Date(),
    },
  });
};

// creating a new message
export const createNewMessage = async (
  userId: string,
  questionId: string,
  text: string
) => {
  return prisma.message.create({
    data: {
      userId,
      questionId,
      message: text,
    },
  });
};

// getting all messages for todays question
export const getAllMessagesForTodaysQuestion = async () => {
  const todaysQuestion = await getTodaysQuestion();

  if (!todaysQuestion) return [];

  const messagesWithUser = await Promise.all(
    todaysQuestion.messages.map(async (message) => {
      const user = await queryForUsernameWithUserId(message.userId);
      return {
        ...message,
        user,
      };
    })
  );

  const onlyMessageAndUser = messagesWithUser.map((item) => {
    return {
      message: item.message,
      username: item.user!.username,
      userId: item.user!.id,
      unlockedRewards: item.user!.unlockedRewards,
    };
  });

  return onlyMessageAndUser;
};
