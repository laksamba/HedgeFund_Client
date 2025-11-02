import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import InvesterDashboard from '../pages/InvesterDashboard'
import FundManger from '../pages/FundManger'


const AppRoutes: React.FC= () => {
  return (
    <Routes>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/investerDashboard' element={<InvesterDashboard/>}/>
        <Route path='/managerDashboard' element={<FundManger/>}/>
    </Routes >
  )
}

export default AppRoutes