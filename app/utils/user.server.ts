import bcrypt from "bcryptjs";
import { RegisterFormTypes } from "./auth.server";
import { prisma } from "./prisma.server";

export const createUser = async (user: RegisterFormTypes) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        username: user.username,
        // passwordConfirm: user.passwordConfirm,
        // missing profileImg
      },
    });

    return { id: newUser.id, email: user.email };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getOtherUsers = async (userId: string) => {
  return prisma.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy: {
      username: "asc",
    },
  });
};

// export const getUserById = async (userId: string) => {
//   return await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });
// };

export const queryForUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      email: true,
      points: true,
      coins: true,
      profileImg: true,
    },
  });
};

export const queryForUsernameWithUserId = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      email: true,
      points: true,
      coins: true,
      profileImg: true,
      unlockedRewards: true,
    },
  });
};

export const queryForUsers = async (username: string) => {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: username,
        mode: "insensitive",
      },
    },
    select: {
      username: true,
    },
  });
};

export const getAllTimeBestUsers = async () => {
  return await prisma.user.findMany({
    orderBy: [
      {
        coins: "desc",
      },
      {
        points: "desc",
      },
    ],
    select: {
      id: true,
      username: true,
      coins: true,
      points: true,
    },
    take: 50,
  });
};

export const getMonthlyBestUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        coins: "desc",
      },
      {
        points: "desc",
      },
    ],
    select: {
      id: true,
      username: true,
      coins: true,
      points: true,
      answers: true,
    },
    take: 50,
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filteredUsers = users.map((user) => {
    const thisMonthAnswers = user.answers.filter((answer) => {
      const answerDate = new Date(answer.createdAt);

      return (
        answerDate.getMonth() === currentMonth &&
        answerDate.getFullYear() === currentYear
      );
    });

    return {
      id: user.id,
      username: user.username,
      coins: user.coins,
      points: user.points,
      answerCount: thisMonthAnswers.length,
    };
  });

  return filteredUsers;
};

export const getWeeklyBestUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        coins: "desc",
      },
      {
        points: "desc",
      },
    ],
    select: {
      id: true,
      username: true,
      coins: true,
      points: true,
      answers: true,
    },
    take: 50,
  });

  const currentDate = new Date();
  const startOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
  );
  startOfWeek.setHours(0, 0, 0, 0);

  const filteredUsers = users.map((user) => {
    const thisWeekAnswers = user.answers.filter((answer) => {
      const answerDate = new Date(answer.createdAt);
      return answerDate >= startOfWeek && answerDate <= new Date();
    });

    return {
      id: user.id,
      username: user.username,
      coins: user.coins,
      points: user.points,
      answersCount: thisWeekAnswers.length,
    };
  });

  return filteredUsers;
};

export const updateUserStreak = async (userId: string) => {
  const user = await getUserStreak(userId);

  if (!user) throw new Error("User not found!");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (user.lastAnsweredDate) {
    const lastAnswered = new Date(user.lastAnsweredDate);

    // already answered today
    if (lastAnswered.getTime() === today.getTime()) {
      return user.streak;
    }

    if (lastAnswered.getTime() === yesterday.getTime()) {
      // increment streak if answered yesterday
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          streak: { increment: 1 },
          lastAnsweredDate: today,
        },
      });

      return updatedUser.streak;
    }
  }

  // if missed a day or first answer
  const resetUser = await prisma.user.update({
    where: { id: userId },
    data: {
      streak: 1,
      lastAnsweredDate: today,
    },
  });

  return resetUser.streak;
};

export const getUserStreak = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      streak: true,
      lastAnsweredDate: true,
    },
  });
};

export const getUserImage = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      profileImg: true,
    },
  });
};

export const setUserImage = async (userId: string, profilePic: string) => {
  try {
    if (!profilePic) {
      throw new Error("Profile picture cannot be null or undefined.");
    }

    // updating the user's profile picture in the DB
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileImg: profilePic,
      },
    });
  } catch (error) {
    console.error("Error in setUserImage:", error);
    throw new Error("Failed to update profile picture.");
  }
};

export const addRewardLevel = async (userId: string) => {
  const user = await queryForUsernameWithUserId(userId);

  if (!user) throw new Error("User not found!");

  const rewardsPerLevel = 100;
  const rewardLevel = Math.floor(user.points / rewardsPerLevel);

  if (rewardLevel > user.unlockedRewards) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        unlockedRewards: { increment: 1 },
      },
    });
  }

  return;
};
