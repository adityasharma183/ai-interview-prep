import {RouterProvider, Routes, Route} from 'react-router-dom'
import {router} from './AppRouter'
import {AuthProvider} from './features/auth/authContext'

function App() {
  

  return (
    <AuthProvider>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </AuthProvider>
  )
}

export default App
