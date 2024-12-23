import isEmail from "validator/lib/isEmail";

export const validateEmail = (email: string): string | undefined => {
  const isValid = isEmail(email);

  if (!isValid) return "Please enter a valid email!";
};

export const validatePassword = (password: string): string | undefined => {
  if (password.length < 8) {
    return "Please enter a password that is at least 8 characters long!";
  }
};

export const validatePasswordsEquality = (
  password: string,
  passwordConfirm: string
): string | undefined => {
  if (password !== passwordConfirm) return "Passwords are not equal!";
};

export const validateName = (name: string): string | undefined => {
  if (!name.length) return "Please enter a name!";
};
