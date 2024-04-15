import React from 'react'
import { Link } from 'react-router-dom'

const Master = (props) => {
  return (
   
         <div className="m-5 ">
  <div className="row">
    <div className="col-9">
      <h2 className="text-primary bg-card p-2 pl-5 ms-5 rounded">
        Community Blogging App  -{" "}
        <span className="text-success">MM</span>
      </h2>
      {props.children}
      {/* first blog */}
      </div>
      <div className="col-3">
      <div className="bg-card p-3">
     
      <Link to={'/login'}>
       <span className="btn btn-primary m-2">
          Login
        </span>
       </Link>
       <Link to={'/register'}>
       <span href="" className="btn btn-primary">
          Register
        </span>
       </Link>
      </div>
      <div className="bg-card p-3 mt-4">
        <h5 className="text-primary">Tags</h5>
        <span className="btn btn-sm btn-dark mt-1">နည်းလမ်းများ </span>
        <span className="btn btn-sm btn-dark mt-1">Tutorial </span>
        <span className="btn btn-sm btn-dark mt-1">Tips </span>
        <span className="btn btn-sm btn-dark mt-1">Summernote </span>
        <span className="btn btn-sm btn-dark mt-1">Tricks </span>
        <span className="btn btn-sm btn-dark mt-1">web dev </span>
        <span className="btn btn-sm btn-dark mt-1">web design </span>
        <span className="btn btn-sm btn-dark mt-1">blogs </span>
        <span className="btn btn-sm btn-dark mt-1">articles </span>
      </div>
      <div className="bg-card p-3 mt-4">
        <h5 className="text-primary">Programming</h5>
        <span className="btn btn-sm btn-dark mt-1">PHP </span>
        <span className="btn btn-sm btn-dark mt-1">Laravel </span>
        <span className="btn btn-sm btn-dark mt-1">React JS </span>
        <span className="btn btn-sm btn-dark mt-1">VueJS </span>
        <span className="btn btn-sm btn-dark mt-1">Jquery </span>
        <span className="btn btn-sm btn-dark mt-1">Bootstrap </span>
        <span className="btn btn-sm btn-dark mt-1">web design </span>
        <span className="btn btn-sm btn-dark mt-1">blogs </span>
        <span className="btn btn-sm btn-dark mt-1">articles </span>
      </div>
      <div className="bg-card p-3 mt-4">
        <h5 className="text-primary"> Top Trending Articles</h5>
        <div className="row">
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card p-3 mt-4">
        <h5 className="text-primary"> Most Love Articles</h5>
        <div className="row">
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-dark rounded">
              <img
                src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                className="w-100 rounded"
              />
              <p className="text-white text-center p-2">What is PHP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  
  )
}

export default Master
