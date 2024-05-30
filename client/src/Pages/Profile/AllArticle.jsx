import React, { useEffect, useState, useTransition } from 'react'
import axios from 'axios';
import { PageLoader } from '../../Components/PageLoader';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

const AllArticle = () => {
  const [page,setPage]=useState(1)
  const [article,setArticle]=useState([])
  const [loader,setLoader]=useState(true)
  const [totalPage,setTotalPage]=useState(null)
  const nav=useNavigate()
  useEffect(()=>{
    axios.get('/auth/article?page='+page).then(d=>{
      setLoader(false)
      setArticle(d.data.article)
      setTotalPage(d.data.totalPage)
    })
  }
  ,[page])

  return (
    <>
     {loader && <PageLoader/>}
     {!loader && (
      <div >

      <div className='row'>
       {article.map(ar=>(
         <div key={ar._id} className="col-12 mt-4 d-flex ml-7">
         <img src={"http://localhost:4000/images/" + ar.image} alt=""  width={'350px'} height={'200px'}/>
         <div className=' col-6  card bg-card'>
           
           <div className='ml-5 mt-2 '>
            <h5 className='text-success'>{ar.title}</h5>
             <h6 className='text-white'>like :{ar.like_count}</h6>
             <h6 className='text-white'>comment : {ar.comment_count}</h6>
             <h6 className='text-white'>view : {ar.view_count}</h6>
           </div>
           <div className='d-flex mt-4  ml-5'>
           <button className='btn btn-outline-white'> Detail</button>
           <Link to={`/article/edit/${ar._id}`}>
           <button  className='btn btn-outline-white'>Edit</button></Link>
           </div>

         </div>
       </div>
       ))}
      </div>
       {page>1 && (
        <div className=' text-center'>
          <div className='d-flex '>
          <button  className=' btn btn-dark mb-2 mt-2 '  onClick={()=>setPage(page-1)} style={{marginLeft:'400px'}}><FaArrowLeft />
</button>
             <button disabled={page<totalPage?false:true} className=' btn btn-primary mb-2 mt-2 mr-2 '  onClick={()=>setPage(page+1)} ><FaArrowRight />
</button>
      
            </div>     
          </div>              

       )}
        {page==1 && (
        <div>
             <button disabled={page<totalPage?false:true} className=' btn btn-primary mb-2 mt-2 '  onClick={()=>setPage(page+1)} style={{marginLeft:'450px'}}><FaArrowRight />
</button>
        </div>              

       )}
  </div>
     )}
    </>
  )
}

export default AllArticle