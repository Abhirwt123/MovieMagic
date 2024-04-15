import React from 'react'
import PopularMovies from './PopularMovies'
import Upcoming from './Upcoming'
import TopRated from './TopRated'
import Banner from './Banner'
import MyList from './MyList'

const VideoContainer = () => {

  return (
    <>
      <Banner />
      <div className='px-10 py-4'>
        <PopularMovies />
        <Upcoming />
        <TopRated />
        <MyList/>
      </div>
    </>
  )
}

export default VideoContainer
