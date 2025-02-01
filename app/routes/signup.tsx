import { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import Signup from "~/components/Signup";
import { register } from "~/utils/auth.server";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordsEquality,
} from "~/utils/validators.server";

export const action: ActionFunction = async ({ request }) => {
  // getting form data
  const form = await request.formData();

  const email = form.get("email")?.toString();
  const username = form.get("username")?.toString().toLowerCase();
  const password = form.get("password")?.toString();
  const passwordConfirm = form.get("passwordConfirm")?.toString();

  // validating form data
  const errors = {
    email: validateEmail(email!),
    password: validatePassword(password!),
    passwordConfirm: validatePasswordsEquality(password!, passwordConfirm!),
    username: validateName(username!),
  };

  // if error in errors, error
  if (Object.values(errors).some(Boolean))
    return Response.json(
      {
        errors,
        fields: { email, password, username, passwordConfirm },
      },
      { status: 400 }
    );

  // register
  return await register({ email, password, passwordConfirm, username });
};

function SignUp() {
  const actionData = useActionData();

  return <Signup actionData={actionData} />;
}

export default SignUp;
