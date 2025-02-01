import { useNavigate } from "@remix-run/react";

function GoBack({ purpose = "error" }: { purpose?: string }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const buttonStylesError = {
    padding: "12px 24px",
    backgroundColor: "#dc2626",
    color: "#fff",
    fontSize: "1.125rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "0.5rem",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    animation: "bounce 1s infinite",
    outline: "none",
  };

  const buttonStylesNormal = {
    padding: "12px 24px",
    backgroundColor: "transparent",
    color: "#60a5fa",
    fontSize: "1.125rem",
    fontWeight: "600",
    border: "2px solid #60a5fa",
    borderRadius: "0.5rem",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <button
      onClick={goBack}
      style={purpose === "error" ? buttonStylesError : buttonStylesNormal}
    >
      Go Back
    </button>
  );
}

export default GoBack;
