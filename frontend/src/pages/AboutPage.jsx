import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <header>
        <h1>InternScan</h1>

        <nav>
          <a onClick={() => navigate("/")}>Home</a>
          <a onClick={() => navigate("/login")}>Login</a>
          <a onClick={() => navigate("/signup")}>Signup</a>
        </nav>
      </header>

      <section className="about-hero">
        <h2>About InternScan</h2>

        <p>
          InternScan is a platform designed to help students detect fake
          internships and improve their chances of getting selected by analyzing
          resumes against internship requirements.
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <h3>🎯 Our Mission</h3>
          <p>
            Many students fall victim to fake internships or apply without
            knowing if their resume matches the job requirements. InternScan
            aims to protect students by verifying internships and providing
            intelligent resume analysis.
          </p>
        </div>

        <div className="about-card">
          <h3>🔍 Fake Internship Detection</h3>
          <p>
            Our system analyzes internship details like company information,
            email authenticity, descriptions, and other indicators to detect
            suspicious internships.
          </p>
        </div>

        <div className="about-card">
          <h3>📄 Resume Analyzer</h3>
          <p>
            Upload your resume and compare it with internship requirements to
            understand your skill match and get suggestions for improvement.
          </p>
        </div>

        <div className="about-card">
          <h3>🚀 Skill Suggestions</h3>
          <p>
            InternScan identifies missing skills and recommends what you should
            learn to improve your chances of getting selected.
          </p>
        </div>
      </section>

      <footer>
        <p>© 2026 InternScan | Built for students</p>
      </footer>
    </div>
  );
}

export default AboutPage;
