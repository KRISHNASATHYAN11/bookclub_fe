import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="md:grid grid-cols-3 bg-gray-800 md:p-10 p-5 text-white">
        <div>
          <h4>About Us</h4>
          <p className="mt-4 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            quaerat placeat est, quasi eveniet quis dolorem qui voluptate! Velit
            voluptatum molestias modi fuga voluptatibus aspernatur at odit
            nesciunt quidem perferendis.z
          </p>
        </div>

        <div className="md:flex justify-center">
          <div className="mt-4 md:mt-5">
            <h4>NEWSLETTER</h4>
            <p className="mt-4 text-justify">
              Stay updated with our latest trends
            </p>
            <div className="flex mt-3">
              <input
                placeholder="Email ID"
                className="bg-white placeholder-gray-600 p-2"
                type="email"
                name=""
                id=""
              />
              <button className="bg-yellow-300 py-2 px-3 text-black font-extrabold">
                →
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <h4>Follow Us</h4>
          <p className="mt-4">Let us be social </p>
          <div>
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faX} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
        </div>
      </div>
      <div className="bg-black p-3 flex justify-center items-center text-white">
        <h6 className="text-center" style={{ fontSize: "10px" }}>
          Copyright © 2023 All rights reserved{" "}
        </h6>
      </div>
    </>
  );
};

export default Footer;
