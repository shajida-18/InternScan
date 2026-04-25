import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header>
        <h1>InternScan</h1>

        <nav>
          <a onClick={() => navigate("/login")}>Login</a>
          <a onClick={() => navigate("/signup")}>Signup</a>
          <a onClick={() => navigate("/about")}>About</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Detect Fake Internships & Analyze Your Resume</h1>

        <p>
          InternScan helps students verify internship authenticity and match
          resumes with job requirements.
        </p>

        <button onClick={() => navigate("/login")}>Get Started</button>

        <div className="features">
          <div className="card">
            <h3>Fake Internship Detection</h3>
            <p>Identify suspicious internships quickly.</p>
          </div>

          <div className="card">
            <h3>Resume Analyzer</h3>
            <p>Check how well your resume matches the internship.</p>
          </div>

          <div className="card">
            <h3>Skill Suggestions</h3>
            <p>Learn the skills needed to get selected.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
