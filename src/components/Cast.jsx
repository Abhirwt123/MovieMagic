import React, { useEffect, useState } from 'react'
import { API_OPTIONS, PROFILE_ICON, TMDB_URLS } from '../utils/constant';
import { useParams } from 'react-router-dom';
import SliderComp from './Slider';

const Cast = () => {
    const [cast, setCast] = useState();
    const params = useParams()
    const getCaste = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits`, API_OPTIONS);
        const json = await data.json();
        setCast(json.cast)
    }
    useEffect(() => {
        getCaste()
    }, [params.id])
    if (!cast) return;
    return (
        <div className="slider-container mb-6 cast">
            <h1 className='text-4xl text-white py-4'>Cast</h1>
            <SliderComp children={cast.map((profile, index) => {
                return (
                    <div key={index} className='wrap flex flex-col items-center'>
                        <div className='img-wrap max-w-36 h-36 rounded-full overflow-hidden'>
                            <img src={profile.profile_path ? TMDB_URLS.imageUrl + profile.profile_path : PROFILE_ICON} alt="img" className='object-cover w-full h-full' />
                        </div>
                        <div className="info">
                            <p className="name pt-2 text-lg text-zinc-400 text-center">{profile.original_name}</p>
                        </div>
                    </div>
                )
            })} />
        </div>
    )
}

export default Cast
