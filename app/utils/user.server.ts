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
      username: true,
      createdAt: true,
      email: true,
      points: true,
      coins: true,
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
