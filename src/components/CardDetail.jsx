import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cast from './Cast';
import ModalVideo from 'react-modal-video';
import useTrailerKey from '../Hooks/Trailer';
import { API_OPTIONS } from '../utils/constant';

const CardDetail = () => {
    const params = useParams();
    const trailerKey = useTrailerKey(params.id);
    const [detail, setDetail] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const isOn = useSelector((store) => store.app.isPopularOn);
    const mediaType = isOn ? 'tv' : 'movie';
    const mediaInfoUrl = `https://api.themoviedb.org/3/${mediaType}/${params.id}`;
    
    const fetchMediaInfo = async () => {
        const response = await fetch(mediaInfoUrl, API_OPTIONS);
        const data = await response.json();
        setDetail(data);
    };

    useEffect(() => {
        fetchMediaInfo();
    }, [params.id]);

    if (!detail) return null;

    const { backdrop_path, poster_path, title, name, release_date, last_air_date, genres, vote_average, tagline, status, overview } = detail;
    const mediaTitle = title || name;
    const releaseYear = release_date ? release_date.split('-')[0] : last_air_date.split('-')[0];

    const bannerBg = {
        background: `url(https://image.tmdb.org/t/p/original/${backdrop_path}) no-repeat top / cover`,
    };

    return (
        <>
            <div className="wrap" style={bannerBg}>
                <div className="overlay bg-gradient-to-r from-zinc-900 bg-opacity-50">
                    <div className='grid grid-cols-12 px-20 py-6 items-center'>
                        <div className="col-span-4">
                            <div className="img-wrap w-96">
                                <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="movie" className='w-full rounded-lg' />
                            </div>
                        </div>
                        <div className="col-span-7">
                            <div className="flex flex-col gap-4 text-white">
                                <p className="title text-4xl font-semibold border-b py-4">{mediaTitle} <span>({releaseYear})</span></p>
                                <div className="flex gap-4 border-b pb-4">
                                    {genres.map((genre, index) => <p key={index} className='px-4 py-1 bg-pink-500 rounded-full'>{genre.name}</p>)}
                                </div>
                                <div className="wrap border-b pb-4 flex items-center gap-4">
                                    <p className=' text-4xl'>{Math.floor(vote_average)}/10</p>
                                    <button className='px-4 py-2 border rounded-lg hover:text-zinc-400 hover:border-zinc-400 cursor-pointer' onClick={() => setOpen(true)}>Play Trailer</button>
                                </div>
                                <div className='border-b pb-4 flex gap-4 items-center'>
                                    <span className='text-3xl mb-4'>Tag Line : </span>
                                    <span className='text-lg'>{tagline || status}</span>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='text-3xl mb-4'>Overview</p>
                                    {overview}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body px-20 py-6">
                <Cast />
                <ModalVideo
                    channel="youtube"
                    youtube={{ mute: 0, autoplay: 0 }}
                    isOpen={isOpen}
                    videoId={trailerKey}
                    onClose={() => setOpen(false)}
                />
            </div>
        </>
    );
};

export default CardDetail;
