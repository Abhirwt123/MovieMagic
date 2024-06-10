import React, { useEffect, useState } from 'react'
import { API_OPTIONS, TMDB_URLS } from '../utils/constant'

const Banner = () => {
    const [path,setPath]=useState()
    const getMovieBanner =async ()=>{
        const data =await fetch(TMDB_URLS.nowPlayingMoviesUrl,API_OPTIONS);
        const json = await data.json()
         const RandomNum =Math.floor(Math.random(+1)*20);
        setPath(json.results[RandomNum].backdrop_path)
    }
    useEffect(()=>{
     getMovieBanner()
    },[])
    const bannerStyle = {
        background: `url(${TMDB_URLS.imageUrl/path}) no-repeat top / cover`,
      };
  return (
    <div className='bg-gradient-to-r from-black to-black'>
      <div className="wrap w-full h-[70vh] pt-16" style={bannerStyle}>
        <div className='bg-gradient-to-r from-black h-full'>
        <h1 className=' flex flex-col gap-4 items-center pt-20 text-white m-auto w-8/12'> <p className='text-6xl font-bold  mb-4 text-[#76ABAE]'>WELCOME </p> <p className='text-center text-4xl'>Embark on a cinematic journey like never before as you explore the vast universe of films through our welcoming movie recommendation app.</p></h1>
        </div>
      </div>
    </div>
  )
}

export default Banner
