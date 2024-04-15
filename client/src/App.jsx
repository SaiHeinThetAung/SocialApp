import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import {ToastContainer} from 'react-toastify'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
const App = () => {
  return (
   <>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
       </Routes>
       <ToastContainer
          autoClose={1000}
        />
   </>
  )
}

export default App
