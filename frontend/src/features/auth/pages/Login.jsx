import React from 'react'
import '../authForm.scss'
import { useNavigate,Link } from 'react-router-dom'

const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
}

const Login = () => {
    const navigate = useNavigate()
  return (
    <main>
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login