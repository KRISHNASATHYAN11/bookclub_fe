import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { height, width } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { getAllBooks, getAllJobs, getAllUsers } from "../../services/AllApi";
import { AuthContext } from "../../context/AuthContext";

const AdminHome = () => {
  const box = {
    width: "180px",
    height: "120px",
  };

  const [jobCount, setJobCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    getJobCount();
    getBookCount();
    getUserCount();
  }, []);

  const {token} = useContext(AuthContext)

  const getJobCount = async () => {
    try {
      let apiResponse = await getAllJobs();
      console.log(apiResponse);
      setJobCount(apiResponse.data.length);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching data");
    }
  };

  const getBookCount = async () => {
    try {
      // let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllBooks(header, "");
      console.log(apiResponse);
      setBookCount(apiResponse.data.AllBooks.length);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching data");
    }
  };

  const getUserCount = async () => {
    try {
      // let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllUsers(header, "");
      console.log(apiResponse);
      setUserCount(apiResponse.data.length);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching data");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <AdminSideBar />
        <div>
          <div className="flex justify-evenly mt-10 ms-10 ">
            <div style={box} className="border-2 rounded-2xl bg-gray-900">
              <h1 className="mt-10 font-bold text-white text-center">
                Total Books :{bookCount}
              </h1>
            </div>
            <div style={box} className="border-2 rounded-2xl bg-gray-900">
              <h1 className="mt-10 font-bold text-white text-center">
                Total Users :{userCount}
              </h1>
            </div>
            <div style={box} className="border-2 rounded-2xl bg-gray-900">
              <h1 className="mt-10 font-bold text-white text-center">
                Total Job Openings :{jobCount}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
