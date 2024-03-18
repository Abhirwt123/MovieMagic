import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import VideoContainer from './VideoContainer'
import UserDataComponent from './MyList'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <VideoContainer />
      <Footer/>
    </div>
  )
}

export default Home
