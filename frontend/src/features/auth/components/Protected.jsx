import {useAuth} from '../hooks/useAuth'
import {Navigate} from 'react-router-dom'

import React,{useEffect} from 'react'

const Protected = ({children}) => {
    const {user,loading} = useAuth()
   

    if(loading) {
        return <div>Loading...</div>
    }

    if(!user) {
        
        return <Navigate to="/login" />
        
    }   
  return children
}
export default Protected