import { useRef, useState } from "react";
import "../styles/Home.scss";

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
      </div>

      <div className="card">
        <textarea
          className="textarea textarea--jd"
          value={value}
          onChange={onChange}
          placeholder="Paste the role requirements, skills, and company culture descriptions here..."
        />
        <p className="jd-panel__char-count">Character count: {charCount}</p>
      </div>
    </div>
  );
}

// ─── Resume Upload ───────────────────────────────────────────────────────────

function ResumeUpload({ file, onFileChange, onRemove }) {
  const inputRef = useRef(null);

  return (
    <div>
      <div className="field-label">
        <Icon name="file-upload" />
        <span>Resume</span>
        <span className="resume-tip">Use Resume and selfDescription for best results</span>
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
        <div
          className="card card--dashed resume-dropzone"
          onClick={() => inputRef.current?.click()}
        >
          <button
            className="btn btn--upload"
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          >
            <Icon name="cloud-upload" />
            Upload Resume
          </button>
          <p className="resume-dropzone__hint">PDF, DOCX up to 10MB</p>
        </div>
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
    <div>
      <div className="field-label">
        <Icon name="user-scan" />
        <span>Self Description</span>
      </div>

      <div className="card">
        <textarea
          className="textarea textarea--self"
          value={value}
          onChange={onChange}
          placeholder="Briefly describe your career goals, key achievements, and what makes you a great candidate..."
        />
      </div>
    </div>
  );
}

// ─── Generate Button ─────────────────────────────────────────────────────────

function GenerateButton({ isDisabled, onClick }) {
  return (
    <button
      className="btn btn--generate"
      disabled={isDisabled}
      onClick={onClick}
    >
      Generate Interview Report
      <Icon name="sparkles" />
    </button>
  );
}

// ─── Stat Cards ──────────────────────────────────────────────────────────────

const STATS = [
  {
    icon: "history",
    iconMod: "default",
    labelMod: "default",
    label: "Recent Activity",
    value: 'Last practicing 2 days ago for "Senior PM Role"',
  },
  {
    icon: "trending-up",
    iconMod: "primary",
    labelMod: "primary",
    label: "Readiness Score",
    value: "Current estimated fit: 84% based on last session",
  },
  {
    icon: "bulb",
    iconMod: "amber",
    labelMod: "amber",
    label: "AI Insights",
    value: "3 new tips available for technical storytelling",
  },
];

function StatCards() {
  return (
    <div className="stat-cards">
      {STATS.map((s) => (
        <div key={s.label} className="stat-card">
          <div className="stat-card__icon-wrap">
            <Icon name={s.icon} className={`stat-card__icon--${s.iconMod}`} />
          </div>
          <div>
            <p className={`stat-card__label stat-card__label--${s.labelMod}`}>{s.label}</p>
            <p className="stat-card__value">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="footer__logo">InterviewAI</span>
        <span className="footer__copy">© 2024 InterviewAI. All rights reserved.</span>
      </div>
      <nav className="footer__links">
        {["Resources", "Privacy", "Terms"].map((link) => (
          <a key={link} href="#" className="footer__link">
            {link}
          </a>
        ))}
      </nav>
    </footer>
  );
}

// ─── Home (UI Layer) ─────────────────────────────────────────────────────────
// Local state here is temporary scaffolding for standalone use.
// When the Hook layer (useInterviewPrep) is ready, replace the
// useState calls below with the hook's returned values and handlers,
// and remove the four useState imports.

export default function Home({
  // Hook layer injects these once wired up.
  // Until then, internal state below keeps the fields editable.
  jobDescription: jobDescProp,
  selfDescription: selfDescProp,
  resumeFile: resumeFileProp,
  onJobDescriptionChange: onJDChangeProp,
  onSelfDescriptionChange: onSelfChangeProp,
  onResumeFileChange: onResumeChangeProp,
  onResumeRemove: onResumeRemoveProp,
  onGenerate: onGenerateProp,
}) {
  // ── Temporary local state (remove when hook layer is connected) ──
  const [jobDescription, setJobDescription] = useState(jobDescProp ?? "");
  const [selfDescription, setSelfDescription] = useState(selfDescProp ?? "");
  const [resumeFile, setResumeFile] = useState(resumeFileProp ?? null);

  const handleJDChange = onJDChangeProp ?? ((e) => setJobDescription(e.target.value));
  const handleSelfChange = onSelfChangeProp ?? ((e) => setSelfDescription(e.target.value));
  const handleResumeChange = onResumeChangeProp ?? ((e) => setResumeFile(e.target.files[0] ?? null));
  const handleResumeRemove = onResumeRemoveProp ?? (() => setResumeFile(null));
  const handleGenerate = onGenerateProp ?? (() => {});
  // ─────────────────────────────────────────────────────────────────

  const isDisabled =
    !jobDescription.trim() && !selfDescription.trim() && !resumeFile;

  return (
    <div className="home">
      <NavBar />

      <main className="main">
        <header className="page-header">
          <p className="page-header__eyebrow">AI-Powered Prep</p>
          <h1 className="page-header__title">Prepare for Success</h1>
          <p className="page-header__subtitle">
            Leverage our state-of-the-art AI to analyze your fit and practice the most
            relevant interview scenarios tailored to your target role.
          </p>
        </header>

        <div className="interview-grid">
          <div className="left-col">
            <JobDescriptionPanel
              value={jobDescription}
              onChange={handleJDChange}
              charCount={jobDescription.length}
            />
          </div>

          <div className="right-col">
            <ResumeUpload
              file={resumeFile}
              onFileChange={handleResumeChange}
              onRemove={handleResumeRemove}
            />
            <SelfDescriptionPanel
              value={selfDescription}
              onChange={handleSelfChange}
            />
            <GenerateButton isDisabled={isDisabled} onClick={handleGenerate} />
          </div>
        </div>

        <StatCards />
      </main>

      <Footer />
    </div>
  );
}