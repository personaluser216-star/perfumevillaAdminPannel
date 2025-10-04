import React, { useEffect, useState } from 'react'
import Navbar from './Componets/Navbar'
import SideBar from './Componets/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddProduct from "./Pages/AddProduct"
import ListProduct from "./Pages/ListProduct"

import Login from './Componets/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import EditProduct from './Pages/EditProduct'
import ProductDetails from './Pages/ProductDetails'
import AllOrder from "./Pages/AllOrder"
import Dashboard from './Pages/Dashboard'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):"")

  useEffect(()=>
  {
    localStorage.setItem('token',token)

  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <BrowserRouter>
            <Navbar setToken={setToken}/>
            <hr />
            <div className='flex w-full'>
              <SideBar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/add' element={<AddProduct token={token} />} />
                  <Route path='/list' element={<ListProduct token={token}/>} />
          <Route path="/edit/:id" element={<EditProduct token={token} />} />
<Route path='/productDetails/:id' element={<ProductDetails token={token}/>}/>

  <Route path="/order" element={<AllOrder token={token} />} />
  <Route path="/placed-order" element={<AllOrder token={token} />} />
  <Route path="/packing-order" element={<AllOrder token={token} />} />
  <Route path="/shipped-order" element={<AllOrder token={token} />} />
  <Route path="/out-of-delivery-order" element={<AllOrder token={token} />} />
  <Route path="/delivered-order" element={<AllOrder token={token} />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        )
      }
    </div>
  )
}

export default App
