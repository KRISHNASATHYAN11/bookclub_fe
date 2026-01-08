import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faSignOut, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { AuthContext } from "../context/AuthContext";


const Header = () => {
  // const [token, setToken] = useState("");
  const { removeToken,token } = useContext(AuthContext);
  const navigate = useNavigate()

  
  // if token value change call function[token]

  const onLogoutClick = () => {
    removeToken();
    navigate('/')
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <img
          className="w-25"
          src="https://i.pinimg.com/736x/5c/12/30/5c12306d6bb13619a169023246a41755.jpg"
          alt=""
        />
        <h1 className="text-center text-3xl font-bold">BOOKS CLUB</h1>
        <div className="me-4 flex items-center">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faFacebookF} />

          {token ? (
            <Dropdown
              label={
                <div>
                  <img
                    className="w-10"
                    src="https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg"
                    alt=""
                  />
                </div>
              }
            >
              <DropdownHeader>
                <DropdownItem>
                  <Link to={"/profile"}>
                    <FontAwesomeIcon icon={faUser} />
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <button onClick={onLogoutClick}>
                    <FontAwesomeIcon icon={faSignOut} /> Logout
                  </button>
                </DropdownItem>
              </DropdownHeader>
            </Dropdown>
          ) : (
            <Link to={"/login"}>
              <button className="border-2 p-3 font-bold hover:bg-black hover:text-white rounded-2xl">
                <FontAwesomeIcon icon={faUser} />
                LOGIN
              </button>
            </Link>
          )}
        </div>
      </div>

      <nav className="p-3 w-full bg-gray-900 text-white md:flex justify-center items-center">
        <div className="flex justify-between items-center px-3 ">
          <ul className="md:flex justify-center ">
            <li className="mx-4 mt-3 md:mt-0">
              <Link to="/">Home</Link>
            </li>

            <li className="mx-4 mt-3 md:mt-0">
              <Link to="/allBooks">Books</Link>
            </li>

            <li className="mx-4 mt-3 md:mt-0">
              <Link to="/careers">Careers</Link>
            </li>

            <li className="mx-4 mt-3 md:mt-0">
              <Link to="/contact">Contacts</Link>
                
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
