import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <div className=' ml-20'>
    <Sidebar/>
    </div>
     <Outlet/>
    </>
  )
}
