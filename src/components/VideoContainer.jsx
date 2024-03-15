import React from 'react'
import PopularMovies from './PopularMovies'
import Upcoming from './Upcoming'
import TopRated from './TopRated'
import Banner from './Banner'

const VideoContainer = () => {

  return (
    <>
      <Banner />
      <div className='px-10 py-4'>
        <PopularMovies />
        <Upcoming />
        <TopRated />
      </div>
    </>
  )
}

export default VideoContainer
