import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constant';
import SliderComp from './Slider';
import MovieCard from './MovieCard';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { isNewSwitch } from '../Redux/AppSlice';

const Upcoming = () => {
    const [UpcomingMovies, setUpcomingMovies] = useState()
    const dispatch = useDispatch()
    const isOn = useSelector((store) => store.app.isLatestOn);
    const toggleSwitch = () => dispatch(isNewSwitch());
    const upcomingMovUrl = "https://api.themoviedb.org/3/movie/upcoming";
    const upcomingTvSeriesUrl = "https://api.themoviedb.org/3/tv/on_the_air";

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };

    const getPopularMovies = async () => {
        const data = await fetch(isOn ? upcomingTvSeriesUrl : upcomingMovUrl, API_OPTIONS);
        const json = await data.json()
        setUpcomingMovies(json.results)
    }
    useEffect(() => {
        getPopularMovies()
    }, [isOn])
    if (!UpcomingMovies) return;
    return (
        <div className="slider-container mb-6">
            <div className=' py-4 flex gap-4'>
                <p className={`text-4xl ${isOn ? "text-white" : "text-[#76ABAE]"}`}>Upcoming Movies </p>
                <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
                    <motion.div className="handle" layout transition={spring} />
                </div>
                <p className={`text-4xl ${!isOn ? "text-white" : "text-[#76ABAE]"}`}>Weakly Top TV Series </p> </div>
            <SliderComp children={UpcomingMovies.map((movie) => <MovieCard key={movie.id} info={movie} />)} />
        </div>
    )
}


export default Upcoming
