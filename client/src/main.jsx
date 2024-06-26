import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '../src/style/style.css'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
axios.defaults.baseURL='http://localhost:4000/authApi'
axios.defaults.withCredentials=true
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </React.StrictMode>,
)
