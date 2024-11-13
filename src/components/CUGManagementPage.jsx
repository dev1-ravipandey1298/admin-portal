import React, { useState, useEffect} from 'react';
import PageHeader from './PageHeader';
import { createNewCugUser, deleteSelectedCUGUsers, getAllCUGUsers } from '../services/templateService';
import Alert from './Alert';
import { COMMON_ROUTE, NAVIGATE_PATH } from '../constants/routeConstant';
import { useNavigate } from 'react-router-dom';
import { ERROR_MESSAGE } from '../constants/ErrorMessageConstant';
import { CONFIRMATION_MESSAGES, VALIDATION_MESSAGES } from '../constants/ValidationMessageConstant';
import ConfirmationWarning from './ConfirmationWarning';

const CUGManagementPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const [newUsers, setNewUsers] = useState([]); 
  const [userData, setUserData] = useState({ name: '', mobileNumber: '' });
  const [deleteMode, setDeleteMode] = useState(false); 
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false);
  const [alertTrue, setAlertTrue] = useState(true);
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const navigate = useNavigate();
  
  
  useEffect(() => {
    getAllCugUsersFromBackend()
  }, []);


  const getAllCugUsersFromBackend = async () => {
    try {
      const response = await getAllCUGUsers();
      if(response.status == 200){
        setUsers(response.data.payload)
      }
    } catch (error) {
      setSubmitMessage(error.response.data.message)
      setAlertTrue(false)
      setshowAlert(true);
    }
  }

  const handleDelete = (selectedUsers) => {
    // setUsers(users.filter((user) => !selectedUsers.includes(user.mobileNumber))); 
    const userMobileNumber = users.filter((user) => selectedUsers.includes(user.mobileNumber)).map((user) => user.mobileNumber);
    const response = deleteSelectedUserBackend(userMobileNumber);
    if(response){
      setUsers(users.filter((user) => !selectedUsers.includes(user.mobileNumber))); 
      getAllCugUsersFromBackend();
    }
  }

  // Handle checkbox toggle
  const handleCheckboxChange = (mobileNumber) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(mobileNumber)
        ? prevSelected.filter((userId) => userId !== mobileNumber)
        : [...prevSelected, mobileNumber]
    );
  };

  const deleteSelectedUserBackend = async (selectedUsers) => {
    try {
      const response = await deleteSelectedCUGUsers(selectedUsers);
      if(response.status == 200){
        setSubmitMessage(response.data.message)
        setAlertTrue(true)
        setshowAlert(true);
        return true;
      }
      return false;
    } catch (error) {
      setSubmitMessage(error.response.data.message)
      setAlertTrue(false)
      setshowAlert(true);
      return false;
    }
  }

  const createNewUsersBackend = async (userDetails) => {
    try {
      const response = await createNewCugUser(userDetails);
      if(response.status === 201){
        setSubmitMessage(response.data.message)
        setAlertTrue(true)
        setshowAlert(true);
      }else{
        setSubmitMessage(error.response.data.message)
        setAlertTrue(false)
        setshowAlert(true);
      }
    } catch (error) {
      if(error.response.data.message.includes("ERROR: null value in column")){
        setSubmitMessage(VALIDATION_MESSAGES.DUPLICATE_MOBILE_NUMBER)
      }else{
        setSubmitMessage(error.response.data.message)
      }
      setAlertTrue(false)
      setshowAlert(true);
    }
  }

  // Handle deletion of selected users
  const handleDeleteSelectedUsers = () => {
    setConfirmation(true);
  };

  // Handle adding new users to the list
  const handleAddUser = () => {
    if (userData.mobileNumber) {
      if(!userData.mobileNumber.match(/^[1-9][0-9]{9}$/)){
        setError(true)
        setSubmitMessage(ERROR_MESSAGE.NEW_CUG_USER_VALIDATION)
        setAlertTrue(false)
        setshowAlert(true);
      }else{
        setNewUsers([...newUsers, { name: Date.now(), ...userData }]);
        setUserData({ name: '', mobileNumber: '' });
      }  
    }
  };

  // Handle submitting new users to backend
  const handleSubmitNewUsers = () => {
    try {      
      createNewUsersBackend(JSON.stringify(newUsers));
      getAllCugUsersFromBackend();
      setNewUsers([]); 
    } catch (err) {
      setError('Failed to add users');
    } 
  };

  const handleClickBack = () => {
    const role = JSON.parse(sessionStorage.getItem("user")).role
    if(role === "CHECKER"){
      navigate(NAVIGATE_PATH.CHECKER)
    }else if(role === "MAKER"){
      navigate(NAVIGATE_PATH.MAKER)
    }
    
  }

  return (
    <>
    <PageHeader handleClickBack={handleClickBack} heading={"CUG Management Screen"}/>
    <div className="w-full max-w-6xl p-6 mx-auto bg-white">
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap">
          <li className={`mr-2 cursor-pointer ${activeTab === 0 ? 'border-b-2 border-blue-500' : ''}`}>
            <button onClick={() => {setActiveTab(0); getAllCugUsersFromBackend();}} className="p-2">All CUG Users</button>
          </li>
          <li className={`mr-2 cursor-pointer ${activeTab === 1 ? 'border-b-2 border-blue-500' : ''}`}>
            <button onClick={() => { setActiveTab(1); setUserData({ name: '', mobileNumber: '' }); }} className="p-2">Add CUG Users</button>
          </li>
        </ul>
      </div>

      {/* Tab Contents */}
      {activeTab === 0 && (
        <div>
          <h2 className="text-lg font-bold">CUG Users List</h2>

          {/* Toggle Delete Mode Switch */}
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <span className="mr-2 text-sm font-medium">Enable Delete Mode</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={deleteMode}
                onChange={() => setDeleteMode(!deleteMode)}
              />
            </label>
          </div>


            <>
              <table className="w-full mt-4 table-auto">
                <thead>
                  <tr>
                    {deleteMode && <th className="px-4 py-2 text-left bg-blue-100 border">Select</th>}
                    <th className="px-4 py-2 text-left bg-blue-100 border">Name</th>
                    <th className="px-4 py-2 text-left bg-blue-100 border">Mobile Number</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.mobileNumber}>
                      {deleteMode && (
                        <td className="px-4 py-2 border">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.mobileNumber)}
                            onChange={() => handleCheckboxChange(user.mobileNumber)}
                          />
                        </td>
                      )}
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.mobileNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Delete Button - Only visible if deleteMode is enabled */}
              {deleteMode && (
                <button
                  onClick={handleDeleteSelectedUsers}
                  className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
                  disabled={selectedUsers.length === 0 || (users !== null && users.length === 0)}
                >
                  Delete Selected Users
                </button>
              )}
            </>
          
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <h2 className="text-lg font-bold">Add CUG Users</h2>

          {/* Add User Form */}
          <div className="mt-4 w-[80%] flex items-center justify-center space-x-2">
            <input
              type="text"
              placeholder="Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="px-4 py-2  border rounded w-full"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={userData.mobileNumber}
              onChange={(e) => setUserData({ ...userData, mobileNumber: e.target.value })}
              className="px-4 py-2 border rounded w-full"
            />
          
            <button
              onClick={handleAddUser}
              className="px-4 py-2 w-32 text-white bg-blue-500 rounded hover:bg-blue-600 text-nowrap "
            >
              + Add User
            </button>
            
          </div>

          {/* List of Newly Added Users */}
          <h3 className="mt-4 text-md">New Users</h3>
          {newUsers.length > 0 ? (
            <ul className="mt-2">
              {newUsers.map((user) => (
                <li key={user.name} className="flex items-center justify-between px-4 py-2 border-b">
                  <span>{user.name} - {user.mobileNumber}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No new users added yet.</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmitNewUsers}
            className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
            disabled={newUsers.length === 0}
          >
            Submit New Users
          </button>
        </div>
      )}
    </div>
    {confirmation && <ConfirmationWarning message={CONFIRMATION_MESSAGES.CONFIRMATION_ON_SELECTED_USER_DELETE} handleConfirmWarning={() => {handleDelete(selectedUsers); setConfirmation(false)} } handleCloseWarning={() => setConfirmation(false)}/>}
    {showAlert && <Alert alertDetail={{ success: alertTrue, message: submitMessage }} handleCloseAlert={() => {setshowAlert(false); setAlertTrue(true);}} />}
    </>
  );
};

export default CUGManagementPage;
