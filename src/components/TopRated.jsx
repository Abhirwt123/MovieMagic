import React, { useEffect, useState } from 'react'
import { API_OPTIONS, TMDB_URLS } from '../utils/constant';
import SliderComp from './Slider';
import MovieCard from './MovieCard';
import { getFavMovie } from '../Redux/AppSlice';
import { useDispatch } from 'react-redux';

const TopRated = () => {
    const[TopRatedMovies, setTopRatedMovies] = useState()
    const [data, setData] = useState([])
    const dispatch =useDispatch()
    const getPopularMovies = async () => {
        const data = await fetch(TMDB_URLS.topRatedMoviesUrl, API_OPTIONS);
        const json = await data.json()
        setTopRatedMovies(json.results)
    }
    useEffect(() => {
        getPopularMovies()
    }, [])
    useEffect(() => {
        dispatch(getFavMovie(data))
    }, [data])
    if (!TopRatedMovies) return;
    return (
        <div className="slider-container">
            <h1 className='text-4xl text-white py-4'>Top Rated Movies</h1>
            <SliderComp children={TopRatedMovies.map((movie) => <MovieCard data={data} setData={setData} key={movie.id} info={movie} />)} />
        </div>
    )
}


export default TopRated
