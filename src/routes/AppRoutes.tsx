import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import LandingPage from '../pages/LandingPage'

const AppRoutes: React.FC= () => {
  return (
    <Routes>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/' element={<LandingPage/>}/>
    </Routes>
  )
}

export default AppRoutes