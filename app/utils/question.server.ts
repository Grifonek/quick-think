import { prisma } from "./prisma.server";

// finds all answers of some question
export const existingAnswers = async (questionId: string) => {
  return prisma.answer.findMany({
    where: { questionId },
  });
};

// checks if is there some answer on some question
export const isFirst = async (questionId: string) => {
  const answers = await existingAnswers(questionId);

  return answers.length === 0;
};

// created answer for question and user
export const answer = async (
  userId: string,
  questionId: string,
  userAnswer: string
) => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { answers: true },
  });

  const updatedAnswers = question?.answers || [];
  updatedAnswers.push({ userId, answer: userAnswer });

  await prisma.question.update({
    where: { id: questionId },
    data: {
      answers: updatedAnswers,
    },
  });

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
  return prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: 10 },
    },
  });
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

  return prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: 15 },
      coins: { increment: 1 },
    },
  });
};

// finds all answers for user
export const userAnswers = async (userId: string) => {
  return prisma.answer.findMany({
    where: { userId },
    include: { question: true },
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
