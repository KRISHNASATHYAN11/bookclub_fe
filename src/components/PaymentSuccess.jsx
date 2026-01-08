import React from 'react'

const PaymentSuccess = () => {
  return (
    <>
    <div className='grid grid-cols-2 justify-center items-center '>
        <img src="https://assets-v2.lottiefiles.com/a/0fec3d74-5606-11ef-8b0e-4ff82aa28e0f/SbuCh7VADR.gif" alt="" />
        <div className='text-center '>
            <h1 className='text-green-500 text-3xl'>Payment Successful</h1>
            <h2 className='text-green-500 text-xl'>Your Order is  Complete</h2>
        </div>
    </div>

    </>
  )
}

export default PaymentSuccess