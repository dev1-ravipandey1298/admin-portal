import React, { useEffect, useState } from "react";
import pendingApproval from "/icons/pending_approval.png";
import showAll from "/icons/showAll.png";
import { useNavigate } from "react-router-dom";
import { NAVIGATE_PATH } from "../constants/routeConstant";

const Checker = ({ userDetails }) => {
  const count = 1;

  const navigate = useNavigate();

  const handlePendingRequests = () => {
    navigate(NAVIGATE_PATH.CHECKER_PENDING_REQUEST)
  };

  const handleShowAllRequests = () => {
    navigate(NAVIGATE_PATH.CHECKER_SHOW_ALL)
  };

  useEffect(() => {
    const userLoggedIn = JSON.parse(sessionStorage.getItem("user"))
      if(userLoggedIn != null && userLoggedIn.role == "CHECKER"){
        navigate(NAVIGATE_PATH.CHECKER)
      }else if(userLoggedIn != null && userLoggedIn.role == "MAKER"){
        navigate(NAVIGATE_PATH.MAKER)
      }
  }, [])
  

  return (
    <>
      <div className="flex justify-center items-center h-[80vh] space-x-10">
        <div
          onClick={handlePendingRequests}
          className="relative h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
        >

          {/* {<span className="absolute -top-5 -right-5 h-12 w-12 rounded-full bg-red-400 flex justify-center items-center items">
            <span className="text-white font-semibold text-lg">
              {}
            </span>
          </span>} */}

          <span className="text-xl font-bold text-cyan-700">
            Pending requests
          </span>
          <img src={pendingApproval} alt="" />
          <button className="text-blue-600 text-sm font-medium">
            Click Here!{" "}
          </button>
        </div>
        <div
          onClick={handleShowAllRequests}
          className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
        >
          <span className="text-xl font-bold text-cyan-700">
            Show All Requests
          </span>
          <img src={showAll} alt="" />
          <button className="text-blue-600 text-sm font-medium">
            Click Here!{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Checker;
