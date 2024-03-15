import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import ProfilePopUp from './Profile';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchQuery } from '../Redux/AppSlice';
import AddDummyData from './MyList';

const Header = () => {
    const [popUp, setPopUp] = useState(true);
    const [text, setText] = useState();
    const dispatch =useDispatch()
    const navigate= useNavigate()
    const profileUrl = localStorage.getItem("userData");
    const parseData = JSON.parse(profileUrl);
    const handleMovieSearch = () => {
        dispatch(getSearchQuery(text))
            navigate('/search')
    }
    return (
        <div className='fixed top-0 w-full bg-[#222831] z-50 shadow-2xl'>
            <AddDummyData/>
            <div className="wrap p-4 flex items-center justify-between">
                <div className="logo">
                    <p className='text-3xl font-bold text-[#FFE6E6] cursor-pointer' onClick={()=>navigate('/home')}>MovieMagic</p>
                </div>
                <div className="searcBox w-4/12">
                    <form action="#" className='flex' onSubmit={(e)=>e.preventDefault()}>
                        <input type="text" className='px-6 py-2 rounded-s-full w-full bg-transparent border outline-none text-white' value={text} onChange={(e) => setText(e.target.value)} />
                        <button className='rounded-e-full py-2 px-4 text-2xl bg-white' onClick={handleMovieSearch}><CiSearch /></button>
                    </form>
                </div>
                <div className="profile">
                    {parseData.imgUrl ? <img src={parseData.imgUrl} className='text-3xl w-10 h-10 rounded-full text-white cursor-pointer' onClick={() => setPopUp(false)} /> : <CgProfile className='w-10 h-10 rounded-full' />}
                </div>
            </div>
            <ProfilePopUp popUp={popUp} setPopUp={setPopUp} />
        </div>
    )
}

export default Header
