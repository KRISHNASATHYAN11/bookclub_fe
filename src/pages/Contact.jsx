import React from "react";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import Header from "../components/Header";

const Contact = () => {
  return (
    <>
    <Header/>
      <div className="flex justify-center items-center flex-col md:px-40 px-10">
        <h1 className="my-5 text-3xl font-medium ">Contacts</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus ab
          id cupiditate atque suscipit voluptatum quisquam accusantium repellat
          odio. Ab quas neque recusandae aperiam iusto nulla? Expedita
          consequatur sequi nesciunt!
        </p>
      </div>

      <div className="md:grid grid-cols-3 md:px-40 my-10 px-20">
        <div className="flex items-center md:justify-center  ">
          <div
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            className="flex justify-center items-center bg-gray-100 "
          >
            <IoLocation style={{ width: "50px" }} />
          </div>
          <p className="ms-3 mt-2">
            123 Main Street, Apt 4B, <br /> Anytown, CA 91234
          </p>
        </div>

        <div className="flex items-center md:justify-center mt-5 md:mt-0 ">
          <div
            className="flex justify-center items-center bg-gray-200 text-gray-900"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          >
            <FaPhoneAlt style={{ width: "50px" }} />
          </div>
          <p className="ms-3 mt-3">9887764354</p>
        </div>

         <div className="flex items-center md:justify-center mt-5 md:mt-0">
        <div
          className="flex justify-center items-center bg-gray-200 text-gray-900"
          style={{ width: "40px", height: " 40px", borderRadius: "50%" }}
        >
          <FaEnvelope style={{ width: "50px" }} />
        </div>
         <p className="ms-3 mt-3">bookclub@gmail.com</p>
      </div>
     
      </div>

      <div className="md:grid grid-cols-2 md:px-60 my-5">
        <div>
          <div className="p-4 shadow bg-gray-200 ">
            <h4 className="text-center mb-4 text-gray-900 font-medium">Send Me Message</h4>
            <div className="mb-3">
              <input placeholder="Name" className="p-2 rounded placeholder-gray-600 bg-white w-full"  type="text" />
            </div>
            <div className="mb-3">
              <input placeholder="Email ID" className="p-2 rounded placeholder-gray-600 bg-white w-full"  type="text" />

            </div>
            <div className="mb-3">
              <textarea className="p-2 rounded placeholder-gray-600 bg-white w-full" placeholder="Message" rows={6} name="" id=""></textarea>
            </div>
            <div className="mb-3">
              
              <button className="bg-gray-900 text-white p-3 w-full">Send</button>
            </div>

          </div>
        </div>


        <div className="mt-5 md:mt-0 md:px-10">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63129.93087117471!2d76.91165!3d8.536156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbd5991406c3%3A0x3238f56403beb497!2sThe%20Reading%20Room%20Trivandrum!5e0!3m2!1sen!2sin!4v1764513074012!5m2!1sen!2sin" style={{width:"800", height:"600",border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

     
    </>
  );
};

export default Contact;
