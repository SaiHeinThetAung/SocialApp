import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import CreateArticle from './Profile/CreateArticle';
import AllArticle from './Profile/AllArticle';
import Setting from './Profile/Setting';
import Master from './Master'
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
export const Profile = () => {
  const [type,setType]=useState('createArticle')    
  const nav=useNavigate()
  const back=()=>{
      nav('/')
  }
  return (
    
    <Master>
        <div className='row'>
            <div className="col-12 mt-2 ">
            <button onClick={()=>setType('createArticle')} className={`btn btn${type != "createArticle" ? "-outline text-dark" : "" }-primary `}>Create Post</button>
            <button onClick={()=>setType('allArticle')} className={`btn btn${
          type != "allArticle" ? "-outline text-dark" : ""
        }-primary `}>Your Post</button>
            <button onClick={()=>setType('setting')} className={`btn btn${
          type != "setting" ? "-outline text-dark" : ""
        }-primary `}>Settings</button>
            <button className=' btn btn-secondary' onClick={back}>Back</button>
            </div>
            {type=="createArticle" && <CreateArticle/>}
            {type=="allArticle" && <AllArticle/>}
            {type=="setting" && <Setting/>}

           </div>

    </Master>
  )
}
