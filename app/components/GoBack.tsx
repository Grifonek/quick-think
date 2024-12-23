import { useNavigate } from "@remix-run/react";

function GoBack() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const buttonStyles = {
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

  return (
    <button onClick={goBack} style={buttonStyles}>
      Go Back
    </button>
  );
}

export default GoBack;
