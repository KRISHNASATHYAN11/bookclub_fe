import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleAuth, loginUser, registerUser } from "../services/AllApi";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const Auth = ({ insideRegister }) => {
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {saveToken}= useContext(AuthContext)

  const onRegisterClick = async () => {
    try {
      let apiResponse = await registerUser(registerData);
      console.log(apiResponse);
      if (apiResponse.status == 201) {
        toast("Successfully Registered");
        navigate("/login");
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      toast("error occurred");
      console.log(error);
    }
  };

  const onLoginClick = async () => {
    try {
      let reqBody = registerData;
      delete reqBody.userName;
      let apiResponse = await loginUser(reqBody);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        // localStorage.setItem("token", apiResponse.data.token);
        saveToken(apiResponse.data.token)
        localStorage.setItem("user", JSON.stringify(apiResponse.data.user));

        toast("login success");
        if(apiResponse.data.user.userType=="Admin"){
          navigate('/admin-home')
        }else{
          navigate('/')
        }
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      toast("error occurred");
      console.log(error);
    }
  };

  const googleDecode = async (credId) => {
    const decoded = jwtDecode(credId);
    console.log(decoded);

    let reqBody = {
      userName: decoded.name,
      email: decoded.email,
      profilePic: decoded.picture,
    };
    let apiResponse = await googleAuth(reqBody);
    if (apiResponse.status == 200 || apiResponse.status == 201) {
      // localStorage.setItem("token", apiResponse.data.token);
       saveToken(apiResponse.data.token)
      localStorage.setItem("user", JSON.stringify(apiResponse.data.user));

      toast("login success");
      navigate("/");
    } else {
      toast("Error Occurred in Google Authentication");
    }
  };

  return (
    <>
      <div id="loginpage" className="flex justify-center items-center">
        <div className="md:grid  grid-cols-3 w-full">
          <div></div>
          <div className="flex justify-center items-center flex-col p-5">
            <h1 className="text-center text-3xl font-bold text-white md:text-black mb-5">
              BOOKS CLUB
            </h1>

            <div className="block max-w-sm p-6 px-10 py-3 bg-black  rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                className="border border-white flex justify-center items-center mx-25"
              >
                <FontAwesomeIcon
                  className="fa-2x text-center"
                  style={{ color: "white" }}
                  icon={faUser}
                />
              </div>
              {insideRegister ? (
                <h1 className="text-white mt-5 text-3xl mb-8 mx-25">
                  Register
                </h1>
              ) : (
                <h1 className="text-white mt-5 text-3xl mb-8 mx-25">Login</h1>
              )}

              <div className="mb-5 w-full">
                {insideRegister && (
                  <input
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        userName: e.target.value,
                      })
                    }
                    name="userName"
                    placeholder="User Name"
                    className=" p-2 rounded placeholder-gray-600 bg-white w-full"
                    type="text"
                    required
                  />
                )}
              </div>
              <div>
                <input
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  name="email"
                  placeholder="email"
                  className="my-5 p-2 rounded placeholder-gray-600 bg-white w-full"
                  type="text"
                  required
                />
              </div>

              <div>
                <input
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Password"
                  className="p-2 rounded placeholder-gray-600 bg-white w-full"
                  type="password"
                />
              </div>
              <div className="mb-5 w-full flex justify-between">
                <p className="text-amber-300" style={{ fontSize: "10px" }}>
                  *Never share your password with others
                </p>
                <p
                  className="text-white underline"
                  style={{ fontSize: "10px" }}
                >
                  Forget Password
                </p>
              </div>

              <div className="mb-2 w-full">
                {insideRegister ? (
                  <button
                    onClick={onRegisterClick}
                    className="bg-green-800 text-white w-full p-3 rounded"
                  >
                    register
                  </button>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="bg-green-800 text-white w-full p-3 rounded"
                  >
                    LOGIN
                  </button>
                )}
              </div>
              <p className="text-white">----------------or------------------</p>

              <div className="mb-5 mt-3 w-full text-center ">
                <div style={{ height: "40px" }}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      googleDecode(credentialResponse.credential);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                      toast("Google Auth Failed");
                    }}
                  />
                  
                </div>
              </div>
              {insideRegister ? (
                <div className="mb-5 w-full flex justify-between">
                  <p className="text-white">Already an Existing User? </p>
                  <Link to={"/login"} className="text-blue-400 underline ms-2">
                    Login
                  </Link>
                </div>
              ) : (
                <div className="mb-5 w-full flex justify-between">
                  <p className="text-white">Are you a New User ? </p>
                  <Link
                    to={"/register"}
                    className="text-blue-400 underline ms-2"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Auth;
