import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import React, { useRef, useState } from "react";
import Form from "~/components/Form";
import { getUser, login } from "~/utils/auth.server";
import { validateEmail, validatePassword } from "~/utils/validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
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

  // useEffect(() => {
  //   if (!firstLoad.current) {
  //     const newState = {
  //       email: "",
  //       password: "",
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
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Login to start earning{" "}
          <span className="text-indigo-500">Thinkies!</span>
        </h1>

        <form method="POST" className="space-y-6">
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
            className="w-full px-5 py-3 bg-indigo-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
