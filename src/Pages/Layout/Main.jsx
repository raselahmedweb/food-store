import React from 'react'
import Navbar from '../../Components/Slider/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function Main() {
  return (
    <>
      <Navbar />
      <div className=' min-h-[calc(100vh-580px)] flex flex-col justify-center items-center'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
