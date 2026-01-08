import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLimitedBooks } from "../services/AllApi";
import Header from "../components/Header";
import { toast } from "react-toastify";



const Home = () => {
  const [homeBooks, setHomeBooks] = useState([]);

 

  useEffect(() => {
    getHomeBooks();
  }, []);

  const getHomeBooks = async () => {
    try {
      let apiResponse = await getLimitedBooks();
      if (apiResponse.status == 200) {
        setHomeBooks(apiResponse.data.limitedBooks);

      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error getting Home books");
    }
  };

  return (
    <>
    <Header/>
      <div className=" header flex justify-center items-center">
        <div id="main" className="flex justify-center w-full">
          <div className="md:grid grid-cols-3 w-full">
            <div></div>
            <div className="text-white flex justify-center flex-col px-5">
              <h1 className="text-5xl">Wonderful Gifts</h1>
              <p>Give Your Family And Friends a book</p>
              <div className="flex mt-10 w-full">
                <input
                  placeholder="Search Books"
                  className="py-2 px-4 bg-white rounded-3xl placeholder-gray-400 w-full text-black"
                  type="text"
                />
                <FontAwesomeIcon
                  className="text-black"
                  style={{ marginTop: "11px", marginLeft: "-30px" }}
                  icon={faSearch}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <section className="flex justify-center items-center flex-col md:p-10 md:px-40 p-5">
        <h2>NEW ARRIVALS</h2>
        <h4 className="text-2xl">Explore Our Latest Collection</h4>

        {homeBooks?.length > 0 && (
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-20">
            {homeBooks?.map((eachBook) => (
              <div className="max-w-sm mt-10 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src={eachBook.imageURL} alt="" />
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
            ))}
          </div>
        )}

        <div>
          <Link to={"/allBooks"}>
            <button className="px-3 py-2 mt-10 bg-blue-900 text-white border-blue-900 hover:text-blue-900 hover:bg-blue-100">
              Explore More
            </button>
          </Link>
        </div>
      </section>

      <section className="flex justify-center items-center flex-col md:p-10 md:px-40 p-5">
        <div className="md:grid grid-cols-2 w-full">
          <div>
            <div className="flex justify-center items-center flex-col">
              <h4>FEATURED AUTHORS</h4>
              <h3 className="text-2xl">Captivates With Every Word</h3>
            </div>
            <p className="mt-6  text-justify">
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
              laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
              Modi, molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Sunt earum possimus accusantium necessitatibus
              id neque soluta quibusdam explicabo laborum? Deserunt vel quia
              voluptates dicta incidunt illo fuga pariatur sequi error.
            </p>

            <p className="mt-5  text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
              laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
              Modi, molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Sunt earum possimus accusantium necessitatibus
              id neque soluta quibusdam explicabo laborum? Deserunt vel quia
              voluptates dicta incidunt illo fuga pariatur sequi error.
            </p>
          </div>
          <div className="px-10 pt-8">
            <img
              className="w-full"
              src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg"
              alt=""
            />
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center flex-col md:py-10 md:px-40 p-6">
        <h3>Testimony</h3>
        <h3 className="text-2xl">See What Others Are Saying</h3>
        <img
          className="mt-5"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
        <h6>Treesa Joseph</h6>
        <p className="mt-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
          perspiciatis porro eveniet. Optio necessitatibus provident autem, quam
          qui, dicta molestiae quis quia deleniti aliquam magnam temporibus
          mollitia ex repellendus! Dicta. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consequuntur, deserunt optio eum dolorum iure
          consectetur quia facilis porro modi placeat ea quis explicabo maxime
          voluptatum unde animi nemo aperiam quos!
        </p>
      </div>
    </>
  );
};

export default Home;
