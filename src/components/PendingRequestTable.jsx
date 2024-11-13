import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import filter from '/icons/filter.png'
import PageHeader from './PageHeader';
import {getTemplatesBySearchCriteria } from '../services/templateService';
import { NAVIGATE_PATH } from '../constants/routeConstant';
import { status } from '../constants/statusConstant';

const PendingRequestTable = () => {

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [pendingRequestData, setPendingRequestData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: true,
    checkbox3: true
  });

  const getPendingRequest = async (searchCriteria) => {
    try {
     
      const response = await getTemplatesBySearchCriteria(searchCriteria);
      setPendingRequestData(response.data.payload)
    } catch (error) {
      
    }
  }

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [id]: checked
    }));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowFilter(false);
    }
  };

  const handleFetchData = async () => {
    setShowFilter(false)
    if((checkboxes.checkbox2 && checkboxes.checkbox3) || (!checkboxes.checkbox2 && !checkboxes.checkbox3)){
      const searchCriteria = {
        templateId : '',
        templateName : '',
        status : ["APPROVAL_PENDING_PROD", "APPROVAL_PENDING_CUG"]
      }
      getPendingRequest(JSON.stringify(searchCriteria))
    }else if(checkboxes.checkbox2){
      const searchCriteria = {
        templateId : '',
        templateName : '',
        status : ["APPROVAL_PENDING_PROD"]
      }
      getPendingRequest(JSON.stringify(searchCriteria));
    }else{
      const searchCriteria = {
        templateId : '',
        templateName : '',
        status : ["APPROVAL_PENDING_CUG"]
      }
      getPendingRequest(JSON.stringify(searchCriteria))
    }
  };

  const handleView = (templateId) => {
    // setShowTemplateForm(true);
    navigate(NAVIGATE_PATH.CHECKER_REVIEW_TEMPLATE + templateId)
  }

  useEffect(() => {
    sessionStorage.getItem("user") === null && navigate(NAVIGATE_PATH.LOGIN)
    const searchCriteria = {
      templateId : '',
      templateName : '',
      status : ["APPROVAL_PENDING_CUG", "APPROVAL_PENDING_PROD"]
    }
    getPendingRequest(JSON.stringify(searchCriteria));
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  const handleClickBack = () => {
    navigate(NAVIGATE_PATH.CHECKER)
  }

  return (
    <>
      <PageHeader handleClickBack={handleClickBack} heading={"Pending Requests"} />
      <table className="shadow-lg bg-white  mx-auto mt-5 ">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
            <th className="bg-blue-100 border text-left px-3 py-2">Requested On</th>
            <th className="bg-blue-100 border text-left px-3 py-2">Requested By</th>
            <th className="bg-blue-100 border text-left px-3 py-2">
              <div className='flex justify-between items-center relative'>
                <div>Status</div>
                <div className='h-5 w-5'>
                  <img onClick={() => showFilter ? setShowFilter(false) : setShowFilter(true)} src={filter} alt="" />
                </div>
                {showFilter &&
                  <div ref={dropdownRef}  className='absolute top-full right-0 mt-2 w-60 p-2 border bg-white shadow-md rounded-sm'>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox2} type="checkbox" id="checkbox2" className="h-[0.60rem] w-[0.60rem]" name="pendingPROD" value={status.APPROVAL_PENDING_PROD} />
                      <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox2"> {status.APPROVAL_PENDING_PROD}</label>
                    </div>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox3} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value={status.APPROVAL_PENDING_CUG} />
                      <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox3"> {status.APPROVAL_PENDING_CUG}</label>
                    </div>
                    <div className='flex justify-end pt-2' >
                    <button disabled={(!checkboxes.checkbox2 && !checkboxes.checkbox3)} onClick={handleFetchData} className='text-sm font-mono hover:bg-green-600 bg-green-700 text-white p-1 rounded-sm'>Filter</button>
                    </div>
                  </div>
                  }
              </div>
            </th>
            <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
          </tr>
        </thead>
        {pendingRequestData.map((val, key) => {
          return (
            <tbody className=''>
              <tr key={key}>
                <td className="border px-3 py-2">{val.templateName}</td>
                <td className="border px-3 py-2">{val.createdOn}</td>
                <td className="border px-3 py-2">{val.createdBy}</td>
                <td className="border px-3 py-2">{status[val.status]}</td>
                <td className="border px-3 py-2 space-x-1">
                  <button onClick={() => navigate(`${NAVIGATE_PATH.CHECKER_REVIEW_TEMPLATE + val.templateId}/status/${val.status}`)} className="text-blue-500 hover:underline">Approve/Reject</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default PendingRequestTable
 