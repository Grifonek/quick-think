import { RegisterFormTypes } from "./auth.server";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";

export const createUser = async (user: RegisterFormTypes) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      passwordConfirm: user.passwordConfirm,
      username: user.username,
      // missing profileImg
    },
  });

  return { id: newUser.id, email: user.email };
};
