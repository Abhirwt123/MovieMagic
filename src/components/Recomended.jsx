import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constant';
import { useParams } from 'react-router-dom';
import SliderComp from './Slider';
import MovieCard from './MovieCard';
import { getFavMovie } from '../Redux/AppSlice';
import { useDispatch } from 'react-redux';

const Recomended = () => {
    const dispatch=useDispatch()
    const [recomendedList, setRecomendedList] = useState();
    const [data, setData] = useState([])
    const params = useParams();
    const getRecomendedData = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/recommendations`, API_OPTIONS);
        const json = await data.json();
        setRecomendedList(json.results)
    }
    useEffect(() => {
        getRecomendedData();
    }, [params.id])
    useEffect(() => {
        dispatch(getFavMovie(data))
    }, [data])
    if (!recomendedList) return;
     return (
        <div className='slider-container px-20'>
            <h1 className='text-4xl pb-4 font-semibold text-white'>Recomended Movies</h1>
            <SliderComp children={recomendedList.map((movie) => <MovieCard data={data} setData={setData} key={movie.key} info={movie} />)} />
        </div>
    )
}

export default Recomended
