import React, { useState } from 'react'
import Master from '../Master'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const register=()=>{
    axios.post('/register',{name,email,password}).then(({data})=>{
      if(data.message=='email already exists'){
         return toast.error('email already exists',{
          position: toast.POSITION.TOP_RIGHT
        })
      }
      return toast.success('successfully registered',{
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }
  return (
    <Master>
       <div className='bg-card p-2 '>
       <h2 className='text-white text-center' >Register</h2>
       
       <div className="form-group ">
            <label htmlFor="name" className='text-white'>Name</label>
            <input type="text"  id="name"  className='form-control ' onChange={e=>setName(e.target.value)} required/>
            <label htmlFor="email" className='text-white'>Email</label>
            <input type="email"  id="email"  className='form-control' onChange={e=>setEmail(e.target.value)} required/>
            <label htmlFor="password" className='text-white'>Password</label>
            <input type="password"  id="password"  className='form-control' onChange={e=>setPassword(e.target.value)} required/>
            <div className='text-center pt-3'> 
              <button className='btn-primary px-3 py-2 rounded' onClick={register}>register</button>
          </div>
        </div>
    
       </div>
    </Master>
  )
}

export default Register