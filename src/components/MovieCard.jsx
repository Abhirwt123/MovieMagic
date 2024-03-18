import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DUMMY_MOVIE_POSTER } from '../utils/constant';
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { auth, database } from '../Firebase/Firebase';
import { ref, set, push } from 'firebase/database';

const MovieCard = ({ info, data, setData }) => {
  const [isFav, setIsFav] = useState(false)
  const navigate = useNavigate();
  const handelMovieDetail = () => {
    navigate(`/detail/${info.id}`)
  }
  const handleFavMovie = async (e) => {
    e.stopPropagation();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = ref(database, `MovieData/${userId}/data`);
      try {
        setData([...data, { movieId: info.id }]);
        await set(userRef, data);
        console.log('Movie added to data');
      } catch (error) {
        console.error('Error adding movie ID:', error);
      }
    } else {
      console.log('No user logged in');
    }
    // data.map((elm) => {
    //   if (elm.movieId == info.id) {
    //     setIsFav(!isFav)
    //     console.log(isFav)
    //   }
    // })
  };
  // useEffect(() => {
  //   const getMovieData = async () => {
  //     const data = await fetch('https://moviemagic-96d91-default-rtdb.firebaseio.com/MoviData/CGouUDLjvJcoxGhCujSRdO33PR43/data')
  //     const json = await data.json();
  //     console.log(json)
  //   }   
  //   getMovieData()
  // }, [])
  return (
    <div className="wrap cursor-pointer relative" onClick={handelMovieDetail}>
      <div className="img-wrap w-52 h-80">
        <img src={info.poster_path ? `https://image.tmdb.org/t/p/w500//${info.poster_path}` : DUMMY_MOVIE_POSTER} alt="movie" className='w-full h-full object-cover' />
      </div>
      <div className="mov-data mt-2">
        <div className="flex gap-4 items-center text-white">
          <div className="rating border w-10 text-center h-10 rounded-full leading-9">{Math.floor(info.vote_average)}/10</div>
          <div className="info">
            <p className="name font-semibold text-lg">{info.title ? info.title.slice(0, 16) : info.original_name.slice(0, 16)}.</p>
            <p className="date">{info.release_date ? info.release_date : info.first_air_date}</p>
          </div>
        </div>
      </div>
      <div className="markMovie absolute top-1 right-1" onClick={handleFavMovie}>
        {isFav ? <FaBookmark className='text-4xl text-red-500 ' /> : <CiBookmark className='text-4xl text-red-500 ' />}
      </div>
    </div>
  )
}
export default MovieCard
