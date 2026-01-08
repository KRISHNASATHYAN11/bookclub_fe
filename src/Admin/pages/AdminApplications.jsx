import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { getAllJobApplication } from "../../services/AllApi";
import { BaseUrl } from "../../services/BaseUrl";
import { AuthContext } from "../../context/AuthContext";


const AdminApplications = () => {
  const [applicationData, setApplicationData] = useState([]);
  const {token} = useContext(AuthContext)

  useEffect(() => {
    getAllApplicationData();
  }, []);

  const getAllApplicationData = async () => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllJobApplication(header);

      if (apiResponse.status == 200) {
        setApplicationData(apiResponse.data.allApplications);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong , can't get application data.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <AdminSideBar />
        <div>
          <h1 className="text-center font-bold text-2xl p-2">
            Job Applications
          </h1>
          {applicationData?.length > 0 ? (
            <div className="grid grid-cols-3 mt-10 gap-4 mx-1">
              {applicationData.map((eachApplication) => (
                <div className="bg-emerald-300 rounded-2xl p-2 mx-2">
                  <h1>Name : {eachApplication.name}</h1>
                  <h1>PhoneNumber : {eachApplication.phoneNumber}</h1>
                  <h1>Qualification : {eachApplication.qualification}</h1>
                  <h1>JobRole : {eachApplication.jobRole}</h1>
                  <h1>Email : {eachApplication.email}</h1>
                  <h1>Job ID :{eachApplication.jobID}</h1>
                  <a
                    className="text-blue-500"
                    target="_blank"
                    href={`${BaseUrl}/uploads/${eachApplication.resume}`}
                  >
                    Download Resume
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <h1>NO JOB APPLICATIONS FOUND</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminApplications;
