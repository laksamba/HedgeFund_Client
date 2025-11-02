import React from 'react'
import Navbar from '../components/Layout/Navbar'
import Sidebar from '../components/Layout/Sidebar'
import HomeUI from '../components/InvesterUi/HomeUI'
import Market from '../components/InvesterUi/Market'
import Portfolio from '../components/InvesterUi/Portfolio'


const InvesterDashboard :React.FC = () => {
  return (
    <div>
        <Navbar/>
      
        <Sidebar home={<HomeUI/>} market={<Market/>} portfolio={<Portfolio/>}/>
    </div>
  )
}

export default InvesterDashboard