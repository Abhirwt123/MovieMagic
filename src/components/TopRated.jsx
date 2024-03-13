import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constant';
import SliderComp from './Slider';
import MovieCard from './MovieCard';

const TopRated = () => {
    const[TopRatedMovies, setTopRatedMovies] = useState()
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS);
        const json = await data.json()
        setTopRatedMovies(json.results)
    }
    useEffect(() => {
        getPopularMovies()
    }, [])
    if (!TopRatedMovies) return;
    return (
        <div className="slider-container">
            <h1 className='text-4xl text-white py-4'>Top Rated Movies</h1>
            <SliderComp children={TopRatedMovies.map((movie) => <MovieCard key={movie.id} info={movie} />)} />
        </div>
    )
}


export default TopRated
