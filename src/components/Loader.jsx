import React from 'react'
import loaderImage from '../assets/loading.gif'

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <img src={loaderImage} alt="" />
    </div>
  )
}

export default Loader