import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBooks } from "../services/AllApi";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Header from '../components/Header'

const AllBooks = () => {

  const navigate = useNavigate()
  const {token}= useContext(AuthContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dummyBooks, setDummyBooks] = useState([]);
  const [search, setSearch] = useState('');
  

  useEffect(() => {
    // let token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      getBookData();
    }
  }, [search]);


  const getBookData = async () => {
    try {
      // let token = localStorage.getItem("token");

      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllBooks(reqHeader,search);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.AllBooks);
        setDummyBooks(apiResponse.data.AllBooks);

        let catArray = apiResponse.data.AllBooks.map(
          (eachBook) => eachBook.category
        );
        let dummyCat = [];
        // to avoid adding same category again and again.
        catArray.forEach((eachCategory) => {
          if (!dummyCat.includes(eachCategory)) {
            console.log(eachCategory);
            dummyCat.push(eachCategory);
          }
        });
        console.log(dummyCat);
        setCategories(dummyCat);
      } else {
        toast.error(apiResponse.response.data.message);
        navigate('/login')
      }
    } catch (error) {
      toast.error("error occuured while calling the api");
      console.log(error);
    }
  };

  const filterBooks = (category) => {
    let filteredBooks = dummyBooks.filter(
      (eachBook) => eachBook.category == category
    );
    setBookData(filteredBooks);
  };

  return (
    <>
    <Header/>
      {isLoggedIn ? (
        <>
          <div className="flex justify-center items-center flex-col">
            <h1 className=" mt-5 text-3xl font-medium">Collections</h1>
            <div className="flex w-full my-8 justify-center items-center">
              <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search By Title"
                className="border border-gray-200 placeholder-gray-200 p-2 md:w-1/4 w-1/2"
                type="text"
              />
              <button className="bg-blue-900 text-white py-2 px-3 shadow hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white">
                Search
              </button>
            </div>
          </div>

          <div className="md:grid grid-cols-[1fr_4fr] md:py-10 md:px-20 p-5">
            <div>
              <div className="flex my-3 justify between">
                <h1 className="text-2xl font-medium">Filters</h1>
              </div>
              <div className="md:block justify-center hidden">
                <button
                  onClick={getBookData}
                  className="border px-2 ms-2 bg-green-600 text-white "
                >
                  All
                </button>
                {categories?.map((eachCategory, index) => (
                  <div onClick={() => filterBooks(eachCategory)}>
                    <div className="mt-3">
                      <input id={index} type="radio" name="filter" />
                      <label htmlFor={index} className="ms-3">
                        {eachCategory}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {bookData?.length > 0 && (
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-15">
                  {bookData.map((eachBook) => (
                    <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                      <Link to={""}>
                        <img
                          style={{ width: "100%", height: "200px" }}
                          className="rounded-t-lg"
                          src={eachBook.imageURL}
                          alt="imageURL"
                        />
                      </Link>
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {eachBook.title}
                        </h5>
                        <h6 className="text-blue-400">{eachBook.author}</h6>
                        <h6 className="text-green-800">{eachBook.category}</h6>
                        <h6>₹{eachBook.price}</h6>
                        <h6> Discount :₹{eachBook.discountPrice}</h6>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {eachBook.abstract}
                        </p>
                        <Link
                          to={`/${eachBook._id}/viewbook`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          View Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center gap-3">
          <img
            className="w-100"
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
          />
          <h1>Books are listed only for login users</h1>
          <Link to={"/login"}>Login Here</Link>
        </div>
      )}
    </>
  );
};

export default AllBooks;
