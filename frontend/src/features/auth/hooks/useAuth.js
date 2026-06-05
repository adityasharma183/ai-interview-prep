import {useContext} from 'react'
import {AuthContext} from '../authContext'
import {registerUser, loginUser,logoutUser,getMe} from '../services/authApi'

import {useEffect} from 'react'

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    const handleLogin = async ({email, password}) => {
        setLoading(true)
        try {
            const data = await loginUser({email, password})
            setUser(data.user)
        } catch (error) {
            console.error('Login error:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async ({username, email, password}) => {
        setLoading(true)
        try {
            const data = await registerUser({username, email, password})
            setUser(data.user)
        } catch (error) {
            console.error('Registration error:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logoutUser()
            setUser(null)
        } catch (error) {
            console.error('Logout error:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const fetchCurrentUser = async () => {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            console.error('Fetch user error:', error)
            setUser(null) // Clear user on error (e.g., not authenticated)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (error) {
                console.error('Error fetching user:', error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return {
        user,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        fetchCurrentUser
    }
}

  