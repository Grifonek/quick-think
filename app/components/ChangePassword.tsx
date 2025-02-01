import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Form from "./Form";

interface ActionData {
  errors?: {
    currentPassword?: string;
    newPassword?: string;
    passwordConfirm?: string;
  };
  error?: string;
  fields?: {
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  };
}

interface ChangePasswordProps {
  actionData?: ActionData;
}

function ChangePassword({ actionData }: ChangePasswordProps) {
  const [errors] = useState(actionData?.errors || {});
  const [formError] = useState(actionData?.error || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  function handleSubmit() {
    setIsSubmitting(true);
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-medium text-gray-300 mb-4">
        Change Password
      </h2>

      <form method="post" className="space-y-6" onSubmit={() => handleSubmit()}>
        {formError && (
          <div className="text-sm font-semibold text-center text-red-500">
            {formError}
          </div>
        )}

        <div className="relative">
          <Form
            htmlFor="currentPassword"
            label="Current Password"
            value={formData.currentPassword}
            onChange={(e) => handleInputChange(e, "currentPassword")}
            error={errors?.currentPassword}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-11 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeIcon className="size-6" />
            ) : (
              <EyeSlashIcon className="size-6" />
            )}
          </button>
        </div>

        <Form
          htmlFor="newPassword"
          label="New Password"
          value={formData.newPassword}
          onChange={(e) => handleInputChange(e, "newPassword")}
          error={errors?.newPassword}
          type={showPassword ? "text" : "password"}
        />

        <Form
          htmlFor="confirmNewPassword"
          label="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={(e) => handleInputChange(e, "confirmNewPassword")}
          error={errors?.passwordConfirm}
          type={showPassword ? "text" : "password"}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            isSubmitting && "cursor-not-allowed bg-indigo-700"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
