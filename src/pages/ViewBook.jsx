import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleBook, makePayment } from "../services/AllApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { BaseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const ViewBook = () => {
  const [bookDetail, setBookDetail] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const { token } = useContext(AuthContext);
  const [imageArray, setImageArray] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    getBookDetails();
  }, []);
  // destructured
  // Returns an object of key/value-pairs of the dynamic params from the current URL that were matched by the routes. Child routes inherit all params from their parent routes.

  console.log(id);

  const getBookDetails = async () => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getSingleBook(id, header);
      if (apiResponse.status == 200) {
        setBookDetail(apiResponse.data);
        setImageArray(apiResponse.data.uploadedImages);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong getting book details");
    }
  };

  const onBuyClick = async () => {
    const stripe = await loadStripe(
      "pk_test_51Sl1cgBorw3jwEWgfacnmH8TnAZZX8oRKwFJwsE9r5sfjarVcIzudD4TM6H6YfWsLlHjqTf4ErsqyEfpR3RPCsrE00ef1FdgCQ"
    );

    let header = {
      Authorization: `Bearer ${token}`,
    };

    let reqBody = {
      bookId: bookDetail._id,
      bookName: bookDetail.title,
      bookDesc: bookDetail.abstract,
      sellerMail: bookDetail.userMail,
      bookImage: bookDetail.imageURL,
      price: bookDetail.price,
      discountPrice: bookDetail.discountPrice,
    };

    let apiResponse = await makePayment(reqBody, header);
    if (apiResponse.status == 200) {
      // success operation

      let session = apiResponse.data.session;
      window.location.href = session.url;
    } else {
      toast.error(apiResponse.response.data.message);
    }
  };

  return (
    <>
      <div className="md:p-20 p-5">
        <div className="md:p-10 p-5 shadow w-full ">
          <div className="flex justify-end mb-5 md:mb-10 ">
            <button onClick={() => setOpenModal(true)}>
              <FaEye />
            </button>
          </div>
          <div className="md:grid grid-cols-[1fr_3fr] w-full overflow-x-hidden">
            <div>
              <img src={bookDetail?.imageURL} alt="" />
            </div>
            <div className="px-4 mt-5 md:mt-0">
              <h1 className="text-center font-medium text-2xl">
                {bookDetail?.title}
              </h1>
              <p className="text-blue-500 text-center mt-3 md:mt-0">
                {bookDetail?.author}
              </p>
              <div className="md:flex justify-between mt-10">
                <p>Publisher :{bookDetail?.publisher}</p>
                <p className="mt-3 md:mt-0">Language:{bookDetail?.language}</p>
                <p className="mt-3 md:mt-0">
                  No. of Pages :{bookDetail?.noOfPages}
                </p>
              </div>
              <div className="md:flex justify-between mt-3">
                <p>Seller Mail: {bookDetail?.userMail}</p>
                <p className="mt-3 md:mt-0">Real Price: {bookDetail?.price}</p>
                <p className="mt-3 md:mt-0">ISBN: {bookDetail?.ISBN}</p>
              </div>
              <p className="text-justify mt-10">{bookDetail?.abstract}</p>
              <div className="mt-10 flex justify-end">
                <Link to={"/allbooks"}>
                  <button className="px-4 py-3 bg-blue-800 rounded text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800 flex items-center gap-2">
                    <FaBackward /> Back
                  </button>
                </Link>
                <button onClick={onBuyClick} className="ms-3 px-4 py-3 bg-green-800 rounded text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800 ">
                  Buy $23
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="mt-50 "
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalHeader>Images</ModalHeader>
          <ModalBody>
            {imageArray.map((eachImage) => (
              <img
                className="w-100"
                src={`${BaseUrl}/uploads/${eachImage}`}
                alt=""
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="alternative" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default ViewBook;
