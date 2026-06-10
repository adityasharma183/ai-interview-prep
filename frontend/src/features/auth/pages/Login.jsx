import React from 'react'
import './Login.scss'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { loading, login } = useAuth()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ email, password })
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="login-page">

      {/* ── Brand ── */}
      <div className="login-brand">
        <div className="login-brand__icon-wrap">
          <i className="ti ti-brain" aria-hidden="true" />
        </div>
        <span className="login-brand__name">InterviewAI</span>
      </div>

      {/* ── Card ── */}
      <div className="login-card">
        <h1 className="login-card__heading">Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="email">Email Address</label>
            <div className="input-group__field-wrap">
              <i className="ti ti-mail" aria-hidden="true" />
              <input
                className="input-group__field"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <div className="input-group__header">
              <label className="input-group__label" htmlFor="password">Password</label>
              <a href="#" className="input-group__forgot">Forgot password?</a>
            </div>
            <div className="input-group__field-wrap">
              <i className="ti ti-lock" aria-hidden="true" />
              <input
                className="input-group__field"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
            {!loading && <i className="ti ti-arrow-right" aria-hidden="true" />}
          </button>

        </form>

        {/* Divider */}
        <div className="login-divider">
          <span className="login-divider__line" />
          <span className="login-divider__text">OR CONTINUE WITH</span>
          <span className="login-divider__line" />
        </div>

        {/* Social buttons — UI only, handlers wired in Hook layer */}
        <div className="login-socials">
          <button className="btn-social" type="button">
            <i className="ti ti-brand-google" aria-hidden="true" />
            Google
          </button>
          <button className="btn-social" type="button">
            <i className="ti ti-brand-github" aria-hidden="true" />
            GitHub
          </button>
        </div>

        <p className="login-card__footer-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>

      {/* ── Footer ── */}
      <footer className="login-footer">
        <span className="login-footer__tagline">Secure AI-Enhanced Assessment Platform</span>
        <nav className="login-footer__links">
          <a href="#" className="login-footer__link">Privacy Policy</a>
          <a href="#" className="login-footer__link">Terms of Service</a>
        </nav>
      </footer>

    </div>
  )
}

export default Login

