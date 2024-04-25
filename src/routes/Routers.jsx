import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import RegisterCustomer from '../components/RegisterCustomer'
import TableDelivery from '../components/TableDelivery'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register-customer' element={<RegisterCustomer />}/>
        <Route path='/list-deliverys' element={<TableDelivery />} />
    </Routes>
  )
}

export default Routers