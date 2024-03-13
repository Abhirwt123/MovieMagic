import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constant';

const Trailer = ({movie_id}) => {
    const [trailer,setTrailer] =useState();
    const getTrailer = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos`, API_OPTIONS);
        const json = await data.json();
        setTrailer(json)
    }
    console.log(trailer)
    useEffect(() => {
        getTrailer()
    }, [])
}

export default Trailer
