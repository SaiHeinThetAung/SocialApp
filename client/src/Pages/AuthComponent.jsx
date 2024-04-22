import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa6";
import axios from 'axios';
export const AuthComponent = () => {
    const {authUser,setAuthUser}=useContext(AuthContext)
    const navigate=useNavigate()
    const logout=()=>{
      axios.post('/logout').then(data=>{
        if(data.data=='success'){
          setAuthUser(false)
          navigate('/login')
          
        }
      })
    }
  return (
    <div>
        
      {authUser &&
        <div className="bg-card p-2">
     
        <Link to={'/profile'}>
        <span className="btn btn-primary m-2 ">
            <div >
            <FaUserShield style={{fontSize:'large'}}/>
             {/* {authUser.name} */}
            </div>
        </span>
        </Link>
        
        <button onClick={logout} className="btn btn-primary ">
            Logout
        </button>
        
 </div>
      }
       {!authUser &&
        <div className="bg-card p-2">
     
        <Link to={'/login'}>
        <span className="btn btn-primary m-1">
            login
        </span>
        </Link>
        <Link to={'/register'}>
        <span href="" className="btn btn-primary m-1">
            Register
        </span>
        </Link>
 </div>
      }
        
       
    </div>
  )
}
