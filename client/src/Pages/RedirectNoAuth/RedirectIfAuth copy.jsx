import React, { Children, useContext} from 'react'
import AuthContext from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const RedirectIfAuth = ({children}) => {
    const {authUser,setAuthUser}=useContext(AuthContext)
  
    if(authUser){
        return <Navigate to={'/profile'}/>
    }
    return children;
  
}
export default RedirectIfAuth

