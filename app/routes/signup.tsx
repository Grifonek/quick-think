import { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import Form from "~/components/Form";
import { Layout } from "~/components/Layout";
import { register } from "~/utils/auth.server";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordsEquality,
} from "~/utils/validators.server";

export const action: ActionFunction = async ({ req }) => {
  const form = await req.formData();
  const email = form.get("email");
  const username = form.get("username");
  const password = form.get("password");
  const passwordConfirm = form.get("passwordConfirm");

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

  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    passwordConfirm: actionData?.fields?.passwordConfirm || "",
    username: actionData?.fields?.username || "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
    // profileImg: "default.jpg",
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    setFormData((form) => ({ ...form, [field]: e.target.value }));
  }

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        passwordConfirm: "",
        username: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, []);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign up to start earning{" "}
            <span className="text-indigo-500">Thinkies!</span>
          </h1>

          <form method="POST" className="space-y-4">
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
              {formError}
            </div>
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

            {/* <Form
              htmlFor="profileImg"
              label="Profile Image"
              value={formData.profileImg}
              onChange={(e) => handleInputChange(e, "profileImg")}
            /> */}

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
              className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
