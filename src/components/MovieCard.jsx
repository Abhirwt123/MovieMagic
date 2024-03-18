import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DUMMY_MOVIE_POSTER } from '../utils/constant';
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { auth } from '../Firebase/Firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { getFavMovie } from '../Redux/AppSlice';

const MovieCard = ({ info }) => {
  const navigate = useNavigate();
  const isFav = useSelector((store) => store.app.FavMovieList);
  const dispatch = useDispatch();
  const [fav, setFav] = useState([]);

  const handleMovieDetail = () => {
    navigate(`/detail/${info.id}`);
  }

  const handleTag = async (e) => {
    e.stopPropagation();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const database = getDatabase();
      const userRef = ref(database, `MoviData/${userId}/data`);
      
      try {
        // Update data state with the new movie ID object
        await set(userRef, [...isFav, info.id]);
        console.log('Movie ID added successfully.');

        // Dispatch action to update favorite movies list
        dispatch(getFavMovie([...isFav, info.id]));

        // Toggle the fav state
        setFav([...isFav, info.id]);
      } catch (error) {
        console.error('Error adding movie ID:', error);
      }
    } else {
      console.log('No user logged in.');
    }
  }

  return (
    <div className="wrap cursor-pointer relative" onClick={handleMovieDetail}>
      <div className="img-wrap w-52 h-80">
        <img src={info.poster_path ? `https://image.tmdb.org/t/p/w500//${info.poster_path}` : DUMMY_MOVIE_POSTER} alt="movie" className='w-full h-full object-cover' />
      </div>
      <div className="mov-data mt-2">
        <div className="flex gap-4 items-center text-white">
          <div className="rating border w-10 text-center h-10 rounded-full leading-9">{Math.floor(info.vote_average)}/10</div>
          <div className="info">
            <p className="name font-semibold text-lg">{info.title ? info.title.slice(0, 16) : info.original_name.slice(0, 16)}</p>
            <p className="date">{info.release_date ? info.release_date : info.first_air_date}</p>
          </div>
        </div>
      </div>
      <div className="markMovie absolute top-1 right-1" onClick={handleTag}>
        {fav.includes(info.id) ? <FaBookmark className='text-4xl text-red-500 ' /> : <CiBookmark className='text-4xl text-red-500 ' />}
      </div>
    </div>
  );
}

export default MovieCard;
