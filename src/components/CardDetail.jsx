import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constant';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cast from './Cast';
import ModalVideo from 'react-modal-video';

const CardDetail = () => {
    const params = useParams();
    const [isOpen, setOpen] = useState(false);
    const isOn = useSelector((store) => store.app.isPopularOn)
    const [detail, setDetail] = useState();
    const movieInfo = `https://api.themoviedb.org/3/movie/${params.id}`
    const tvInfo = `https://api.themoviedb.org/3/tv/${params.id}`
    const getMovieInfo = async () => {
        const data = await fetch(isOn ? tvInfo : movieInfo, API_OPTIONS);
        const json = await data.json();
        setDetail(json)
    }
    useEffect(() => {
        getMovieInfo()
    }, [])
    if (!detail) return;
    const bannerBg = {
        background: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path}) no-repeat top / cover`,
    }
    return (
        <>
            <div className="wrap" style={bannerBg}>
                <div className="overlay bg-gradient-to-r from-zinc-900 bg-opacity-50">
                    <div className='grid grid-cols-12 px-20 py-6 items-center'>
                        <div className="col-span-4">
                            <div className="img-wrap w-96">
                                <img src={"https://image.tmdb.org/t/p/original/" + detail.poster_path} alt="movie" className='w-full rounded-lg' />
                            </div>
                        </div>
                        <div className="col-span-7">
                            <div className="flex flex-col gap-4 text-white">
                                <p className="title text-4xl font-semibold border-b py-4">{detail.title ? detail.title : detail.name} <span>({detail.release_date ? detail.release_date.split("-")[0] : detail.last_air_date.split("-")[0]})</span></p>
                                <div className="flex gap-4 border-b pb-4">
                                    {detail.genres.map((elm) => <p className='px-4 py-1 bg-pink-500 rounded-full'>{elm.name}</p>)}
                                </div>
                                <div className="wrap border-b pb-4 flex items-center gap-4">
                                    <p className=' text-4xl'>{Math.floor(detail.vote_average)}/10</p>
                                    <p className='px-4 py-2 border rounded-lg hover:text-zinc-400 hover:border-zinc-400 cursor-pointer'>Play Trailar</p>
                                </div>
                                <div className='border-b pb-4 flex gap-4 items-center'>
                                    <span className='text-3xl mb-4'>Tag Line : </span>
                                    <span className='text-lg'> {detail.tagline ? detail.tagline : detail.status}</span>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='text-3xl mb-4'>Overview</p>
                                    {detail.overview}
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
                    videoId=''
                    onClose={() => setOpen(false)}
                />
            </div>
        </>
    )
}

export default CardDetail
