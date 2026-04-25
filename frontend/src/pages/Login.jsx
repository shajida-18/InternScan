import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const showPopup = (msg, type = "error") => {
    setPopup({ show: true, message: msg, type });
    setTimeout(
      () => setPopup({ show: false, message: "", type: "error" }),
      3000,
    );
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showPopup("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(
        "https://internscan-2.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );
      showPopup(res.data.message, "success");

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed";

      showPopup(msg);
    }
  };

  return (
    <div className="auth-container">
      {popup.show && (
        <div className={`popup-${popup.type}`}>{popup.message}</div>
      )}

      <div className="back-btn" onClick={() => navigate("/landing")}>
        ← Back
      </div>

      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="auth-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create Account</span>
        </div>

        <div className="auth-link" style={{ marginTop: "8px" }}>
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
