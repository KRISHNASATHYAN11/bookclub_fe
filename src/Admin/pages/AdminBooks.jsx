import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { getAllBooks, getAllUsers } from "../../services/AllApi";
import { AuthContext } from "../../context/AuthContext";
// import AllBooks from "../../pages/AllBooks";


const AdminBooks = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchKey,setSearchKey] = useState("")
  const {token} = useContext(AuthContext)

  useEffect(() => {
    getBookData();
    getUserData();
  }, [searchKey]);

  const getBookData = async () => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllBooks(header, searchKey);
      console.log(apiResponse);
      setAllBooks(apiResponse.data.AllBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllUsers(header);
      if (apiResponse.status == 200) {
        setUserData(apiResponse.data);
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
          <div className="text-center mt-10">
            <button
              onClick={() => {
                setShowBooks(true);
                setShowUsers(false);
              }}
              className="bg-black text-white p-2 rounded me-5 cursor-pointer"
            >
              Books
            </button>
            <button
              onClick={() => {
                setShowBooks(false);
                setShowUsers(true);
              }}
              className="bg-black text-white p-2 rounded me-5 cursor-pointer "
            >
              Users
            </button>
          </div>
          {showBooks && (
            <div>
              <div className="mt-5 text-center ">
                <input onChange={(e)=>setSearchKey(e.target.value)} placeholder="Search" className="p-2 w-1/2 border-2 rounded-2xl" type="text" />
              </div>
              {allBooks?.length > 0 && (
                <div className="grid grid-cols-3 mt-5">
                  {allBooks.map((eachBook) => (
                    <div>
                      <div className="max-w-xs mt-10 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                          <img
                            className="rounded-t-lg w-100 h-75"
                            src={eachBook.imageURL}
                            alt=""
                          />
                        </a>

                        <div className="p-5">
                          <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {eachBook.title}
                            </h5>
                          </a>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {eachBook.abstract}
                          </p>
                          <h6>₹{eachBook.price}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {showUsers && (
            <div>
              {userData?.length > 0 && (
                <div className="grid grid-cols-4 gap-5 mt-10 ">
                  {userData?.map((eachUser) => (
                    <div className="border p-3 bg-amber-100">
                      <h1>{eachUser.userName}</h1>

                      <h1>{eachUser.email}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBooks;
