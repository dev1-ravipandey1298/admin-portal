import React from 'react'
import backButton from '/icons/back-button.png'

const PageHeader = ({handleClickBack, heading}) => {
  return (
    <div className="border-b-2 border-blue-800 w-[70%] mb-3 ml-5 mt-1">
      <div className='flex items-center'>
      <img onClick={() => handleClickBack()} src={backButton} className='h-7 w-7 ml-3 hover:-translate-x-1 transition ease-in-out delay-100 hover:cursor-pointer' alt="" />
      <h2 className="font-medium text-blue-700 ml-3">{heading}</h2>
      </div>
    </div>
  )
}

export default PageHeader