import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { NAVIGATE_PATH } from '../constants/routeConstant';

const Header = () => {
    
const navigate = useNavigate();

useEffect(() => {
    const userLoggedIn = JSON.parse(sessionStorage.getItem("user"))
    userLoggedIn !== null ? userLoggedIn.role === "CHECKER" ? navigate(NAVIGATE_PATH.CHECKER) : navigate(NAVIGATE_PATH.MAKER) :  navigate(NAVIGATE_PATH.LOGIN)
  }, [])

  return (
    <>
        <Navbar/>
    </>
  )
}

export default Header