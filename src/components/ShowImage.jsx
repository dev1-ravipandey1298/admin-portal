import React from 'react'

export const ShowImage = ({ file, handleCloseAlert }) => {
    return (

        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50'>
            <div className='  bg-white rounded-lg  shadow-xl'>
                <div className='h-96 w-96 my-auto flex flex-col justify-center items-center' >
                    <img src={`${file}`} alt="" />
                </div>
                <div className='flex space-x-3 justify-end px-5 p-2 font-bold text-sm font-mono '>
                    <button onClick={() => handleCloseAlert()} className='text-red-700 hover:text-red-600'>Close</button>
                </div>
            </div>

        </div>

    )
}
