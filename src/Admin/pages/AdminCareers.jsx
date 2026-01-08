import React, { useContext, useEffect, useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import { addJob, deleteJob, getAllJobs } from "../../services/AllApi";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { AuthContext } from "../../context/AuthContext";



const AdminCareers = () => {
  const [jobData, setJobData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [addJobData, setAddJobData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    salary: "",
    experience: "",
    qualification: "",
    lastDate: "",
    publishedDate: "",
  });
  const {token}= useContext(AuthContext)


  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    try {
      let apiResponse = await getAllJobs();
      if (apiResponse.status == 200) {
        setJobData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job details");
    }
  };

  const onDeleteClick = async (id) => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await deleteJob(id, header);
      if (apiResponse.status == 200) {
        toast.success("Successfully deleted");
        getJobData();
      } else {
        toast.error("Something went wrong while deleting");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occurred while deleting the job.");
    }
  };

  const addClick = async () => {
    try {
      // let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await addJob(addJobData, header);

      if(apiResponse.status == 201){
        toast.success(apiResponse.data.message)
      }else{
        toast.error(apiResponse.response.data.message)
      }



    } catch (error) {
      console.log(error);
      toast.error("Error occurred while adding the job");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <AdminSideBar />
        {jobData?.length > 0 && (
          <div>
            <Button
              className="bg-green-500 p-3 px-4 rounded-2xl mx-3 mt-3"
              onClick={() => setOpenModal(true)}
            >
              +ADD NEW JOB
            </Button>
            <Modal
              className="w-[75vh] ml-60"
              dismissible
              show={openModal}
              onClose={() => setOpenModal(false)}
            >
              <ModalHeader className="text-green-500">ADD JOB HERE</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <input
                      onChange={(e) =>
                        setAddJobData({
                          ...addJobData,
                          jobTitle: e.target.value,
                        })
                      }
                      value={addJobData.jobTitle}
                      placeholder=" JobTitle"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        setAddJobData({
                          ...addJobData,
                          jobLocation: e.target.value,
                        })
                      }
                      value={addJobData.jobLocation}
                      placeholder="JobLocation"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                    <textarea
                      onChange={(e) =>
                        setAddJobData({
                          ...addJobData,
                          jobDescription: e.target.value,
                        })
                      }
                      value={addJobData.jobDescription}
                      cols={6}
                      placeholder="JobDescription"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        setAddJobData({ ...addJobData, salary: e.target.value })
                      }
                      value={addJobData.salary}
                      placeholder=" Salary"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                  </div>

                  <div className="space-y-3">
                    <input
                      onChange={(e) =>
                        setAddJobData({
                          ...addJobData,
                          experience: e.target.value,
                        })
                      }
                      value={addJobData.experience}
                      placeholder=" Experience"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        setAddJobData({
                          ...addJobData,
                          qualification: e.target.value,
                        })
                      }
                      value={addJobData.qualification}
                      placeholder="Qualification"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        setAddJobData({
                          ...addJobData,
                          lastDate: e.target.value,
                        })
                      }
                      value={addJobData.lastDate}
                      placeholder="LastDate"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        setAddJobData({
                          ...addJobData,
                          publishedDate: e.target.value,
                        })
                      }
                      value={addJobData.publishedDate}
                      placeholder=" PublishedDate"
                      className="border-2 rounded-2xl p-2 w-full"
                      type="text"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-green-400 mx-3 p-2"
                  onClick={addClick}
                >
                  Add Job
                </Button>
                <Button
                  className="bg-green-400 mx-3 p-2"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            {jobData?.map((eachJob) => (
              <div className="border-2 rounded-2xl border-emerald-100 mt-10 p-7 mx-10 bg-emerald-400">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{eachJob.jobTitle}</h1>
                    <div className="flex justify-between p-2 text-xl ">
                      <h1>{eachJob.salary}</h1>
                      <h1>Location:{eachJob.jobLocation}</h1>
                    </div>
                    <div className="flex justify-between text-xl text-center p-2">
                      <h1>Published Date:{eachJob.publishedDate} </h1>
                      <h1 className="mx-3">Last Date:{eachJob.lastDate}</h1>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => onDeleteClick(eachJob._id)}
                      className="bg-pink-700 border-2 rounded-2xl  p-2 px-3 text-white "
                    >
                      Delete
                    </button>
                    <div className="flex justify-between text-xl ">
                      <h1 className="mx-3">
                        Qualification:{eachJob.qualification}
                      </h1>
                      <h1>Experience:{eachJob.experience}</h1>
                    </div>
                  </div>
                </div>
                <p className="text-justify font-bold">
                  {eachJob.jobDescription}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCareers;
