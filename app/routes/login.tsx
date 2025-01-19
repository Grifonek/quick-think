import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import LogIn from "~/components/LogIn";
import { getUser, login } from "~/utils/auth.server";
import { validateEmail, validatePassword } from "~/utils/validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  // getting form data
  const form = await request.formData();

  const email = form.get("email");
  const password = form.get("password");

  // validating form data
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  // if error in errors, error
  if (Object.values(errors).some(Boolean))
    return Response.json(
      {
        errors,
        fields: { email, password },
      },
      { status: 400 }
    );

  // login
  return await login({ email, password });
};

function Login() {
  const actionData = useActionData();

  return <LogIn actionData={actionData} />;
}

export default Login;
