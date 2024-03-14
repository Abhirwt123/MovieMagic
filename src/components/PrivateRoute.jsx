import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLogin = useSelector((store) => store.app.isUserAuthorized);
    if (!isLogin) {
      return  <Navigate to='/'/>
    }
    return children
}

export default PrivateRoute;
