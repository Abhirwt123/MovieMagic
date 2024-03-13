import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constant';
import SliderComp from './Slider';
import MovieCard from './MovieCard';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { isPopSwitch, isSwitch } from '../Redux/AppSlice';

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState();
    const dispatch =useDispatch()
    const isOn =useSelector((store)=>store.app.isPopularOn);
    const popMovUrl ="https://api.themoviedb.org/3/movie/now_playing";
    const popTvSeriesUrl ="https://api.themoviedb.org/3/tv/popular";
    const toggleSwitch = () => dispatch(isPopSwitch());
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
      };
    const getPopularMovies = async () => {
        const data = await fetch(isOn?popTvSeriesUrl:popMovUrl, API_OPTIONS);
        const json = await data.json()
        setPopularMovies(json.results)
    }
    useEffect(() => {
        getPopularMovies()
    }, [isOn])

    if (!popularMovies) return;
    return (
        <div className="slider-container mb-6">
            <div className=' py-4 flex gap-4'> 
            <p className={`text-4xl ${isOn?"text-white":"text-[#76ABAE]"}`}>Popular Movies </p> 
            <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
            </div>
            <p className={`text-4xl ${!isOn?"text-white":"text-[#76ABAE]"}`}>Popular TV Series </p> </div>
            <SliderComp children={popularMovies.map((movie) => <MovieCard key={movie.id} info={movie} />)} />
        </div>
    )
}

export default PopularMovies
