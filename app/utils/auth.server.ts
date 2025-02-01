import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { createUser } from "./user.server";
import bcrypt from "bcryptjs";

export interface RegisterFormTypes {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
}

interface LoginFormTypes {
  email: string;
  password: string;
}

export async function register(user: RegisterFormTypes) {
  const existsEmail = await prisma.user.findUnique({
    where: { email: user.email },
  });
  const existsUsername = await prisma.user.findUnique({
    where: { username: user.username },
  });

  if (existsEmail || existsUsername) {
    return Response.json(
      {
        error: "User with this email or username already exists!",
        fields: { email: user.email, username: user.username },
      },
      {
        status: 400,
      }
    );
  }

  const newUser = await createUser(user);
  if (!newUser)
    return Response.json(
      {
        error: "Something went wrong trying to create a new user...",
        fields: { email: user.email, password: user.password },
      },
      {
        status: 400,
      }
    );

  return createUserSession(newUser.id, "/");
}

export async function login({ email, password }: LoginFormTypes) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return Response.json({ error: "Incorrect login!" }, { status: 400 });

  return createUserSession(user.id, "/home");
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not set!");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "quick-think-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function requireUserId(
  req: Request,
  redirectTo: string = new URL(req.url).pathname
) {
  const session = await getUserSession(req);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  return userId;
}

function getUserSession(req: Request) {
  return storage.getSession(req.headers.get("Cookie"));
}

async function getUserId(req: Request) {
  const session = await getUserSession(req);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") return null;

  return userId;
}

export async function getUser(req: Request) {
  const userId = await getUserId(req);

  if (typeof userId !== "string") return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        points: true,
        coins: true,
        username: true,
      },
    });

    return user;
  } catch {
    throw logout(req);
  }
}

export async function logout(req: Request) {
  const session = await getUserSession(req);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || !(await bcrypt.compare(currentPassword, user.password)))
    return { error: "Incorrect current password!" }; // only with this is shows in the form as error, try/catch block refreshes whole site
  // throw new Response("Incorrect current password!", { status: 400 });

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { success: true };
}
