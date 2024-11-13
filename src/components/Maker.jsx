import React, { useEffect } from "react";
import showAll from "/icons/showAll.png";
import draft from "/icons/draft.png";
import approval_status from "/icons/approval_status.png";
import template from "/icons/template.png";
import { useNavigate } from "react-router-dom";
import { NAVIGATE_PATH } from "../constants/routeConstant";

const Maker = ({ userDetails }) => {
  const count = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = JSON.parse(sessionStorage.getItem("user"))
    if(userLoggedIn != null && userLoggedIn.role == "CHECKER"){
      navigate(NAVIGATE_PATH.CHECKER)
    }else if(userLoggedIn != null && userLoggedIn.role == "MAKER"){
      navigate(NAVIGATE_PATH.MAKER)
    }

  }, [])
  

  const handleCreateTemplate = () => {
    navigate(NAVIGATE_PATH.MAKER_CREATE_TEMPLATE)
  };

  const handleDraft = () => {
    navigate(NAVIGATE_PATH.MAKER_DRAFTS)
  };

  const handleShowAllRequest = () => {
    navigate(NAVIGATE_PATH.MAKER_SHOW_ALL)
  };

  const getAllDraftData = async () => {
    try {
      const response = await getAllTemplates();
      if (response.status == 200) {
        return response.data.payload.length
      }
    } catch (error) {

    }
  }


  return (
    <>    
    <div className="flex justify-center items-center h-[90vh] space-x-6 px-6">
      <div
        onClick={handleCreateTemplate}
        className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
      >
        <span className="text-xl font-bold text-cyan-700">
          Create Nudge Template
        </span>
        <img src={template} alt="" />
        <button className="text-blue-600 text-sm font-medium">
          Click Here!{" "}
        </button>
      </div>
      <div
        onClick={handleDraft}
        className="relative h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
      >
        {/* {(
          <span className="absolute -top-5 -right-5 h-12 w-12 rounded-full bg-red-400 flex justify-center items-center items">
            <span className="text-white font-semibold text-lg">
              {}
            </span>
          </span>
        )} */}
        <span className="text-xl font-bold text-cyan-700">Draft</span>
        <img src={draft} alt="" />
        <button className="text-blue-600 text-sm font-medium">
          Click Here!{" "}
        </button>
      </div>
      <div
        onClick={() => navigate(NAVIGATE_PATH.MAKER_ACTION_TEMPLATE)}
        className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
      >
        <span className="text-xl font-bold text-cyan-700 hover:cursor-pointer">
          Action Templates
        </span>
        <img src={approval_status} alt="" />
        <button className="text-blue-600 text-sm font-medium">
          Click Here!{" "}
        </button>
      </div>
      <div
        onClick={handleShowAllRequest}
        className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
      >
        <span className="text-xl font-bold text-cyan-700 hover:cursor-pointer">
          Search Requests
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

export default Maker;
