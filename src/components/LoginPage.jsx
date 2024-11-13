import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import hdfcBankImageBG from "/icons/hdfcBankImageBG.jpg"
import { userLogin } from "../services/templateService";
import { NAVIGATE_PATH } from "../constants/routeConstant";

const LoginPage = ({setUserDetails}) => {
    const { register, handleSubmit } = useForm();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const userDetails = [{userId:"user1", password:"password", role:"CHECKER", name: "user_checker1"},
      {userId:"user2", password:"password", role:"MAKER", name: "user_maker1"},
      {userId:"user3", password:"password", role:"MAKER", name: "user_maker2"},
      {userId:"user4", password:"password", role:"MAKER", name: "user_maker3"}
    ]

    const onSubmit = (data) => {
      // const loggedInUser = userDetails.find(user => user.userId === data.userId);
      // sessionStorage.setItem('authToken', '423432523rfdsifn34or')
      // if (loggedInUser !== undefined && loggedInUser.password === data.password) {
      //   // setUserDetails(loggedInUser);
      //   loggedInUser.role === "CHECKER" ? navigate(NAVIGATE_PATH.CHECKER) : navigate(NAVIGATE_PATH.MAKER)
      //   loggedInUser.password = "";
      //   sessionStorage.setItem("user", JSON.stringify(loggedInUser))
      //   console.log(loggedInUser)
      // } else {
      //   alert('Invalid credentials');
      // }

      const loginDetails = {
        "userId" : data.userId,
        "password" : btoa(data.password)
      }
      
      login(loginDetails)

    };

    useEffect(() => {
      sessionStorage.getItem("user") === null && navigate(NAVIGATE_PATH.LOGIN)
      const userLoggedIn = JSON.parse(sessionStorage.getItem("user"))
      if(userLoggedIn != null && userLoggedIn.role == "CHECKER"){
        navigate(NAVIGATE_PATH.CHECKER)
      }else if(userLoggedIn != null && userLoggedIn.role == "MAKER"){
        navigate(NAVIGATE_PATH.MAKER)
      }
    }, [])

    

    const login = async (data) => {
      try {
        const response = await userLogin(data);
        if(response.status == 200){
          const roleValue = response.data.payload.role.split("_")[1];
          sessionStorage.setItem("authToken", response.data.payload.authToken)
          sessionStorage.setItem("user", JSON.stringify({userId:data.userId, password:"", role: roleValue, name: data.userId}));
          
          if(roleValue === "CHECKER"){
            navigate(NAVIGATE_PATH.CHECKER)
          }
          else if(roleValue === "MAKER"){
           navigate(NAVIGATE_PATH.MAKER)
          }
        }
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.response.data.message);
      }
    }

    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
            <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
                <div
                    className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
                    // source : https://static.vecteezy.com/system/resources/previews/020/336/703/original/hdfc-logo-hdfc-icon-free-free-vector.jpg
                    style={{
                        backgroundImage: `url(${hdfcBankImageBG})`,
                    }}
                ></div>
                <form
                    className="w-full p-8 lg:w-1/2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {!isError ? <p className="text-xl text-gray-600 text-center">
                        Welcome back!
                    </p> :
                    <p className="text-lg font-medium text-red-800 text-center">{errorMessage} !</p>}
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            User ID
                        </label>
                        <input
                            htmlFor="userId"
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            type="text"
                            required
                            {...register("userId")}
                        />
                    </div>
                    <div className="mt-4 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                        </div>
                        <input
                            htmlFor="password"
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            type="password"
                            {...register("password")}
                        />
                        {/* <a
                            href="#"
                            className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                        >
                            Forget Password?
                        </a> */}
                    </div>
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                    
                    {/* <div className="mt-4 flex items-center w-full text-center">
                <a
                  href="#"
                  className="text-xs text-gray-500 capitalize text-center w-full"
                >
                  Don&apos;t have any account yet?
                  <span className="text-blue-700"> Sign Up</span>
                </a>
              </div> */}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
