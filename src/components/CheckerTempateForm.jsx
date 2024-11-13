import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import downArrow from '/icons/down-arrow.png'
import { getNotificationTemplateById, markCUGApproved, markCUGReject, markPRODApproved, markPRODReject } from '../services/templateService';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from './Alert';
import { NAVIGATE_PATH } from '../constants/routeConstant';
import preview from '/icons/preview.png'
import { ShowImage } from './ShowImage';
import { ERROR_MESSAGE } from '../constants/ErrorMessageConstant';
import { occurrenceFrequencyOption, occurrenceHoursOption } from '../constants/reoccuranceValue';

const CheckerTempateForm = () => {
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
    imageUrl: '',
  });

  const [showDays, setShowDays] = useState(false);
  const { templateId, status } = useParams();
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false);
  const navigate = useNavigate();
  const [showEvidence, setShowEvidence] = useState(false);
  const [showNotificationImage, setShowNotificationImage] = useState(false);
  const [alertTrue, setAlertTrue] = useState(true);
  const [error, setError] = useState(false);
  const [isSuccessfullySubmit, setIsSuccessfullySubmit] = useState(false);


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
          environment: `${status == "APPROVAL_PENDING_CUG" ? 'CUG' : 'PROD'}`,
          file: data.cugEvidence,
          comment: '',
          imageUrl: data.templateData.imageUrl,
          makerComment: data.makerComment,
        })

      }
    } catch (error) {
      setSubmitMessage(error.response.data.message)
      setAlertTrue(false)
      setshowAlert(true);
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

        setSubmitMessage(response.data.message)
        setshowAlert(true)
        setIsSuccessfullySubmit(true)
      }
    } catch (error) {
      setSubmitMessage(error.response.data.message)
      setAlertTrue(false)
      setshowAlert(true);
    }
  }

  const markCUGApprovedBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markCUGApproved(templateId, comment)
      if (response.status == 200) {
        setSubmitMessage(response.data.message)
        setshowAlert(true)
        setIsSuccessfullySubmit(true)
      }
    } catch (error) {
      setSubmitMessage(error.response.data.message)
      setAlertTrue(false)
      setshowAlert(true);
    }
  }

  const markPRODRejectBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markPRODReject(templateId, comment)
      if (response.status == 200) {

        setSubmitMessage(response.data.message)
        setshowAlert(true)
        setIsSuccessfullySubmit(true)
      }
    } catch (error) {
      setSubmitMessage(error.response.data.message)
      setAlertTrue(false)
      setshowAlert(true);
    }
  }

  const markPRODApprovedBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markPRODApproved(templateId, comment)
      if (response.status == 200) {
        setSubmitMessage(response.data.message)
        setshowAlert(true)
        setIsSuccessfullySubmit(true)
      }
    } catch (error) {
      setSubmitMessage(error.response.data.message)
      setAlertTrue(false)
      setshowAlert(true);
    }
  }


  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.comment === '') {
      setSubmitMessage(ERROR_MESSAGE.COMMENT_IS_REQUIRED)
      setAlertTrue(false)
      setshowAlert(true);
    } else {

      if (formData.environment === 'CUG') {
        markCUGApprovedBackend()
      } else if (formData.environment === 'PROD') {
        markPRODApprovedBackend()
      }
    }
  };

  const handleReject = () => {

    if (formData.comment === '') {
      setSubmitMessage(ERROR_MESSAGE.COMMENT_IS_REQUIRED)
      setAlertTrue(false)
      setshowAlert(true);
    } else {
      if (formData.environment === 'CUG') {
        markCUGRejectBackend()
      } else if (formData.environment === 'PROD') {
        markPRODRejectBackend()
      }
    }
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


  const handleShowEvidence = () => {
    setShowEvidence(true)
  }

  const handleClickBack = () => {
    navigate(NAVIGATE_PATH.CHECKER_PENDING_REQUEST)
  }

  // Generate days for recurrence checkboxes
  const maxDays = formData.occurrenceUnit === 'Week' ? 7 : 31;

  return (
    <>
      <PageHeader handleClickBack={handleClickBack} heading={"Nudge Template Review -Checker"} />
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
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            {(formData.startDate !== formData.endDate) && <div>
              <label className="block font-medium text-gray-700 mb-2">Reoccurance: </label>
              {/* Recurrence */}
              <div className="grid grid-cols-4 gap-0">

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Duration</label>
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
                          <span className={`ml-2 ${formData.occurrenceDays.includes(val) ? 'text-black font-semibold' : 'text-gray-500'}`}>{maxDays == 7 ? occurrenceFrequencyOption[val - 1].label : val}</span>
                        </label>
                      </div>
                    ))}
                  </div>}
                </div>

                {/* hour Of Day */}
                <div>
                  <label className="block font-medium text-gray-700 mb-2">Hours Of Day</label>
                  <select
                    disabled
                    name="hourOfDay"
                    value={formData.hourOfDay}
                    onChange={handleChange}
                    className="w-28 p-2 bg-gray-50 border border-gray-400 rounded"
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
                value={formData.hourOfDay}
                disabled
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

            {/* Images */}
            {(formData.imageUrl !== null) && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="showEvidence">
                <p className="inline font-medium text-gray-700 mb-2">Show Notification Image :</p>
              </label>
              <div className="flex items-center justify-center pb-1 h-8 w-8">
                <img onClick={() => setShowNotificationImage(true)} src={preview} alt="" />
              </div>
            </div>}

            {/* Environment */}
            <div className="mb-4 w-[50%]">
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
            </div>

            {/* Maker Comment */}
            {formData.environment === "PROD" && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="makerComment">
                <p className="inline font-medium text-gray-700 mb-2">Maker's Comment :</p>
              </label>
              <div className="flex items-center justify-center pb-1">
                <p>{formData.makerComment !== null ? formData.makerComment : "**No Comments**"}</p>
              </div>
            </div>}

            {/* Show Evidence */}
            {formData.environment === "PROD" && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="showEvidence">
                <p className="inline font-medium text-gray-700 mb-2">Show Evidence :</p>
              </label>
              <div className="flex items-center justify-center pb-1 h-8 w-8">
                <img onClick={handleShowEvidence} src={preview} alt="" />
              </div>
            </div>}

            {/* Comment */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">Comment*</label>
              <textarea
                name="comment"
                placeholder='Provide your comment here ...'
                value={formData.comment}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                type="button"
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </form>
        {showAlert && <Alert alertDetail={{ success: alertTrue, message: submitMessage }} handleCloseAlert={() => { setshowAlert(false); setAlertTrue(true);  isSuccessfullySubmit && navigate(NAVIGATE_PATH.CHECKER_PENDING_REQUEST); setIsSuccessfullySubmit(false);}} />}
      </div>
      {showEvidence && <ShowImage file={formData.file} handleCloseAlert={() => setShowEvidence(false)} />}
      {showNotificationImage && <ShowImage file={formData.imageUrl} handleCloseAlert={() => setShowNotificationImage(false)} />}
    </>
  );
};

export default CheckerTempateForm;
