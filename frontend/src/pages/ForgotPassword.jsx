import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in|org|net|edu)$/;

    if (!email) return showPopup("Please enter your email");
    if (!emailPattern.test(email)) return showPopup("Enter a valid email");

    setLoading(true);

    try {
      const response = await fetch(
        "https://internscan-2.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        showPopup(
          data.message || "Reset link sent! Check your email",
          "success",
        );

        // Redirect to reset password page after short delay
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1500);
      } else {
        showPopup(data.error || "Email not registered");
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
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
