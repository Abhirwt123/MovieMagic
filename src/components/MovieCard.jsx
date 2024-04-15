import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DUMMY_MOVIE_POSTER } from '../utils/constant';
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
// import { auth, database } from '../Firebase/Firebase';
// import { ref, set } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { Client, Databases, Query, ID } from "appwrite";

const MovieCard = ({ info, data, setData }) => {
  const getfavList = useSelector((store) => store.app.FavMovieList)
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  let movieStringData = JSON.stringify(info)
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65f9677db27078162d8c")
  const databases = new Databases(client);

  const handelMovieDetail = () => {
    navigate(`/detail/${info.id}`)
  }

  const handleFavMovie = async (e) => {
    e.stopPropagation();
    const promise = databases.createDocument(
      '65f967ac48b508702782',
      '65f96fc008ce0a6b0ccc',
      ID.unique(),
      { movieInfo: movieStringData }
    );
    promise.then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });
  };

  useEffect(() => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("65f9677db27078162d8c");
    const databases = new Databases(client);
    databases.listDocuments('65f967ac48b508702782', '65f96fc008ce0a6b0ccc')
      .then(response => {
        setMovies(response.documents);
      })
      .catch(error => {
        console.error(error);
      });
  }, [handleFavMovie]);
  //  movies.map((m)=>console.log((m)));
  const isMovieFavorited = movies.some((data) => JSON.parse(data.movieInfo).id == info.id);
  // console.log(isMovieFavorited);
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
        {isMovieFavorited ? <FaBookmark className='text-4xl text-red-500 ' /> : <CiBookmark className='text-4xl text-red-500 ' />}
      </div>
    </div>
  )
}
export default MovieCard
