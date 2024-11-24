import React, { useEffect, useState } from "react";

interface FormProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function Form({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error = "",
}: FormProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        value={value}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errorText || ""}
      </div>
    </div>
  );
}

export default Form;
