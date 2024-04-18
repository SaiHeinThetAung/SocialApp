import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import {ToastContainer} from 'react-toastify'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import { AuthContextProvider } from './Context/AuthContext'
import { Profile } from './Pages/Profile'
import RedirectAuth from './Pages/RedirectNoAuth/RedirectAuth'
const App = () => {
  return (
   <>
       <AuthContextProvider>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={
          <RedirectAuth>
              <Profile/>
          </RedirectAuth>
          }/>

       </Routes>
       <ToastContainer autoClose={1000} />
       </AuthContextProvider>
   </>
  )
}

export default App
