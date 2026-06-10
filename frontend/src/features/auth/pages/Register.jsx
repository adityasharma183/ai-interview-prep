import React from 'react'
import './Register.scss'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const { loading, register } = useAuth()
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await register({ username, email, password })
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="register-page">

      {/* ── Top Bar ── */}
      <header className="register-topbar">
        <Link to="/" className="register-topbar__logo">
          <i className="ti ti-brand-appgallery" aria-hidden="true" />
          InterviewAI
        </Link>
      </header>

      {/* ── Form ── */}
      <main className="register-main">
        <div className="register-card">
          <h1 className="register-card__heading">Register</h1>

          <form className="register-form" onSubmit={handleSubmit}>

            <div className="input-group">
              <label className="input-group__label" htmlFor="username">Username</label>
              <input
                className="input-group__field"
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-group__label" htmlFor="email">Email Address</label>
              <input
                className="input-group__field"
                id="email"
                name="email"
                type="email"
                placeholder="alex@company.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-group__label" htmlFor="password">Password</label>
              <input
                className="input-group__field"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn-register" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Register"}
            </button>

          </form>

          <p className="register-card__footer-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="register-footer">
        <span className="register-footer__logo">InterviewAI</span>
        <nav className="register-footer__links">
          {["Resources", "Privacy", "Terms"].map((item) => (
            <a key={item} href="#" className="register-footer__link">{item}</a>
          ))}
        </nav>
        <span className="register-footer__copy">© 2024 InterviewAI. All rights reserved.</span>
      </footer>

    </div>
  )
}

export default Register