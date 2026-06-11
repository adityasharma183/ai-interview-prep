import { useRef, useState, useEffect } from "react";
import "../styles/Home.scss";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";

// ─── Icon helper ─────────────────────────────────────────────────────────────

function Icon({ name, size, className = "" }) {
  return (
    <i
      className={`ti ti-${name} ${className}`}
      aria-hidden="true"
      style={size ? { fontSize: size } : undefined}
    />
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="navbar">
      <span className="navbar__logo">InterviewAI</span>

      {["Dashboard", "Practice", "Reports"].map((item) => (
        <button
          key={item}
          className={`navbar__link${item === "Dashboard" ? " navbar__link--active" : ""}`}
        >
          {item}
        </button>
      ))}

      <div className="navbar__actions">
        <button className="navbar__icon-btn" aria-label="Notifications">
          <Icon name="bell" />
        </button>
        <button className="navbar__icon-btn" aria-label="Account">
          <Icon name="user-circle" />
        </button>
      </div>
    </nav>
  );
}

// ─── Job Description Panel ───────────────────────────────────────────────────

function JobDescriptionPanel({ value, onChange, charCount }) {
  return (
    <div className="jd-panel">
      <div className="field-label">
        <Icon name="file-text" />
        <span>Job Description</span>
        <span className="badge badge--required">Required</span>
      </div>

      <div className="card">
        <textarea
          className="textarea textarea--jd"
          value={value}
          onChange={onChange}
          placeholder="Paste the role requirements, skills, and company culture descriptions here..."
          maxLength={5000}
        />
        <p className="jd-panel__char-count">Character count: {charCount} / 5000</p>
      </div>
    </div>
  );
}

// ─── Resume Upload ───────────────────────────────────────────────────────────

