import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import downArrow from '/icons/down-arrow.png'
import { getNotificationTemplateById, markCUGApproved, markCUGReject, markPRODApproved, markPRODReject } from '../services/templateService';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from './Alert';
import { NAVIGATE_PATH } from '../constants/routeConstant';
import preview from '/icons/preview.png'
import { ShowImage } from './ShowImage';
import { occurrenceFrequencyOption, occurrenceHoursOption } from '../constants/reoccuranceValue';
import { VALIDATION_MESSAGES } from '../constants/ValidationMessageConstant';

const SearchScreenTemplateForm = () => {
  const [formData, setFormData] = useState({
    templateName: '',
    title: '',
    body: '',
    startDate: '',
    endDate: '',
    occurrenceFrequency: 1,
    occurrenceUnit: 'Week',
    occurrenceDays: [],
    hourOfDay: 9,
    environment: 'CUG',
    file: null,
    comment: '',
  });

  const [showDays, setShowDays] = useState(false);
  const { templateId, status } = useParams();
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false);
  const navigate = useNavigate();
  const [showEvidence, setShowEvidence] = useState(false);
  const [showNotificationImage, setShowNotificationImage] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);


  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  // Handle multi-select for Recurrence Days
  const handleRecDayChange = (e) => {
    const { value, checked } = e.target;
    let newOccurrenceDays = [...formData.occurrenceDays];

    if (checked) {
      if (newOccurrenceDays.length < formData.occurrenceFrequency) {
        newOccurrenceDays.push(Number(value));
      }
    } else {
      newOccurrenceDays = newOccurrenceDays.filter((day) => day !== Number(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      occurrenceDays: newOccurrenceDays,
    }));
  };

  useEffect(() => {
    getTemplateByIdBackend(templateId);
  }, [])

  const getTemplateByIdBackend = async (templateId) => {
    try {
      const response = await getNotificationTemplateById(templateId);

      if (response.status == 200) {
        const data = response.data.payload;
        setFormData({
          templateId: templateId,
          templateName: data.templateData.templateName,
          title: data.templateData.title,
          body: data.templateData.body,
          startDate: data.templateData.startDate,
          endDate: data.templateData.endDate,
          occurrenceFrequency: data.templateData.occurrenceFrequency,
          occurrenceUnit: data.templateData.occurrenceUnit,
          occurrenceDays: data.templateData.occurrenceDays,
          hourOfDay: data.templateData.hourOfDay,
          environment: `${(status == "APPROVAL_PENDING_PROD" || status == "PROD_APPROVED" || status == "CUG_APPROVED") ? 'PROD' : 'CUG'}`,
          imageUrl: data.templateData.imageUrl,
          file: data.cugEvidence,
          comment: '',
          makerComment: data.makerComment,
          checkerCUGComment: data.checkerCUGComment,
          checkerFinalComment: data.checkerFinalComment
        })

      }
    } catch (error) {

    }
  }

  let submitComment = () => {
    const commentData = {
      "comment": formData.comment
    }
    return JSON.stringify(commentData)
  }

  const markCUGRejectBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markCUGReject(templateId, comment)
      if (response.status == 200) {

        setSubmitMessage("Template rejected successfully.")
        setshowAlert(true)
      }
    } catch (error) {

    }
  }

  const markCUGApprovedBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markCUGApproved(templateId, comment)
      if (response.status == 200) {
        setSubmitMessage("Template approved successfully.")
        setshowAlert(true)
      }
    } catch (error) {

    }
  }

  const markPRODRejectBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markPRODReject(templateId, comment)
      if (response.status == 200) {

        setSubmitMessage("Template rejected for PROD successfully.")
        setshowAlert(true)
      }
    } catch (error) {

    }
  }

  const markPRODApprovedBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markPRODApproved(templateId, comment)
      if (response.status == 200) {
        setSubmitMessage("Template approved for PROD successfully.")
        setshowAlert(true)
      }
    } catch (error) {

    }
  }


  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.environment === 'CUG') {
      markCUGApprovedBackend()
    } else if (formData.environment === 'PROD') {
      markPRODApprovedBackend()
    }
  };

  const handleReject = () => {
    if (formData.environment === 'CUG') {
      markCUGRejectBackend()
    } else if (formData.environment === 'PROD') {
      markPRODRejectBackend()
    }
  }

  const handleShowEvidence = () => {
    setShowEvidence(true)
  }

  const handleClickBack = () => {
    const userLoggedIn = JSON.parse(sessionStorage.getItem("user"))
    userLoggedIn != null && userLoggedIn.role == "CHECKER" ? 
    navigate(NAVIGATE_PATH.CHECKER_SHOW_ALL) : navigate(NAVIGATE_PATH.MAKER_SHOW_ALL)
  }

  const closeDropdown = (event) => {
    if (!event.target.closest('.dropdown')) {
      setShowDays(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Generate days for recurrence checkboxes
  const maxDays = formData.occurrenceUnit === 'Week' ? 7 : 31;

  return (
    <>
      <PageHeader handleClickBack={handleClickBack} heading={"Search Screen View"} />
      <div className="flex justify-center items-center   p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-lg rounded-lg w-full max-w-6xl  grid grid-cols-2 gap-8"
        >
          {/* Left Section */}
          <div className="space-y-4">

            {/* Template Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Template Name</label>
              <input
                readOnly
                type="text"
                name="templateName"
                value={formData.templateName}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Title</label>
              <input
                readOnly
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
                required
              />
            </div>

            {/* Body */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Body</label>
              <textarea
                readOnly
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
                rows={4}
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Start Date</label>
              <input
                readOnly
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">End Date</label>
              <input
                readOnly
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            {(formData.startDate !== formData.endDate) && <div>
              <label className="block font-medium text-gray-700 mb-2">Reoccurrence: </label>
              {/* Recurrence */}
              <div className="grid grid-cols-4 gap-4">

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Every</label>
                  <select
                    disabled
                    name="occurrenceUnit"
                    value={formData.occurrenceUnit}
                    onChange={handleChange}
                    className="w-24 p-2 bg-gray-50 border border-gray-400 rounded"
                  >
                    <option value="Week">Weekly</option>
                    <option value="Month">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    disabled
                    name="occurrenceFrequency"
                    value={formData.occurrenceFrequency}
                    onChange={handleChange}
                    className="w-24 p-2 bg-gray-50 border border-gray-400 rounded"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Recurrence Days (Multi-select with checkboxes) */}
                <div className='dropdown'>
                  <label className="block font-medium text-gray-700 mb-2">Days</label>
                  <div
                    onClick={() => showDays ? setShowDays(false) : setShowDays(true)}
                    className='w-24 h-[2.50rem] rounded-sm text-nowrap p-2 bg-gray-50 border border-gray-400 flex justify-between items-center' >
                    <p>Show D.</p> <span><img className='h-4 w-4' src={downArrow} alt="" /></span>
                  </div>
                  {showDays && <div className={`grid ${maxDays === 7 ? 'grid-cols-1' : 'grid-cols-3'}  gap-2 border bg-gray-50 p-4 rounded absolute shadow-xl`}>
                    {Array.from({ length: maxDays }, (_, i) => i + 1).map((val) => (
                      <div key={val} >
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={val}
                            checked={formData.occurrenceDays.includes(val)}
                            onChange={handleRecDayChange}
                            disabled={true}
                          />
                          <span>{maxDays == 7 ? occurrenceFrequencyOption[val - 1].label : val}</span>
                        </label>
                      </div>
                    ))}
                  </div>}
                </div>

                {/* hour Of Day */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Hours Of Day*</label>
                  <select
                    name="hourOfDay"
                    disabled
                    value={formData.hourOfDay}
                    onChange={handleChange}
                    className="w-24 p-2 bg-gray-50 border border-gray-400 rounded"
                  >
                    {Array.from({ length: 24 }, (_, i) => i).map((val) => (
                      <option key={val} value={val}>
                        {occurrenceHoursOption[val].label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>}

            {(formData.startDate === formData.endDate) && <div>
              <label className="block font-medium text-gray-700 mb-2">Hours of Day*</label>
              <select
                name="hourOfDay"
                disabled
                value={formData.hourOfDay}
                onChange={handleChange}
                className="w-24 p-2 bg-gray-50 border border-gray-400 rounded"
              >
                {Array.from({ length: 24 }, (_, i) => i).map((val) => (
                  <option key={val} value={val}>
                    {occurrenceHoursOption[val].label}
                  </option>
                ))}
              </select>
            </div>}

            {/* Environment */}
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative mb-4 w-[50%]">
              <label className="block font-medium text-gray-700 mb-2">Environment</label>
              <select
                name="environment"
                value={formData.environment}
                disabled={true}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"

              >
                <option value="CUG">CUG</option>
                <option value="PROD">PROD</option>
              </select>
              {showTooltip && (
              <div className="absolute left-0 mt-2 w-[200px] p-2 bg-gray-800 text-white text-sm rounded shadow">
                {VALIDATION_MESSAGES.ENVIRONMENT_DETAILS}
              </div>
              )}
            </div>

            {/* Images */}
            {(formData.imageUrl !== null) && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="showEvidence">
                <p className="inline font-medium text-gray-700 mb-2">Show Notification Image :</p>
              </label>
              <div className="flex items-center justify-center pb-1 h-8 w-8">
                <img onClick={() => setShowNotificationImage(true)} src={preview} alt="" />
              </div>
            </div>}

            {/* Maker failed Comment */}
            {(status === "CUG_FAILED") && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="checkerComment">
                <p className="inline font-medium text-gray-700 mb-2">Maker's Comment :</p>
              </label>
              <div className="flex items-center justify-center pb-1">
                <p>{formData.makerComment !== null ? formData.makerComment : '**NO Comments**'}</p>
              </div>
            </div>}

            {/* Checker Comment */}
            {(status === "REJECTED" || status === "CUG_APPROVED") && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="checkerComment">
                <p className="inline font-medium text-gray-700 mb-2">Checker's CUG Comment :</p>
              </label>
              <div className="flex items-center justify-center pb-1">
                <p>{formData.checkerCUGComment !== null ? formData.checkerCUGComment : '**NO Comments**'}</p>
              </div>
            </div>}

            {/* Checker Final Comment */}
            {(status === "REJECTED") && formData.checkerFinalComment !== null && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="checkerComment">
                <p className="inline font-medium text-gray-700 mb-2">Checker's Final Comment :</p>
              </label>
              <div className="flex items-center justify-center pb-1">
                <p>{formData.checkerFinalComment !== null ? formData.checkerFinalComment : '**NO Comments**'}</p>
              </div>
            </div>}

            {/* CUG Evidence */}
            {(formData.file !== null) && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="showEvidence">
                <p className="inline font-medium text-gray-700 mb-2">Show Evidence :</p>
              </label>
              <div className="flex items-center justify-center pb-1 h-8 w-8">
                <img onClick={handleShowEvidence} src={preview} alt="" />
              </div>
            </div>}

          </div>
        </form>
        {showAlert && <Alert alertDetail={{ success: true, message: submitMessage }} handleCloseAlert={() => setshowAlert(false)} />}
      </div>
      {showEvidence && <ShowImage file={formData.file} handleCloseAlert={() => setShowEvidence(false)} />}
      {showNotificationImage && <ShowImage file={formData.imageUrl} handleCloseAlert={() => setShowNotificationImage(false)} />}
    </>
  );
};

export default SearchScreenTemplateForm;
