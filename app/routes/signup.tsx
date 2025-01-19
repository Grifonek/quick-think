import { ActionFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import React, { useState } from "react";
import Form from "~/components/Form";
import { register } from "~/utils/auth.server";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordsEquality,
} from "~/utils/validators.server";

export const action: ActionFunction = async ({ request }) => {
  console.log(request);
  const form = await request.formData();
  console.log(form);

  const email = form.get("email")?.toString();
  const username = form.get("username")?.toString().toLowerCase();
  const password = form.get("password")?.toString();
  const passwordConfirm = form.get("passwordConfirm")?.toString();

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    passwordConfirm: validatePasswordsEquality(password, passwordConfirm),
    username: validateName(username),
  };

  if (Object.values(errors).some(Boolean))
    return Response.json(
      {
        errors,
        fields: { email, password, username, passwordConfirm },
      },
      { status: 400 }
    );

  return await register({ email, password, passwordConfirm, username });
};

function SignUp() {
  const actionData = useActionData();

  // const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    passwordConfirm: actionData?.fields?.passwordConfirm || "",
    username: actionData?.fields?.username || "",
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    setFormData((form) => ({ ...form, [field]: e.target.value }));
  }

  // useEffect(() => {
  //   if (!firstLoad.current) {
  //     const newState = {
  //       email: "",
  //       password: "",
  //       passwordConfirm: "",
  //       username: "",
  //     };
  //     setErrors(newState);
  //     setFormError("");
  //     setFormData(newState);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!firstLoad.current) {
  //     setFormError("");
  //   }
  // }, [formData]);

  // useEffect(() => {
  //   firstLoad.current = false;

  /* <Form
              htmlFor="profileImg"
              label="Profile Image"
              value={formData.profileImg}
              onChange={(e) => handleInputChange(e, "profileImg")}
            /> */
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Sign up to start earning{" "}
          <span className="text-indigo-500">Thinkies!</span>
        </h1>

        <form method="post" className="space-y-6">
          {formError && (
            <div className="text-sm font-semibold text-center text-red-500">
              {formError}
            </div>
          )}

          <Form
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email}
          />

          <Form
            htmlFor="username"
            label="Username"
            value={formData.username}
            onChange={(e) => handleInputChange(e, "username")}
            error={errors?.username}
          />

          <Form
            htmlFor="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors?.password}
          />

          <Form
            htmlFor="passwordConfirm"
            label="Password Confirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={(e) => handleInputChange(e, "passwordConfirm")}
            error={errors?.passwordConfirm}
          />

          <button
            type="submit"
            value="signIn"
            className="w-full px-5 py-3 bg-indigo-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 font-medium hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
