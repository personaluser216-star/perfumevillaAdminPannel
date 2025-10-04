import React from 'react'
import {assets} from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
   <div className='fixed top-0 left-0 w-full flex items-center justify-between py-2 px-[4%] bg-[#f8f7f4] z-50 shadow-md'>
    <img src={assets.logo} alt="" className='md:h-20 h-16' />
    <button 
        onClick={()=>setToken('')}
        className='bg-[#5b4f47] text-white px-4 py-1 sm:px-7 sm:py-2 md:mr-0 mr-12 hover:bg-[#473c35] transition-colors duration-200'>
        Logout
    </button>
</div>

  )
}

export default Navbar
