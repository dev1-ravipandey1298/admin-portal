import React from 'react'

const ConfirmationWarning = ({ message , handleConfirmWarning, handleCloseWarning}) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50'>
            <div className=' h-40 bg-white w-80 rounded-lg  shadow-xl'>
                <div className='my-auto h-[68%] flex justify-center items-center' >
                    <p className='font-semibold text-red-600 font-mono text-center px-3'>{message}</p>

                </div>
                <div className='flex space-x-1 justify-end px-5 font-bold text-sm font-mono'>
                    <button onClick={() => handleConfirmWarning()} className='text-blue-700 hover:text-blue-600 hover:bg-gray-100 p-2 hover:rounded-md'>CONFIRM</button>
                    <button onClick={() => handleCloseWarning()} className='text-red-700 hover:text-red-600 hover:bg-gray-100 p-2 hover:rounded-md'>CLOSE</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationWarning