import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
const ProfilePopUp = ({popUp,setPopUp}) => {
    const userData =localStorage.getItem('userData');
    const navigate =useNavigate()
    const parseData =JSON.parse(userData);
    const handelLogout =()=>{
        localStorage.clear();
        navigate('/')
    }
  return (
    <div className={`bg-[#222831] text-white shadow-xl rounded-3xl absolute right-2 top-[100%] z-50 w-[30%] border p-2 ${popUp?"hidden":"block"}`}>
       <button className='flex w-full justify-end' ><RxCross2 onClick={()=>setPopUp(true)} className='text-2xl' /></button>
        <div className="wrap p-4 w-full  ">
            <p className="email text-center">{parseData.email}</p>
            <div className="detail wrap">
                <div className="profile-img my-4">
                    <img src={parseData.imgUrl} alt="profile" className='rounded-full w-2/12 m-auto' />
                </div>
                <div className="name text-lg text-center">Hi,{parseData.name}!</div>

                <div className="btn-wrap flex justify-center mt-4">
                    <button className='bg-blue-500 px-4 py-1 rounded-md text-white' onClick={handelLogout}>Log Out</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePopUp

