import { useState } from "react";
import Form from "./Form";
import { Link } from "@remix-run/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

function Signup({ actionData }) {
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
        <p className="flex items-center justify-center space-x-2 mt-2">
          <ArrowUturnLeftIcon className="h-5 w-5 text-indigo-500 hover:text-indigo-700 transition-transform transform hover:-translate-x-1" />
          <Link
            to="/"
            className="text-indigo-500 font-medium hover:underline hover:text-indigo-700 transition duration-200"
          >
            Quick Think
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
