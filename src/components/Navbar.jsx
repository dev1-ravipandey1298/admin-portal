import React, { useEffect, useState } from "react";
import hdfc_logo from "/icons/hdfc_logo.png";
import { useNavigate } from "react-router-dom";
import { NAVIGATE_PATH } from "../constants/routeConstant";
import { userLogout } from "../services/templateService";
import hamburger from "/icons/hamburger.png"

const Navbar = () => {

    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        setIsDropdownOpen(false)
        logoutBackend();
    }

    const logoutBackend = async () => {
        try {
            const response = await userLogout();
            if(response.status == 200){
                sessionStorage.clear();
                navigate(NAVIGATE_PATH.LOGIN)
            }
        } catch (error) {
            sessionStorage.clear();
            navigate(NAVIGATE_PATH.LOGIN)
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const closeDropdown = (event) => {
        if (!event.target.closest('.dropdown')) {
            setIsDropdownOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
          document.removeEventListener('click', closeDropdown);
        };
      }, []);
    
    return (
        <>
        <div className="bg-blue-600 flex justify-between space-x-1">
            <div className="m-1 p-1 pb-1 mb-[0.4rem] flex items-center bg-blue-600 space-x-3">
                <img
                    src={hdfc_logo}
                    className="h-[1.85rem] w-7 pt-1 bg-blue-600"
                    alt=""
                />
                <p className="text-base font-bold text-[1.2rem] text-white">
                    Notification Admin Portal
                </p>
            </div>

            {sessionStorage.getItem("user") !== null && (
                <div className="dropdown relative flex items-center space-x-4 px-4">
                    <p className="text-white font-medium">
                        Welcome, {JSON.parse(sessionStorage.getItem("user")).name}
                    </p>
                    <div className="relative">
                        <button 
                            onClick={toggleDropdown} 
                        >
                            <img src={hamburger} className="h-10 mt-1" alt="" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0  w-52 bg-white text-nowrap font-semibold text-blue-800 rounded-sm shadow-lg">
                                <button 
                                    onClick={() => {navigate(NAVIGATE_PATH.CUG_USER); setIsDropdownOpen(false);}} 
                                    className="block border px-4 py-2 text-left w-full hover:bg-blue-100"
                                >
                                    CUG User Management
                                </button>
                                <button 
                                    onClick={handleLogout} 
                                    className="block border px-4 py-2 text-left w-full hover:bg-blue-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Navbar;
