import React, { useEffect, useState } from 'react'
import { API_OPTIONS, TMDB_URLS } from '../utils/constant';
import SliderComp from './Slider';
import MovieCard from './MovieCard';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { getFavMovie, isPopSwitch } from '../Redux/AppSlice';

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState();
    const [filterVal, setFilterVal] = useState()
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const isOn = useSelector((store) => store.app.isPopularOn);
    const toggleSwitch = () => dispatch(isPopSwitch());
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };
    const getPopularMovies = async () => {
        const data = await fetch(isOn ? TMDB_URLS.popTvSeriesUrl : TMDB_URLS.nowPlayingMoviesUrl, API_OPTIONS);
        const json = await data.json()
        setPopularMovies(json.results)
    }

    const handleFilter = (e) => {
        setFilterVal(e.target.value)
        let x = popularMovies.filter((movie) => movie.vote_average > e.target.value)
        setPopularMovies(x)
    }

    useEffect(() => {
        getPopularMovies()
    }, [isOn, handleFilter])

    useEffect(() => {
        dispatch(getFavMovie(data))
    }, [data])

    if (!popularMovies) return;
    return (
        <div className="slider-container mb-6">
            <div className=' py-4 flex gap-4 justify-between '>
                <div className="flex gap-4">
                    <p className={`text-4xl ${isOn ? "text-white" : "text-[#76ABAE]"}`}>Popular Movies </p>
                    <p className={`text-4xl ${!isOn ? "text-white" : "text-[#76ABAE]"}`}>Popular TV Series </p>
                    <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
                        <motion.div className="handle" layout transition={spring} />
                    </div>
                </div>
                <div className="flex gap-4 ">
                    <p className='text-2xl text-white'>Filter by Rating</p>
                    <select value={filterVal} id="selectFilter" className='px-6 bg-[#76abae] border text-white rounded-lg' onChange={handleFilter}>
                        <option selected>Select</option>
                        <option value="4">4+</option>
                        <option value="6">6+</option>
                        <option value="8">8+</option>
                    </select>
                </div>
            </div>
            <SliderComp children={popularMovies.map((movie) => <MovieCard data={data} setData={setData} key={movie.id} info={movie} />)} />
        </div>
    )
}

export default PopularMovies
