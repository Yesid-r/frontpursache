import React from 'react'
import Routers from '../routes/Routers'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../components/Home'

const Layout = () => {
  return (
    <div>
        <Navbar />
        <Routers />
        {/* <Home/> */}
        <Footer />
    </div>
  )
}

export default Layout