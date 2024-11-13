import React, { useState } from 'react'
import success from '/icons/success.png'
import fail from '/icons/fail.png'

const Alert = ({alertDetail, handleCloseAlert}) => {

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50'>
            <div className=' h-40 bg-white w-80 rounded-lg  shadow-xl'>
                <div className='my-auto h-[75%] flex flex-col justify-center items-center' >
                    {alertDetail.success ? <img className="w-20 h-20"  src={success} alt="" />
                    : <img className="w-20 h-20"  src={fail} alt="" />}
                    <p className={`font-semibold ${alertDetail.success ? 'text-green-600' : 'text-red-600'} font-mono text-center px-3`}>{alertDetail.message}</p>
                </div>
                <div className='flex space-x-3 justify-end px-5 font-bold text-sm font-mono'>
                    <button onClick={() => handleCloseAlert()} className='text-red-700 hover:text-red-600'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Alert;