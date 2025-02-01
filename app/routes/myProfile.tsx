import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import About from "~/components/About";
import AccountSettings from "~/components/AccountSettings";
import BackHome from "~/components/BackHome";
import ChangePassword from "~/components/ChangePassword";
import CurrentUserInfo from "~/components/CurrentUserInfo";
import { Layout } from "~/components/Layout";
import { changePassword, requireUserId } from "~/utils/auth.server";
import { userAnswers, userFirstAnswers } from "~/utils/question.server";
import { getUserImage, queryForUsernameWithUserId } from "~/utils/user.server";
import {
  validatePassword,
  validatePasswordsEquality,
} from "~/utils/validators.server";

export type LoaderData = {
  user: {
    id: string;
    email: string;
    createdAt: Date;
    username: string;
    points: number;
    coins: number;
    profileImg: string;
    unlockedRewards: number;
  } | null;
  allAnsweredQuestions: {
    userId: string;
    id: string;
    createdAt: Date;
    answer: string;
    questionId: string;
    isFirst: boolean;
  }[];
  countOfAllAnsweredQuestions: number;
  countFirstOneSolver: number;
  profileImg: string | undefined;
};

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // getting logged in user info
  const user = await queryForUsernameWithUserId(userId);

  // getting all answered questions
  const allAnsweredQuestions = await userAnswers(userId);

  // getting number of all answered questions
  const countOfAllAnsweredQuestions = allAnsweredQuestions.length;

  // getting answeres when being first one solver
  const firstOneSolver = await userFirstAnswers(userId);

  // getting count of being first one solver
  const countFirstOneSolver = firstOneSolver.length;

  // getting user profile img
  const profileImg = await getUserImage(userId);

  return Response.json({
    user,
    allAnsweredQuestions,
    countOfAllAnsweredQuestions,
    countFirstOneSolver,
    profileImg: profileImg?.profileImg,
  });
};

export const action: ActionFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  // getting data from form
  const form = await request.formData();

  // passwords info
  const currentPassword = form.get("currentPassword")?.toString();
  const newPassword = form.get("newPassword")?.toString();
  const confirmNewPassword = form.get("confirmNewPassword")?.toString();

  // if not any of passwords, error
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return Response.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  // validating passwords
  const errors = {
    newPassword: validatePassword(newPassword),
    passwordConfirm: validatePasswordsEquality(newPassword, confirmNewPassword),
  };

  // if some error in errors, error
  if (Object.values(errors).some(Boolean))
    return Response.json(
      {
        errors,
        fields: { currentPassword, newPassword, confirmNewPassword },
      },
      { status: 400 }
    );

  // change password
  const result = await changePassword(userId, currentPassword, newPassword);

  // error while changing password
  if (result?.error)
    return Response.json({ error: result.error }, { status: 400 });

  return null;
};

function MyProfile() {
  const data: LoaderData = useLoaderData<typeof loader>();
  const actionData = useActionData();

  return (
    <Layout>
      <BackHome />
      <About />

      <CurrentUserInfo data={data} />

      <AccountSettings>
        <ChangePassword actionData={actionData!} />
      </AccountSettings>
    </Layout>
  );
}

export default MyProfile;
