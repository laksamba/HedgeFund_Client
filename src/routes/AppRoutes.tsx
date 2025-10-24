import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'


const AppRoutes: React.FC= () => {
  return (
    <Routes>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes >
  )
}

export default AppRoutes