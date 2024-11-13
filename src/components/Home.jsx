import React from 'react'
import Navbar from './Navbar'
import Checker from './Checker'
import Maker from './Maker'

const Home = ({userDetails, handleLogout}) => {
  return (
    <div>
      <Navbar userDetails={userDetails} handleLogout={handleLogout}/>
      {
        userDetails.role === "CHECKER" ? <Checker userDetails={userDetails}/> : <Maker userDetails={userDetails}/>
      }
    </div>
  )
}

export default Home
