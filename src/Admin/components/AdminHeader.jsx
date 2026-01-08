import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AdminHeader = () => {
  return (
    <>
      <div className="flex justify-between mx-15">
        <div className="flex items-center ">
          <img
            className="w-25"
            src="https://i.pinimg.com/736x/5c/12/30/5c12306d6bb13619a169023246a41755.jpg"
            alt=""
          />
          <h1 className="text-2xl font-bold">Book Club</h1>
        </div>

        <button className="cursor-pointer hover:text-xl  ">
          <FontAwesomeIcon icon={faSignOut} />
          Log Out
        </button>
      </div>

      <div className="bg-black text-white p-3">
        <marquee behavior="" direction="">
          WELCOME TO ADMIN INTERFACE .YOU ARE ALL SET TO MONITOR THE SYSYTEM.YOU
          ARE ALL SET TO WORK ! ! ! 😊😊😊😊😊
        </marquee>
      </div>
    </>
  );
};

export default AdminHeader;
