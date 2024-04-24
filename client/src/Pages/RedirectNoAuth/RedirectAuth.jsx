import React, { Children, useContext} from 'react'
import AuthContext from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const RedirectAuth = ({children}) => {
    const {authUser,setAuthUser}=useContext(AuthContext)
  
    if(authUser==false){
        return <Navigate to={'/login'}/>
    }
    return children;
  
}
export default RedirectAuth

