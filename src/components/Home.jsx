import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import VideoContainer from './VideoContainer'
import MyList from './MyList'

const Home = () => {
  return (
    <div>
      <Header />
      <MyList/>
      <VideoContainer />
    </div>
  )
}

export default Home
