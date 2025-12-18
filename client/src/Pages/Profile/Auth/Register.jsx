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
      if(data.message=='fill'){
        return toast.error('fill all fields',{
          position: toast.POSITION.TOP_CENTER

        })
      }
    
      if(data.message=='email already exists'){
         return toast.error('email already exists',{
          position: toast.POSITION.TOP_CENTER
        })
      }
      if(data.message=='invalid email'){
        return toast.error('invalid email',{
         position: toast.POSITION.TOP_CENTER
       })
     }
     if(data.message=='less'){
      return toast.error('password must have at least 6',{
       position: toast.POSITION.TOP_CENTER
     })
   }
      return toast.success('successfully registered',{
        position: toast.POSITION.TOP_CENTER
      })
    })
  }
  return (
    <Master>
       <div className='bg-card p-2 rounded mt-4 ' style={{width:'600px',margin:'auto'}}>
       <h2 className='text-white text-center' >Register</h2>
       
       <div className="form-group m-4 ">
            <label htmlFor="name" >Name</label>
            <input type="text"  id="name"  className='form-control ' onChange={e=>setName(e.target.value)} required/>
            <label htmlFor="email" >Email</label>
            <input type="email"  id="email"  className='form-control' onChange={e=>setEmail(e.target.value)} required/>
            <label htmlFor="password" >Password</label>
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