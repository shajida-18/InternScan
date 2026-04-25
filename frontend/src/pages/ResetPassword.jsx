import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const location = useLocation();
  const prefilledEmail = location.state?.email || "";

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });
  const [loading, setLoading] = useState(false);

  const showPopup = (msg, type = "error") => {
    setPopup({ show: true, message: msg, type });
    setTimeout(
      () => setPopup({ show: false, message: "", type: "error" }),
      3000,
    );
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !token || !newPassword)
      return showPopup("All fields are required");
    if (newPassword.length < 6)
      return showPopup("Password must be at least 6 characters");

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token, newPassword }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        showPopup(data.message || "Password reset successful", "success");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        showPopup(data.error || "Invalid token or email");
      }
    } catch (err) {
      showPopup("Server error. Try again later");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      {popup.show && (
        <div className={`popup-${popup.type}`}>{popup.message}</div>
      )}

      <div className="back-btn" onClick={() => navigate("/login")}>
        ← Back
      </div>

      <div className="auth-box">
        <h2>Reset Password</h2>

        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Reset Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
