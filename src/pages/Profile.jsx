import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addBook, getBuyBooks, getSoldBooks } from "../services/AllApi";
import EditProfile from "../components/EditProfile";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const [sellBookFlag, setSellBookFlag] = useState(true);
  const [bookStatusFlag, setBookStatusFlag] = useState(false);
  const [purchaseFlag, setPurchaseFlag] = useState(false);
  const [userData, setUserData] = useState({});
  const [soldBookData, setSoldBookData] = useState([]);
  const [buyBookData, setBuyBookData] = useState([]);

  const [uploadedImage, setUploadedImage] = useState(null);

  const { token } = useContext(AuthContext);

  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
  );

  const [previewList, setPreviewList] = useState([]);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: 0,
    abstract: "",
    noOfPages: 0,
    imageURL: "",
    uploadedImages: [],
    discountPrice: 0,
    publisher: "",
    language: "",
    ISBN: "",
    category: "",
  });

  useEffect(() => {
    loadProfileData();
    getSoldBooksList();
    getBuyBooksList();
  }, []);

  const loadProfileData = () => {
    let userDetails = localStorage.getItem("user");

    userDetails = JSON.parse(userDetails);
    setUserData(userDetails);
  };

  const handleUploadedImage = (e) => {
    console.log(e.target.files[0]);
    setBookData({
      ...bookData,
      uploadedImages: [...bookData.uploadedImages, e.target.files[0]],
    });
    // setUploadedImage(e.target.value);
    setPreview(URL.createObjectURL(e.target.files[0]));
    // previewlistil ullathum current add cheyunnathum

    if (previewList.length <= 2) {
      setPreviewList([...previewList, URL.createObjectURL(e.target.files[0])]);
    }
  };

  const onAddBookClick = async () => {
    try {
      if (
        bookData.title == "" ||
        bookData.ISBN == "" ||
        bookData.abstract == "" ||
        bookData.category == "" ||
        bookData.author == "" ||
        bookData.language == "" ||
        bookData.imageURL == "" ||
        bookData.publisher == "" ||
        bookData.price == 0 ||
        bookData.discountPrice == 0 ||
        bookData.noOfPages == 0 ||
        bookData.uploadedImages == []
      ) {
        toast.warning("please fill the form");
      } else {
        // api call proceed

        // create a new formdata
        let reqBody = new FormData();
        // loops through thr bookdata obj to access all the key (title,. author etc)
        for (let key in bookData) {
          // we need all keys except the key containinng the file (because logic is different for uploadingimages since it is array of files, we need to loop through the array and get each files)
          if (key != "uploadedImages") {
            reqBody.append(key, bookData[key]);
            // add each key and its value to reqbody,bracket notation is used
          } else {
            bookData.uploadedImages.forEach((eachFile) => {
              reqBody.append("uploadedImages", eachFile);
            });
          }
        }
        // let token = localStorage.getItem("token");
        let header = {
          // bearer token and multipart / formdata
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        let apiResponse = await addBook(reqBody, header);
        if (apiResponse.status == 201) {
          toast.success("successfully added the book");
        } else {
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error Occurred While Adding Book");
    }
  };

  const getSoldBooksList = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getSoldBooks(header);

      if (apiResponse.status == 200) {
        setSoldBookData(apiResponse.data);

        // store the data in a state.
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occurred while getting sold books details.");
    }
  };

  const getBuyBooksList = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getBuyBooks(header);

      if (apiResponse.status == 200) {
        setBuyBookData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting buyer book list.");
    }
  };

  return (
    <>
      <div style={{ height: "200px" }} className="bg-gray-900 "></div>
      <div
        className="bg-white p-3"
        style={{
          width: "230px",
          height: "230px",
          borderRadius: "50%",
          marginLeft: "70px",
          marginTop: "-130px",
        }}
      >
        <img
          style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          src={userData?.profilePic}
          alt=""
        />
      </div>
      <div className="md:flex justify-between px-20 mt-5">
        <p className="flex justify-center items-center">
          <span className="md:text-3xl text-2xl">
            {userData?.userName}
            <FontAwesomeIcon className="text-blue-400" icon={faCheckCircle} />
          </span>
        </p>
        <div className="flex justify-end mt-5 md:mt-0">
          <EditProfile />
        </div>
      </div>
      <p className="md:px-20 px-5 my-5 text-justify">{userData?.bio}</p>

      <div className="md:px-40">
        <div className="flex justify-center items-center my-5">
          <button
            onClick={() => {
              setSellBookFlag(true);
              setBookStatusFlag(false);
              setPurchaseFlag(false);
            }}
            className="mx-2 box-border border border-blue-400 p-3 rounded-2xl"
          >
            Sell Books
          </button>
          <button
            onClick={() => {
              setSellBookFlag(false);
              setBookStatusFlag(true);
              setPurchaseFlag(false);
            }}
            className="mx-2 box-border border border-blue-400 p-3 rounded-2xl"
          >
            Sold Books
          </button>
          <button
            onClick={() => {
              setSellBookFlag(false);
              setBookStatusFlag(false);
              setPurchaseFlag(true);
            }}
            className="mx-2 box-border border border-blue-400 p-3 rounded-2xl"
          >
            Purchase History
          </button>
        </div>
      </div>

      {sellBookFlag && (
        <div className="bg-gray-200 p-10 my-20 mx-5">
          <h1 className="text-center text-3xl font-medium">Book Details</h1>
          <div className="md:grid grid-cols-2 mt-10 w-full">
            <div className="px-3">
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, title: e.target.value })
                  }
                  placeholder="Title"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, author: e.target.value })
                  }
                  placeholder="Author"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, noOfPages: e.target.value })
                  }
                  placeholder="No. of Pages"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, imageURL: e.target.value })
                  }
                  placeholder="Image Url"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, price: e.target.value })
                  }
                  placeholder="Price"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, discountPrice: e.target.value })
                  }
                  placeholder="Discount"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <textarea
                  onChange={(e) =>
                    setBookData({ ...bookData, abstract: e.target.value })
                  }
                  placeholder="Abstarct"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
            <div className="px-3">
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, publisher: e.target.value })
                  }
                  placeholder="Publisher"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, language: e.target.value })
                  }
                  placeholder="Language"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, ISBN: e.target.value })
                  }
                  placeholder="ISBN"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, category: e.target.value })
                  }
                  placeholder="Category"
                  className="p-2 bg-white rounded placeholder-gray-300 w-full"
                  type="text"
                />
              </div>
              <div className="mb-3  w-full mt-2">
                <label htmlFor="imgUpload">
                  <img className="w-50" src={preview} alt="" />

                  <input
                    className="hidden"
                    onChange={(e) => handleUploadedImage(e)}
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    name=""
                    id="imgUpload"
                  />
                </label>
                <div className="flex gap-2 mt-3 mx-2">
                  {previewList.length > 0 &&
                    previewList.map((eachPreview) => (
                      <img className="w-25" src={eachPreview} alt="" />
                    ))}

                  {previewList.length > 0 && previewList.length <= 2 && (
                    <label htmlFor="imgq">
                      <img
                        className="w-10"
                        src="https://png.pngtree.com/element_our/20190602/ourmid/pngtree-volume-plus-button-illustration-image_1426363.jpg"
                        alt=""
                      />
                      <input
                        className="hidden"
                        onChange={(e) => handleUploadedImage(e)}
                        type="file"
                        name=""
                        id="imgq"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end justify-center mt-8">
            <button className="bg-amber-600 rounde text-black p-3 px-5 mx-3 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600">
              Reset
            </button>
            <button
              onClick={onAddBookClick}
              className="bg-green-600 rounde text-white p-3 px-5 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {bookStatusFlag && (
        <div>
          {soldBookData.length > 0 && (
            <div  className="flex justify-around gap-5  ">
              {soldBookData.map((eachBook) => (
                <div className="bg-red-200 p-5 rounded-2xl text-justify">
                  <h1>Book Name :{eachBook.bookName}</h1>
                  <h1>Book Id :{eachBook.bookId}</h1>
                  <h1>Book Description : {eachBook.bookDesc}</h1>
                  <h1>Seller Mail :{eachBook.sellerMail}</h1>
                  <h1>Buyer Mail : {eachBook.buyerMail}</h1>
                  <h1>Price : {eachBook.price}</h1>
                  <h1>Discount Price :{eachBook.discountPrice}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {purchaseFlag && (
        <div>
          {buyBookData.length > 0 && (
            <div className="flex justify-around gap-5 container ">
              {buyBookData.map((eachBook) => (
                <div className="bg-emerald-200 p-5 rounded-2xl text-justify">
                  <h1>Book Name :{eachBook.bookName}</h1>
                  <h1>Book Id : {eachBook.bookId}</h1>
                  <h1>Book description : {eachBook.bookDesc}</h1>
                  <h1>Seller Mail : {eachBook.sellerMail}</h1>
                  <h1>Buyer Mail : {eachBook.buyerMail}</h1>
                  <h1>Price : {eachBook.price}</h1>
                  <h1>Discount Price : {eachBook.discountPrice}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
