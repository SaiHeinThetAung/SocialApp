import React, {  useContext, useState } from 'react'
import Master from '../Master'
import {  toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const Login = () => {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [loader,setLoader]=useState(false)
  const {setAuthUser}=useContext(AuthContext)
  const navigate=useNavigate()
  const login=()=>{
      setLoader(true)
      axios.post('/login',{email,password}).then(({data})=>{
        console.log(data.message);
        setLoader(false)
        if(data.message=='fill'){
          return toast.error('Please fill out all fields',{
            position: toast.POSITION.TOP_CENTER
          })
        }
        if(data.message=='invalid email'){
          return toast.error('invalid email',{
            position: toast.POSITION.TOP_CENTER
          })
        }
        if(data.message=='incorrect password'){
          return toast.error('wrong password',{
            position: toast.POSITION.TOP_CENTER,
          })
        }
        setAuthUser(data.data)
        navigate('/')
        return toast.success('Welcome '+ data.data.name,{
          position: toast.POSITION.TOP_CENTER,
        })

    })
  }

  return (
    <Master>
       <div className='bg-card p-2 rounded ' style={{width:'600px',margin:'auto'}}>
       <h2 className='text-white text-center' >Login</h2>
      
      
      <div className="form-group m-4">
              <label htmlFor="email" >Email</label>
              <input type="text" id='email' className='form-control' onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <div className="form-group m-4">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' className='form-control' onChange={e=>setPassword(e.target.value)} required/>
            </div>
            <div className='text-center'> 
            <button className='btn-primary px-3 py-2 rounded' disabled={loader} onClick={login}>
               {loader && 
                <>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
               }

              login
            </button>

            </div>
    
       
       </div>
    </Master>
  )
}

export default Login
