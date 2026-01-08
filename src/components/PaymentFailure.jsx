import React from "react";

const PaymentFailure = () => {
  return (
    <>
      <div className="grid grid-cols-2 justify-center items-center ">
        <img
          src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1"
          alt=""
        />
        <div className="text-center ">
          <h1 className="text-red-500 text-3xl">Payment Failed .Please try Again Later.</h1>
        </div>
      </div>
    </>
  );
};

export default PaymentFailure;
