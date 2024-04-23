import React, { useEffect, useState } from 'react'
import Master from './Master'
import Select from 'react-select'
import ReactQuill from 'react-quill';
import {  toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
export const Profile = () => {
  const [tag,setTag]=useState([])
  const [language,setLanguage]=useState([])
  const [title,setTitle]=useState('')
  const [image,setImage]=useState({})
  const [description,setDescription]=useState({})
  const [selectedTag,setSelectedTag]=useState([])
  const [selectedLanguage,setSelectedLanguage]=useState([])


   useEffect(()=>{
    axios.get('/auth/article/tag-language').then(d=>{
      setTag(d.data.tag)
      setLanguage(d.data.language)
    })
   },[])
    const nav=useNavigate()
    const back=()=>{
        nav('/')
    }
    const store=()=>{
      const formData=new FormData()
      formData.append('title',title)
      formData.append('image',image)
      formData.append('tags',JSON.stringify(selectedTag))
      formData.append('languages',JSON.stringify(selectedLanguage))
      formData.append('description',description)
      axios.post('/auth/article',formData).then((d)=>{
        
        if(d.data=='success'){
          return toast.success('article created')
        }
         return toast.error('worng')
      })
    }
  return (
    
    <Master>
        <div className='row'>
            <div className="col-12 mt-2 ">
            <button className='btn btn-dark'>Create Post</button>
            <button className='btn btn-dark'>Your Post</button>
            <button className='btn btn-dark'>Settings</button>
            <button className='btn btn-dark' onClick={back}>Back</button>

            </div>
            <div className="col-6 mt-2">
                <input type="text" className='form-control bg-dark' placeholder='title' onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div className="col-6 mt-2">
                <input type="file" className='form-control bg-dark' name='image' onChange={e=>setImage(e.target.files[0])}/>
            </div>
            <div className="col-6 mt-2">
            <Select options={tag} placeholder='choose tag' isMulti={true} onChange={data=>setSelectedTag(data)} />
            </div>
            <div className="col-6 mt-2">
            <Select options={language} placeholder='choose language' isMulti={true} onChange={data=>setSelectedLanguage(data)} />
            </div>
            <div className="col-12 mt-2">
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
            </div>
            <div style={{margin:'auto'}}>
            <span className="btn btn-primary m-3" onClick={store}>
            Create
        </span> 
              </div>    
           </div>

    </Master>
  )
}
