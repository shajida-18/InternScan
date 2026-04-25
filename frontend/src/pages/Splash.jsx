import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/landing");
    }, 3000);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="logo">INTERNSCAN</div>
      <div className="loading">Scan Internships. Secure Your Future.</div>
    </div>
  );
}

export default Splash;
