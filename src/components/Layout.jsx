import React from 'react'
import SignInForm from './SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MovieDetailContainer from './MovieDetailContainer';

const Layout = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<SignInForm />} />
                <Route path='/home' element={<Home />} />
                <Route path='/detail/:id' element={<MovieDetailContainer/>} />
            </Routes>
        </Router>
    )
}

export default Layout
