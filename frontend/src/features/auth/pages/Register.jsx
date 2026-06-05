import React from 'react'
import '../authForm.scss'
import { useNavigate,Link } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'





const Register = () => {
    const navigate = useNavigate()
    const {loading,register} = useAuth()  
    const [username,setUsername] = React.useState("")
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")    

    const handleSubmit = async (e) => {
    e.preventDefault()
    await register({username,email,password})
    navigate('/')
}

 if(loading) {
    return <div>Loading...</div>
  }
  return (
    <main>
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" placeholder="Enter your username" />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>

            
        </div>
    </main>
  )
}

export default Register