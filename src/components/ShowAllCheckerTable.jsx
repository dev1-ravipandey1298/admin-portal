import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";
import filter from "/icons/filter.png"
import { deleteNonApprovedTemplate, getTemplatesBySearchCriteria, markPRODDisable, markPRODEnable } from "../services/templateService";
import { status } from "../constants/statusConstant";
import { NAVIGATE_PATH } from "../constants/routeConstant";
import ConfirmationWarning from "./ConfirmationWarning";
import { CONFIRMATION_MESSAGES } from "../constants/ValidationMessageConstant";

const ShowAllCheckerTable = () => {
  const navigate = useNavigate();
  const [isEnable, setIsEnable] = useState(true);
  const [isDisable, setIsDisable] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [deletionDetails, setDeletionDetails] = useState({ templateName: '', templateId: '' });
  const [statusValue, setStatusValue] = useState(['PROD_APPROVED', 'APPROVAL_PENDING_CUG', 'CUG_APPROVED', 'REJECTED', 'CUG_FAILED', 'APPROVAL_PENDING_PROD']);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false, // Select All
    checkbox2: true, // PROD_APPROVED
    checkbox3: true, //  APPROVAL_PENDING_CUG
    checkbox4: true, // CUG_APPROVED
    checkbox5: true, // REJECTED
    checkbox6: true, // CUG_FAILED
    checkbox7: true // APPROVAL_PENDING_PROD
  });
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (event) => {
    const { id, checked, value } = event.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [id]: checked
    }));
  };

  const handleFetchData = async () => {
    setShowFilter(false)
    const statusArray = [];
    for (let [key, value] of Object.entries(checkboxes)) {

      if (value) {
        const statusValue = document.getElementById(`${key}`).value;
        statusArray.push(statusValue);
      }
    }
    setStatusValue(statusArray);
    const searchCriteria = {
      templateId: '',
      templateName: searchValue,
      status: statusArray
    }
    getTemplateDetailsBySearchCriteriaBackend(JSON.stringify(searchCriteria));
  };


  useEffect(() => {
    sessionStorage.getItem("user") === null && navigate("/login")
    const searchCriteria = {
      templateId: '',
      templateName: searchValue,
      status: statusValue
    }
    getTemplateDetailsBySearchCriteriaBackend(JSON.stringify(searchCriteria));
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  const getTemplateDetailsBySearchCriteriaBackend = async (searchCriteria) => {
    try {
      const response = await getTemplatesBySearchCriteria(searchCriteria);
      setTableData(response.data.payload)
    } catch (error) {

    }
  }

  const handleSearch = () => {
    let isValue = searchValue.match(/^[a-zA-Z0-9 _-]*$/)



    const searchCriteria = {
      templateId: '',
      templateName: searchValue,
      status: statusValue
    }
    getTemplateDetailsBySearchCriteriaBackend(JSON.stringify(searchCriteria));

  }

  const templatePRODEnable = async (templateId) => {
    try {
      const response = await markPRODEnable(templateId);
      if (response.status == 200) {
        setIsEnable(false);
        setIsDisable(true);
        const searchCriteria = {
          templateId: '',
          templateName: searchValue,
          status: statusValue
        }
        getTemplateDetailsBySearchCriteriaBackend(JSON.stringify(searchCriteria));
      }
    } catch (error) {
    }
  }

  const templatePRODDisable = async (templateId) => {
    try {
      const response = await markPRODDisable(templateId);
      if (response.status == 200) {
        setIsEnable(true);
        setIsDisable(false);
        const searchCriteria = {
          templateId: '',
          templateName: searchValue,
          status: statusValue
        }
        getTemplateDetailsBySearchCriteriaBackend(JSON.stringify(searchCriteria));
      }
    } catch (error) {
    }
  }

  const deleteNonApprovedTemplateBackend = async (templateId) => {
    try {
      const response = await deleteNonApprovedTemplate(templateId);
      if (response.status == 200) {
        const searchCriteria = {
          templateId: '',
          templateName: searchValue,
          status: statusValue
        }
        getTemplateDetailsBySearchCriteriaBackend(JSON.stringify(searchCriteria));
      }
    } catch (error) {

    }
  }

  const handleClickBack = () => {
    navigate(NAVIGATE_PATH.CHECKER)
  }


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowFilter(false);
    }
  };

  return (
    <div>
      <PageHeader handleClickBack={handleClickBack} heading={"Search Nudge Template"} />
      <SearchBar setSearchValue={setSearchValue} handleSearch={handleSearch} />
      <table className="shadow-lg bg-white mx-auto mt-5 ">
        <tr>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Created on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Updated on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Approved By</th>
          <th className="bg-blue-100 border text-left px-3 py-2">
            <div className='flex justify-between items-center  relative'>
              <div>Status</div>
              <div className='h-5 w-5'>
                <img onClick={() => showFilter ? setShowFilter(false) : setShowFilter(true)} src={filter} alt="" />
              </div>
              {showFilter &&
                <div ref={dropdownRef} className='absolute top-full right-0 mt-2 w-64 p-2 border bg-white shadow-md rounded-sm'>
                  <div className="">
                    <input onChange={handleCheckboxChange} checked={checkboxes.checkbox2} type="checkbox" id="checkbox2" className="h-[0.60rem] w-[0.60rem]" name="prodApproved" value="PROD_APPROVED" />
                    <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox2"> {status.PROD_APPROVED}</label>
                  </div>
                  <div className="">
                    <input onChange={handleCheckboxChange} checked={checkboxes.checkbox3} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingApprovalCUG" value="APPROVAL_PENDING_CUG" />
                    <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox3"> {status.APPROVAL_PENDING_CUG}</label>
                  </div>
                  <div className="">
                    <input onChange={handleCheckboxChange} checked={checkboxes.checkbox4} type="checkbox" id="checkbox4" className="h-[0.60rem] w-[0.60rem]" name="cugApproved" value="CUG_APPROVED" />
                    <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox4"> {status.CUG_APPROVED}</label>
                  </div>
                  <div className="">
                    <input onChange={handleCheckboxChange} checked={checkboxes.checkbox5} type="checkbox" id="checkbox5" className="h-[0.60rem] w-[0.60rem]" name="rejected" value="REJECTED" />
                    <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox5"> {status.REJECTED}</label>
                  </div>
                  <div className="">
                    <input onChange={handleCheckboxChange} checked={checkboxes.checkbox6} type="checkbox" id="checkbox6" className="h-[0.60rem] w-[0.60rem]" name="cugFailed" value="CUG_FAILED" />
                    <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox6"> {status.CUG_FAILED}</label>
                  </div>
                  <div className="">
                    <input onChange={handleCheckboxChange} checked={checkboxes.checkbox7} type="checkbox" id="checkbox7" className="h-[0.60rem] w-[0.60rem]" name="pendingApprovalProd" value="APPROVAL_PENDING_PROD" />
                    <label className="font-semibold text-red-700 text-sm font-mono" htmlFor="checkbox7"> {status.APPROVAL_PENDING_PROD}</label>
                  </div>
                  <div className='flex justify-end pt-2' >
                    <button onClick={handleFetchData} className='text-xs font-medium px-2 p-1 rounded-sm text-white bg-green-700 hover:bg-green-600'>Filter</button>
                  </div>
                </div>
              }
            </div>
          </th>
          <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
        </tr>
        {tableData.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border px-3 py-2">{val.templateName}</td>
              <td className="border px-3 py-2">{val.createdOn}</td>
              <td className="border px-3 py-2">{val.updatedOn}</td>
              <td className="border px-3 py-2">{val.approvedBy}</td>
              <td className="border px-3 py-2">{status[val.status]}</td>
              <td className="border px-3 py-2 space-x-1">
                {val.status === "PROD_APPROVED" ?
                  <>
                    {!val.active ? <button onClick={() => templatePRODEnable(val.templateId)} className="text-blue-500 hover:underline">Enable</button>
                      :
                      <button onClick={() => templatePRODDisable(val.templateId)} className="text-blue-500 hover:underline">Disable</button>}
                  </>
                  : <>
                    <button onClick={() => navigate(`${NAVIGATE_PATH.CHECKER_SEARCH_SCREEN_TEMPLATE_FORM + val.templateId + '/status/' + val.status}`)} className="text-blue-500 hover:underline">View</button>
                    <span>|</span>
                    <button onClick={() => { setConfirmation(true); setDeletionDetails({ templateName: val.templateName, templateId: val.templateId }) }} className="text-blue-500 hover:underline">Delete</button>
                  </>}
              </td>
            </tr>
          );
        })}
      </table>
      {confirmation && <ConfirmationWarning message={CONFIRMATION_MESSAGES.CONFIRMATION_ON_DELETE + deletionDetails.templateName} handleConfirmWarning={() => { deleteNonApprovedTemplateBackend(deletionDetails.templateId); setConfirmation(false) }} handleCloseWarning={() => setConfirmation(false)} />}
    </div>
  );
};

export default ShowAllCheckerTable;