function ResumeUpload({ file, onFileChange, onRemove }) {
  const inputRef = useRef(null);

  return (
    <div className="upload-section">
      <div className="field-label">
        <Icon name="file-upload" />
        <span>Upload Resume</span>
        <span className="badge badge--best">Best Results</span>
      </div>

      {file ? (
        <div className="card card--focused resume-preview">
          <div className="resume-preview__info">
            <Icon name="file-type-pdf" className="resume-preview__pdf-icon" />
            <span className="resume-preview__name">{file.name}</span>
          </div>
          <button className="btn btn--remove" onClick={onRemove}>
            Remove
          </button>
        </div>
      ) : (
        <label className="dropzone" onClick={() => inputRef.current?.click()}>
          <span className="dropzone__icon">
            <Icon name="cloud-upload" size="28px" />
          </span>
          <p className="dropzone__title">Click to upload or drag &amp; drop</p>
          <p className="dropzone__subtitle">PDF or DOCX (Max 5MB)</p>
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        hidden
        onChange={onFileChange}
      />
    </div>
  );
}

// ─── Self Description Panel ──────────────────────────────────────────────────

function SelfDescriptionPanel({ value, onChange }) {
  return (
    <div className="self-description">
      <div className="field-label">
        <Icon name="user-scan" />
        <span>Quick Self-Description</span>
      </div>

      <div className="card">
        <textarea
          className="textarea textarea--self"
          value={value}
          onChange={onChange}
          placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
        />
      </div>
    </div>
  );
}

// ─── Info Box ────────────────────────────────────────────────────────────────

function InfoBox() {
  return (
    <div className="info-box">
      <span className="info-box__icon">
        <Icon name="info-circle" />
      </span>
      <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
    </div>
  );
}

// ─── Recent Reports Section ──────────────────────────────────────────────────

function RecentReports({ reports, onReportClick }) {
  if (!reports || reports.length === 0) return null;
  
  return (
    <section className="recent-reports">
      <h2>My Recent Interview Plans</h2>
      <ul className="reports-list">
        {reports.map((report) => (
          <li 
            key={report._id} 
            className="report-item" 
            onClick={() => onReportClick(report._id)}
          >
            <h3>{report.title || 'Untitled Position'}</h3>
            <p className="report-meta">
              Generated on {new Date(report.createdAt).toLocaleDateString()}
            </p>
            <p className={`match-score ${
              report.matchScore >= 80 ? 'score--high' : 
              report.matchScore >= 60 ? 'score--mid' : 
              'score--low'
            }`}>
              Match Score: {report.matchScore}%
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="page-footer">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Help Center</a>
    </footer>
  );
}

// ─── Loading Screen ──────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <main className="loading-screen">
      <div className="loading-content">
        <Icon name="loader-2" className="spin" size="48px" />
        <h1>Creating Your Interview Plan...</h1>
        <p>Our AI is analyzing the job requirements and your profile</p>
      </div>
    </main>
  );
}

// ─── Home (Main Component) ───────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const resumeInputRef = useRef(null);
  
  // State for form inputs
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  
  // Use the interview hook
  const { loading, generateReport, reports } = useInterview();

  const handleJDChange = (e) => setJobDescription(e.target.value);
  const handleSelfChange = (e) => setSelfDescription(e.target.value);
  
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      if (file.size <= 5 * 1024 * 1024) {
        setResumeFile(file);
      } else {
        alert('File size exceeds 5MB limit');
      }
    } else {
      alert('Please upload a PDF or DOCX file');
    }
  };
  
  const handleResumeRemove = () => {
    setResumeFile(null);
    if (resumeInputRef.current) {
      resumeInputRef.current.value = '';
    }
  };
  
  const handleGenerateReport = async () => {
    // Validate at least one input is provided
    if (!jobDescription.trim() && !selfDescription.trim() && !resumeFile) {
      alert('Please provide at least a Job Description, Self Description, or Resume');
      return;
    }
    
    try {
      const result = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile
      });
      
      // Navigate to the interview report page
      if (result && result._id) {
        // Small delay to ensure loading state is visible
        setTimeout(() => {
          navigate(`/interview/${result._id}`);
        }, 100);
      } else if (result && result.data && result.data._id) {
        setTimeout(() => {
          navigate(`/interview/${result.data._id}`);
        }, 100);
      } else {
        console.error('Report ID not found in response:', result);
        alert('Report generated but could not redirect. Please check your reports page.');
      }
    } catch (err) {
      console.error('Generation failed:', err);
      alert(`Failed to generate report: ${err.message || 'Unknown error'}`);
    }
  };

  const isDisabled = !jobDescription.trim() && !selfDescription.trim() && !resumeFile;

  // Show loading screen while generating
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="home-page">
      {/* Page Header */}
      <header className="page-header">
        <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
        <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
      </header>

      {/* Main Card */}
      <div className="interview-card">
        <div className="interview-card__body">
          
          {/* Left Panel - Job Description */}
          <div className="panel panel--left">
            <div className="panel__header">
              <span className="panel__icon">
                <Icon name="file-text" />
              </span>
              <h2>Target Job Description</h2>
              <span className="badge badge--required">Required</span>
            </div>
            <textarea
              onChange={handleJDChange}
              value={jobDescription}
              className="panel__textarea"
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <div className="char-counter">{jobDescription.length} / 5000 chars</div>
          </div>

          {/* Vertical Divider */}
          <div className="panel-divider" />

          {/* Right Panel - Profile */}
          <div className="panel panel--right">
            <div className="panel__header">
              <span className="panel__icon">
                <Icon name="user-circle" />
              </span>
              <h2>Your Profile</h2>
            </div>

            {/* Upload Resume */}
            <div className="upload-section">
              <label className="section-label">
                Upload Resume
                <span className="badge badge--best">Best Results</span>
              </label>
              {resumeFile ? (
                <div className="resume-preview">
                  <div className="resume-preview__info">
                    <Icon name="file-type-pdf" className="resume-preview__pdf-icon" />
                    <span className="resume-preview__name">{resumeFile.name}</span>
                  </div>
                  <button className="btn btn--remove" onClick={handleResumeRemove}>
                    Remove
                  </button>
                </div>
              ) : (
                <label className="dropzone" onClick={() => resumeInputRef.current?.click()}>
                  <span className="dropzone__icon">
                    <Icon name="cloud-upload" size="28px" />
                  </span>
                  <p className="dropzone__title">Click to upload or drag &amp; drop</p>
                  <p className="dropzone__subtitle">PDF or DOCX (Max 5MB)</p>
                </label>
              )}
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.docx"
                hidden
                onChange={handleResumeChange}
              />
            </div>

            {/* OR Divider */}
            <div className="or-divider"><span>OR</span></div>

            {/* Quick Self-Description */}
            <div className="self-description">
              <label className="section-label" htmlFor="selfDescription">Quick Self-Description</label>
              <textarea
                onChange={handleSelfChange}
                value={selfDescription}
                id="selfDescription"
                className="panel__textarea panel__textarea--short"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            {/* Info Box */}
            <InfoBox />
          </div>
        </div>

        {/* Card Footer */}
        <div className="interview-card__footer">
          <span className="footer-info">AI-Powered Strategy Generation • Approx 30s</span>
          <button
            onClick={handleGenerateReport}
            disabled={isDisabled || loading}
            className="generate-btn"
          >
            {loading ? (
              <>
                <Icon name="loader-2" className="spin" />
                Generating...
              </>
            ) : (
              <>
                <Icon name="sparkles" />
                Generate My Interview Strategy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recent Reports List */}
      <RecentReports 
        reports={reports} 
        onReportClick={(id) => navigate(`/interview/${id}`)} 
      />

      {/* Page Footer */}
      <Footer />
    </div>
  );
}