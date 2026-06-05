import React,{useState} from 'react'
import '../authForm.scss'
import { useNavigate,Link } from 'react-router'
import {useAuth} from '../hooks/useAuth'



const  Login = () => {
    const navigate = useNavigate()
    const {loading,login} = useAuth()
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")

    

    const handleSubmit = async (e) => {
    e.preventDefault()
   await login({email,password})
   navigate('/')
}

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <main>
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)}     type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login