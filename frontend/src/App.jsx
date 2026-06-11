import {RouterProvider, Routes, Route} from 'react-router-dom'
import {router} from './AppRouter'
import {AuthProvider} from './features/auth/authContext'
import { InterviewProvider } from './features/interview/interviewContext.jsx'

function App() {
  

  return (
    <AuthProvider>

      <InterviewProvider><RouterProvider router={router}/>
        
      
      </InterviewProvider>
      
    </AuthProvider>
  )
}

export default App
