import React from 'react'
import Login from '../Pages/Login/Login';
import User from '../Pages/User/User';
import Navbar from '../Components/navbar/Navbar';
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Admin from '../Pages/Admin/Admin';
// import Table from '../Components/table/table';
const Applayout = () => {
  const role = localStorage.getItem('role');
  const location = useLocation();
  return (<>
  {
    location.pathname === '/'? <></>:
    <Navbar />
  }

    <Routes>
      
      {(role != 'user' && role != 'admin' ) &&
        <Route element={<Login/>} path={'/'}/>
      }

      {(role === 'user') &&
      <Route element={<User/>} path={'/user'}/>}


      {(role === 'admin') &&
      <Route element={<Admin />} path={'/admin'}/>}
    </Routes>

</>)}

export default Applayout;
