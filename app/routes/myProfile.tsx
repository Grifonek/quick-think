import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import BackHome from "~/components/BackHome";
import Form from "~/components/Form";
import { Layout } from "~/components/Layout";
import { changePassword, requireUserId } from "~/utils/auth.server";
import { userAnswers, userFirstAnswers } from "~/utils/question.server";
import { queryForUsernameWithUserId } from "~/utils/user.server";
import {
  validatePassword,
  validatePasswordsEquality,
} from "~/utils/validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  const user = await queryForUsernameWithUserId(userId);

  const allAnsweredQuestions = await userAnswers(userId);
  const countOfAllAnsweredQuestions = allAnsweredQuestions.length;
  const firstOneSolver = await userFirstAnswers(userId);
  const countFirstOneSolver = firstOneSolver.length;

  return Response.json({
    user,
    allAnsweredQuestions,
    countOfAllAnsweredQuestions,
    countFirstOneSolver,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const form = await request.formData();

  const currentPassword = form.get("currentPassword")?.toString();
  const newPassword = form.get("newPassword")?.toString();
  const confirmNewPassword = form.get("confirmNewPassword")?.toString();

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return Response.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const errors = {
    newPassword: validatePassword(newPassword),
    passwordConfirm: validatePasswordsEquality(newPassword, confirmNewPassword),
  };

  if (Object.values(errors).some(Boolean))
    return Response.json(
      {
        errors,
        fields: { currentPassword, newPassword, confirmNewPassword },
      },
      { status: 400 }
    );

  const result = await changePassword(userId, currentPassword, newPassword);

  if (result?.error)
    return Response.json({ error: result.error }, { status: 400 });

  return null;
};

function MyProfile() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData();

  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");

  const [formData, setFormData] = useState({
    currentPassword: actionData?.fields?.currentPassword || "",
    newPassword: actionData?.fields?.newPassword || "",
    confirmNewPassword: actionData?.fields?.confirmNewPassword || "",
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  }

  const formattedDate = new Date(data.user.createdAt).toLocaleDateString(
    "de-DE"
  );

  return (
    <Layout>
      <BackHome />

      <div className="flex flex-col items-center justify-center space-y-10 mt-12 md:space-x-10 md:flex-row-reverse">
        <div className="flex-shrink-0">
          <div className="h-40 w-40 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-4xl">
            {data.user.username[0]}
          </div>
        </div>
        <div className="space-y-6 text-center md:text-left">
          <h1 className="font-extrabold text-4xl text-white">
            {data.user.username}
          </h1>
          <h3 className="font-medium text-lg text-indigo-300">
            {data.user.email}
          </h3>
          <p className="text-lg text-gray-300">{data.user.points} points</p>
          <p className="flex items-center justify-center md:justify-start gap-x-2 text-lg text-gray-300">
            {data.user.coins}
            <AcademicCapIcon
              className="size-5 text-indigo-500"
              title="Coins earned"
            />
          </p>
          <h2 className="text-gray-400 text-lg">
            Member of the community since{" "}
            <span className="font-semibold text-white">{formattedDate}</span>
          </h2>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h1 className="font-extrabold text-4xl text-white mb-6">
          Account Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Changing password */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-300 mb-4">
              Change Password
            </h2>

            <form method="post" className="space-y-6">
              {formError && (
                <div className="text-sm font-semibold text-center text-red-500">
                  {formError}
                </div>
              )}

              <Form
                htmlFor="currentPassword"
                label="Current Password"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange(e, "currentPassword")}
                error={errors?.currentPassword}
              />

              <Form
                htmlFor="newPassword"
                label="New Password"
                value={formData.newPassword}
                onChange={(e) => handleInputChange(e, "newPassword")}
                error={errors?.newPassword}
              />

              <Form
                htmlFor="confirmNewPassword"
                label="Confirm New Password"
                value={formData.confirmNewPassword}
                onChange={(e) => handleInputChange(e, "confirmNewPassword")}
                error={errors?.passwordConfirm}
              />

              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-300 mb-4">
              Delete Account
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Warning: Deleting your account is irreversible.
            </p>
            <button className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
              Delete Account
            </button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}

export default MyProfile;
