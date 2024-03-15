import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import VideoContainer from './VideoContainer'
import UserDataComponent from './MyList'

const Home = () => {
  return (
    <div>
      <Header />

      <VideoContainer />
    </div>
  )
}

export default Home
