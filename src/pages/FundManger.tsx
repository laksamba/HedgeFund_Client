import React from 'react'
import Sidebar from '../components/Layout/Sidebar'
import Home from '../components/managerUi/Home'
import Navbar from '../components/Layout/Navbar'
import Market from '../components/InvesterUi/Market'

const FundManger : React.FC = () => {
  return (
    <div>
        <Navbar/>
        <Sidebar home={<Home />} market={<Market/>} />
    </div>
  )
}

export default FundManger