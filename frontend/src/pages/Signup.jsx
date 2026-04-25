import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const signupUser = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in|org|net|edu)$/;

    if (!name || !email || !password || !confirmPassword) {
      showPopup("Please fill all fields");
      return;
    }

    if (!emailPattern.test(email)) {
      showPopup("Enter a valid email (example: name@gmail.com)");
      return;
    }

    if (password.length < 6) {
      showPopup("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      showPopup("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "https://internscan-2.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        },
      );

      showPopup(res.data.message, "success");
      setTimeout(() => navigate("/login"), 1500);
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
        <h2>Create Account</h2>

        <form onSubmit={signupUser}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
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

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Create Account</button>
        </form>

        <div className="auth-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
