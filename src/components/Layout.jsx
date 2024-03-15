import React from 'react'
import SignInForm from './SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MovieDetailContainer from './MovieDetailContainer';
import PrivateRoute from './PrivateRoute';
import SearchMovies from './SearchMovies';

const Layout = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<SignInForm />} />
                <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path='/detail/:id' element={<PrivateRoute><MovieDetailContainer /></PrivateRoute>} />
                <Route path='/search' element={<PrivateRoute><SearchMovies /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default Layout
