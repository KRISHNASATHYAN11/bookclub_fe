import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/AllApi";
import { AuthContext } from "../../context/AuthContext";


const AdminSettings = () => {
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );
  const [profileData, setProfileData] = useState({
    userName: "",
    profilePic: "",
    password: "",
    confimPassword: "",
  });
  const {token}= useContext(AuthContext)

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"));
    setProfileData(userData);
  }, []);

  const handleUploadedImage = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setProfileData({ ...profileData, profilePic: e.target.files[0] });
  };

  const onSubmitClick = async () => {
    try {
      if (
        profileData.userName == "" ||
        profileData.password == "" ||
        profileData.confimPassword == ""
      ) {
        toast.error("please fill the form");
      } else {
        if (profileData.password == profileData.confimPassword) {
          // proceed to api call
          // let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };
          let reqBody = new FormData();
          for (let key in profileData) {
            reqBody.append(key, profileData[key]);
          }
          let apiResponse = await updateProfile(
            profileData._id,
            reqBody,
            header
          );
          console.log(apiResponse);

          if (apiResponse.status == 200) {
            toast.success("Successfully updated");
            localStorage.setItem(
              "user",
              JSON.stringify(apiResponse.data.updatedUser)
            );
          } else {
            toast.error(apiResponse.response.data.message);
          }
        } else {
          toast.error("password and confirm password is not the same");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <AdminSideBar />
        <div>
          <h1 className="text-center text-3xl font-bold">SETTINGS</h1>
          <div className="grid grid-cols-2 gap-10 ">
            <div className="ms-10 mt-10">
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                adipisci officia optio blanditiis aliquam nam delectus,
                veritatis alias laboriosam laborum, minima nihil necessitatibus
                temporibus. Recusandae voluptatum quaerat dicta perferendis
                temporibus.
              </p>
              <p className="text-justify mt-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Recusandae mollitia doloremque inventore illum, aliquid fugiat
                adipisci iste tempore, dolorem consequatur, quam eum nesciunt
                sunt cupiditate ex maxime. Quos, ad labore!
              </p>
            </div>
            <div className="bg-amber-100 p-10 mt-10 me-3 rounded-xl">
              <label htmlFor="inp">
                <input
                  onChange={(e) => handleUploadedImage(e)}
                  className="hidden"
                  type="file"
                  id="inp"
                />
                <img className="w-50" src={preview} alt="" />
              </label>
              <div className="mt-10">
                <input
                  value={profileData.userName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, userName: e.target.value })
                  }
                  placeholder="UserName"
                  className="bg-white text-black w-full p-2 rounded-2xl "
                  type="text"
                />
              </div>
              <div className="mt-5">
                <input
                  value={profileData.password}
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  placeholder="Password"
                  className="bg-white text-black w-full p-2 rounded-2xl "
                  type="text"
                />
              </div>
              <div className="mt-5">
                <input
                  value={profileData.confimPassword}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      confimPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                  className="bg-white text-black w-full p-2 rounded-2xl "
                  type="text"
                />
              </div>
              <div className="mt-5 text-center">
                <button className=" bg-blue-400 p-2 w-30 rounded-2xl text-xl text-white ">
                  Reset
                </button>
                <button
                  onClick={onSubmitClick}
                  className=" bg-green-400 p-2 w-30 rounded-2xl text-xl ms-3 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
