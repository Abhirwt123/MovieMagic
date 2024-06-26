import React, { useEffect, useState } from 'react'
import { API_OPTIONS, TMDB_URLS } from '../utils/constant';
import SliderComp from './Slider';
import MovieCard from './MovieCard';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { getFavMovie, isNewSwitch } from '../Redux/AppSlice';

const Upcoming = () => {
    const [UpcomingMovies, setUpcomingMovies] = useState()
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const isOn = useSelector((store) => store.app.isLatestOn);
    const toggleSwitch = () => dispatch(isNewSwitch());

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };

    const getPopularMovies = async () => {
        const data = await fetch(isOn ? TMDB_URLS.upcomingTvSeriesUrl : TMDB_URLS.upcomingMoviesUrl, API_OPTIONS);
        const json = await data.json()
        setUpcomingMovies(json.results)
    }
    useEffect(() => {
        getPopularMovies()
    }, [isOn])
    useEffect(() => {
        dispatch(getFavMovie(data))
    }, [data])
    if (!UpcomingMovies) return;
    return (
        <div className="slider-container mb-6">
            <div className=' py-4 flex gap-4'>
                <p className={`text-4xl ${isOn ? "text-white" : "text-[#76ABAE]"}`}>Upcoming Movies </p>
                <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
                    <motion.div className="handle" layout transition={spring} />
                </div>
                <p className={`text-4xl ${!isOn ? "text-white" : "text-[#76ABAE]"}`}>Weakly Top TV Series </p> </div>
            <SliderComp children={UpcomingMovies.map((movie) => <MovieCard data={data} setData={setData} key={movie.id} info={movie} />)} />
        </div>
    )
}


export default Upcoming
