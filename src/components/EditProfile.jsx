import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { updateProfile } from "../services/AllApi";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [editData, setEditData] = useState({
    userName: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    setEditData(userDetails);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );

  const handleUploadedImage = (e) => {
    // console.log(e.target.files[0]);
    setEditData({ ...editData, profilePic: e.target.files[0] });

    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateUser = async () => {
    try {
      if (editData.password == editData.confirmPassword) {
        // proceed to api call

        let token = localStorage.getItem("token");
        let header = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        };

        let reqBody = new FormData();
        // fordmdata is used because file uplaoding is happening here.
        // looping through the object to get each and its value
        for (let key in editData) {
          // console.log(key,editData[key])
          // adding each key value pair
          reqBody.append(key, editData[key]);
          // append means add cheyuka
        }

        let apiResponse = await updateProfile(editData._id, reqBody, header);
        console.log(apiResponse);
        if (apiResponse.status == 200) {
          toast.success("profile updated");

          localStorage.setItem('user',JSON.stringify(apiResponse.data.updatedUser))
          setOpenModal(false)
        } else {
          toast.error(apiResponse.response.data.message);
        }
      } else {
        toast.error("password and confirm password is not same");
      }
    } catch (error) {
      console.log(error);
      toast.error("error occurred while updating the profile");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="text-blue-600 border border-blue-600 rounded p-3 hover:bg-blue-600 hover:text-white"
      >
        <FontAwesomeIcon icon={faEdit} />
        Edit
      </button>

      <Modal
        className=" w-100 mt-5 bg-white"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="bg-black">Terms of Service</ModalHeader>
        <ModalBody className="bg-black">
          <div className="space-y-6 flex flex-col items-center">
            <label htmlFor="imgUp">
              <input
                onChange={(e) => handleUploadedImage(e)}
                className="hidden"
                id="imgUp"
                type="file"
              />
              <img className="rounded-full w-50" src={preview} alt="" />
            </label>
            <input
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
              value={editData?.userName}
              placeholder="User Name"
              className="mt-3 bg-white text-black w-75 rounded-xl p-2"
              type="text"
            />
            <input
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              value={editData?.password}
              placeholder="Password"
              className=" bg-white text-black w-75 rounded-xl p-2"
              type="password"
            />
            <input
              onChange={(e) =>
                setEditData({ ...editData, confirmPassword: e.target.value })
              }
              value={editData?.confirmPassword}
              placeholder="Confirm Password"
              className=" bg-white text-black w-75 rounded-xl p-2"
              type="password"
            />
            <textarea
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
              value={editData?.bio}
              placeholder="Bio"
              className=" bg-white text-black w-75 rounded-xl p-2"
              name=""
              id=""
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="text-white bg-blue-500 py-2 px-4 mx-2"
            onClick={updateUser}
          >
            Save Changes
          </Button>
          <Button
            className="text-blue-500 bg-white border-blue-300 py-2 px-4 mx-2"
            color="alternative"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditProfile;
