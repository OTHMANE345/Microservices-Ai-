import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Navbar from './header';





export default function DefaultLayout() {
   
  return (
    <>
 <Navbar/> 

<Outlet/>

</>
  )
}
