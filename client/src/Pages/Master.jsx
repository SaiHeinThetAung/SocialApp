import React from 'react'
import { AuthComponent } from './AuthComponent'

const Master = (props) => {
  return (
   
         <div className="mt-2 ">
  <div className="row" >
    <div className="col-9" style={{position:"sticky",top:0,left:0}}>
      <h2 className="text-primary bg-card p-2 pl-5 ms-5 rounded">
        Blogging Beyond Border  -{" "}
        <span className="text-success">UTYCC</span>
      </h2>
      {props.children}
      {/* first blog */}
      </div>
      <div className="col-3 " style={{position:"fixed",top:0,right:0}} >
        <AuthComponent/>
      <div className="bg-card p-2 mt-2">
        <h5 className="text-primary">Tags</h5>
        <span className="btn btn-sm btn-dark mt-1">နည်းလမ်းများ </span>
        <span className="btn btn-sm btn-dark mt-1">Tutorial </span>
        <span className="btn btn-sm btn-dark mt-1">Summernote </span>
        <span className="btn btn-sm btn-dark mt-1">Tricks </span>
        <span className="btn btn-sm btn-dark mt-1">web design </span>
        <span className="btn btn-sm btn-dark mt-1">blogs </span>
        <span className="btn btn-sm btn-dark mt-1">articles </span>
      </div>
      {/* <div className="bg-card p-3 mt-4">
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
      </div> */}
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
      {/* <div className="bg-card p-3 mt-4">
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
      </div> */}
    </div>
  </div>
    </div>
  
  )
}

export default Master
