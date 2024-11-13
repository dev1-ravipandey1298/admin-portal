import "./App.css";
import LoginPage from "./components/LoginPage";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";

export default function App() {

  const [userDetails, setUserDetails] = useState({userId:"", password:"", role:"", name: ""});

  const handleLogout = () => {
    console.log("LOGGED OUT")
    setUserDetails({userId:"", password:"", role:"", name: ""});
    sessionStorage.clear();
  }
  
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem("user")
    console.log(userLoggedIn)
    userLoggedIn !== null ? setUserDetails(JSON.parse(userLoggedIn)) : setUserDetails({userId:"", password:"", role:"", name: ""})
    console.log(userDetails)
  }, [])
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: userDetails.userId !== "" ? <Navigate to="/home"/> : <LoginPage setUserDetails={setUserDetails}/>,
    },
    {
      path: "/login",
      element: userDetails.userId !== "" ? <Navigate to="/home"/> : <LoginPage setUserDetails={setUserDetails}/>,
    },
    {
      path: "/home",
      element:  userDetails.userId !== "" ? <Home userDetails={userDetails} handleLogout={handleLogout}/> : <Navigate to="/login"/>,
    },
    ]);

  return <RouterProvider router={router} />;
}
