import React from 'react'
import { useNavigate} from 'react-router-dom'

const MovieCard = ({ info }) => {
  const navigate =useNavigate();
  const handelMovieDetail=()=>{
     navigate(`/detail/${info.id}`)
  }
  return (
    <div className="wrap cursor-pointer" onClick={handelMovieDetail}>
      <div className="img-wrap w-52 h-80">
        <img src={`https://image.tmdb.org/t/p/w500//${info.poster_path}`} alt="movie" className='w-full h-full' />
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
    </div>
  )
}
export default MovieCard
