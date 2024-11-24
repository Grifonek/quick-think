import React, { useEffect, useRef, useState } from "react";
import Form from "~/components/Form";
import { Layout } from "~/components/Layout";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { validateEmail, validatePassword } from "~/utils/validators.server";
import { getUser, login } from "~/utils/auth.server";
import { useActionData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ req }) => {
  return (await getUser(req)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ req }) => {
  const form = await req.formData();
  const email = form.get("email");
  const password = form.get("password");

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(errors).some(Boolean))
    return Response.json(
      {
        errors,
        fields: { email, password },
      },
      { status: 400 }
    );

  return await login({ email, password });
};

function Login() {
  const actionData = useActionData();

  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
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
            Login to start earning{" "}
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
              htmlFor="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
              error={errors?.password}
            />

            <button
              type="submit"
              name="login"
              className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
