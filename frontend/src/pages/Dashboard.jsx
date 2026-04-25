import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [stipend, setStipend] = useState("");
  const [fee, setFee] = useState("");

  const [percent, setPercent] = useState(0);
  const [barColor, setBarColor] = useState("green");
  const [result, setResult] = useState("");

  const [warnings, setWarnings] = useState([]);
  const [aiExplanation, setAiExplanation] = useState([]);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState("");

  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 3000);
  };

  const scanInternship = () => {
    let warningList = [];
    let aiNotes = [];
    let risk = 0;

    if (!company || !email || !desc || !stipend || !fee) {
      showPopup("Please fill all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showPopup("Enter valid company email like hr@company.com");
      return;
    }

    if (desc.length < 20) {
      showPopup("Description must be at least 20 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (fee === "yes") {
        risk += 40;
        warningList.push("Registration fee requested");
        aiNotes.push(
          "This internship asks for a registration fee which is commonly used in scams.",
        );
      }

      if (Number(stipend) > 50000) {
        risk += 25;
        warningList.push("Unusually high stipend");
        aiNotes.push("The stipend seems unusually high for an internship.");
      }

      const scamWords = [
        "registration fee",
        "security deposit",
        "training fee",
        "pay to join",
        "payment required",
        "earn instantly",
        "guaranteed job",
      ];

      for (let word of scamWords) {
        if (desc.toLowerCase().includes(word)) {
          risk += 25;
          warningList.push("Scam keywords detected");
          aiNotes.push(
            "The description contains phrases often used in scam job posts.",
          );
          break;
        }
      }

      const personalDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "protonmail.com",
      ];

      const domain = email.split("@")[1];

      if (personalDomains.includes(domain)) {
        risk += 15;
        warningList.push("Personal email domain");
        aiNotes.push(
          "The company is using a personal email domain instead of a corporate one.",
        );
      }

      const fakeNames = [
        "internship hub",
        "career booster",
        "job provider",
        "earn online",
        "work from home company",
      ];

      for (let name of fakeNames) {
        if (company.toLowerCase().includes(name)) {
          risk += 20;
          warningList.push("Suspicious company name");
          aiNotes.push(
            "The company name matches patterns often used in scam listings.",
          );
          break;
        }
      }

      let genuineScore = 100 - risk;
      if (genuineScore < 0) genuineScore = 0;

      setPercent(genuineScore);

      if (genuineScore > 70) setBarColor("green");
      else if (genuineScore > 40) setBarColor("orange");
      else setBarColor("red");

      if (genuineScore >= 60) {
        setResult("✅ Internship looks genuine");
        setSubmitEnabled(true);
        aiNotes.push("Overall analysis indicates low scam probability.");
      } else {
        setResult("⚠ Internship might be suspicious");
        setSubmitEnabled(false);
        aiNotes.push("Multiple scam indicators detected.");
      }

      setWarnings(warningList);
      setAiExplanation(aiNotes);

      setLoading(false);
    }, 1500);
  };

  /* ✅ FIXED FUNCTION */

  const goToResume = () => {
    if (!desc || desc.length < 20) {
      showPopup("Description too short");
      return;
    }

    const trimmedDesc = desc.slice(0, 1000); // 🔥 important fix

    localStorage.setItem("internshipDesc", trimmedDesc);

    navigate("/resume");
  };

  return (
    <div className="dashboard-page">
      {popup && <div className="popup">{popup}</div>}

      <header>
        <div className="back-btn" onClick={() => navigate("/landing")}>
          ←
        </div>
      </header>

      <div className="container">
        <div className="description">
          <h2>Internship Verification System</h2>
          <p>
            Enter internship details to verify if the opportunity is genuine.
          </p>
        </div>

        <div className="card">
          <h3>Internship Scanner</h3>

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Internship Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stipend"
            value={stipend}
            onChange={(e) => setStipend(e.target.value)}
          />

          <select value={fee} onChange={(e) => setFee(e.target.value)}>
            <option value="">Registration Fee Asked?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <button onClick={scanInternship} disabled={loading}>
            {loading ? "Scanning Internship..." : "Scan Internship"}
          </button>

          <div className="meter-box">
            <p>AI Genuine Score</p>

            <div className="circle-meter">
              <div
                className="circle-progress"
                style={{
                  background: `conic-gradient(${barColor} ${
                    percent * 3.6
                  }deg, #ddd 0deg)`,
                }}
              >
                <div className="circle-inner">
                  <span>{percent}%</span>
                </div>
              </div>
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="warnings">
              <h4>⚠ Risk Indicators</h4>
              <ul>
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {aiExplanation.length > 0 && (
            <div className="ai-panel">
              <h4>🧠 AI Analysis</h4>
              <ul>
                {aiExplanation.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={goToResume} disabled={!submitEnabled}>
            Continue to Resume Analyzer
          </button>

          <div className="result">{result}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
