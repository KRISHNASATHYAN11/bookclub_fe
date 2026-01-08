import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { applyJob, getAllJobs } from "../services/AllApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { toast } from "react-toastify";
const Careers = () => {
  const [jobData, setJobData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [applyData, setApplyData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    qualification: "",
    jobRole: "",
    jobID: "",
    resume: "",
  });
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    let apiResponse = await getAllJobs();

    if (apiResponse.status == 200) {
      setJobData(apiResponse.data);
    }
  };
  console.log(applyData);

  const onApplyBtnClick = (job) => {
    setApplyData({ ...applyData, jobID: job._id, jobRole: job.jobTitle });
    // setApplyData ({...applyData,jobRole:job.jobTitle}) we doesnt use this method because useastate need sometime to update irs state valuem so in thsi situation when we update
    setOpenModal(true);
  };

  const applyJobClick = async () => {
    try {
      let header = {
        "Content-Type": "multipart/form-data",
      };

      let reqBody = new FormData();

      for (let key in applyData) {
        reqBody.append(key, applyData[key]);
      }

      let apiResponse = await applyJob(reqBody, header);
      console.log(apiResponse);

      if (apiResponse.status == 201) {
        toast.success("successfully applied");
        setOpenModal(false)
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while applying job");
    }
  };

  return (
    <>
      <Header />

      <div>
        {jobData?.length > 0 ? (
          <div>
            {jobData.map((eachJob) => (
              <div>
                <div className="border-2 rounded-2xl border-emerald-100 mt-10 p-7 mx-10 bg-emerald-400">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{eachJob.jobTitle}</h1>
                      <div className="flex justify-between p-2 text-xl ">
                        <h1>Salary : {eachJob.salary}</h1>
                        <h1>Location:{eachJob.jobLocation}</h1>
                        <Button
                          className="bg-blue-600 p-2 px-3 border-2 border-white hover:bg-green-900"
                          onClick={() => onApplyBtnClick(eachJob)}
                        >
                          Apply Now
                        </Button>
                      </div>
                      <div className="flex justify-between text-xl text-center p-2">
                        <h1>Published Date:{eachJob.publishedDate} </h1>
                        <h1 className="mx-3">Last Date:{eachJob.lastDate}</h1>
                      </div>
                    </div>
                    <div>
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
              </div>
            ))}
          </div>
        ) : (
          <h1>No Jobs Added</h1>
        )}
      </div>

      <Modal
        className="mx-70"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="font-bold">APPLY JOB</ModalHeader>
        <ModalBody>
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, name: e.target.value })
                }
                placeholder="Name"
                className="bg-white border text-black p-1 rounded-xl"
                type="text"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, email: e.target.value })
                }
                placeholder="Email"
                className="bg-white border text-black p-1 rounded-xl"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-3">
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, phoneNumber: e.target.value })
                }
                placeholder="PhoneNumber"
                className="bg-white border text-black p-1 rounded-xl"
                type="text"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, qualification: e.target.value })
                }
                placeholder="Qualification"
                className="bg-white border text-black p-1 rounded-xl"
                type="text"
              />
              <div className="flex text-black">
                <label htmlFor="resume">Resume : </label>
                <input
                  onChange={(e) =>
                    setApplyData({ ...applyData, resume: e.target.files[0] })
                  }
                  type="file"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-green-500 p-2 "
            onClick={applyJobClick}
          >
            Apply
          </Button>
          <Button
            className="p-2 mx-2"
            color="alternative"
            onClick={() => setOpenModal(false)}
          >
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Careers;
