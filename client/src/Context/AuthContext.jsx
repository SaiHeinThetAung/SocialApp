import axios from 'axios'
import  { createContext, useEffect, useState } from 'react'
const AuthContext=createContext()

export const AuthContextProvider = ({children}) => {
  const [authUser,setAuthUser]=useState(false)
  useEffect(()=>{
    axios.get('/checkAuth').then(({data})=>{
      if(data=='not auth'){
       return setAuthUser(false)
      }
      setAuthUser(data)
    })
  }
,[])
  return (
    <AuthContext.Provider value={{authUser,setAuthUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
