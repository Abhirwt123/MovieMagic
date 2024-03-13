import React, { useEffect, useState } from 'react'
import { API_OPTIONS, PROFILE_ICON } from '../utils/constant';
import { useParams } from 'react-router-dom';
import SliderComp from './Slider';

const Cast = () => {
    const [cast, setCast] = useState();
    const params = useParams()
    console.log(params.id)
    const getCaste = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits`, API_OPTIONS);
        const json = await data.json();
        setCast(json.cast)
    }
    console.log(cast)
    useEffect(() => {
        getCaste()
    }, [])
    if (!cast) return;
    return (
        <div className="slider-container mb-6">
            <h1 className='text-4xl text-white py-4'>Caste</h1>
            <SliderComp children={cast.map((profile) => {
                return (
                   <div className='wrap'>
                    <div key={profile.cast_id} className='img-wrap max-w-36 h-36 rounded-full overflow-hidden'>
                        <img src={profile.profile_path?"https://image.tmdb.org/t/p/original/" + profile.profile_path:PROFILE_ICON} alt="img" className='object-cover w-full h-full' />
                    </div>
                    <div className="info">
                        <p className="name text-center pt-2 text-lg text-zinc-400">{profile.original_name}</p>
                    </div>
                    </div>
                )
            })} />
        </div>
    )
}

export default Cast
