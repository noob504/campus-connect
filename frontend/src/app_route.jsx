import { React, useState, useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignInComponent from './app_routes/sign_in'
import PrivateComp from './app_routes/private';
import { useIsAuthenticated } from 'react-auth-kit';
import { useLocation, Navigate } from 'react-router-dom';
import Home from './app_routes/home';


const PrivateRoute = ({ children, loginPath }) => {
  const isAuthentiated = useIsAuthenticated();
  const location = useLocation();

  if (isAuthentiated()) {
    return children;
  }
  return <Navigate
    to={loginPath}
    state={{ from: location }}
    replace
  />;
};

const RouteComponent = () => (

  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path="/sign_in" element={<SignInComponent />} />
      <Route path={'/secure'}
        element={
          <PrivateRoute loginPath={'/sign_in'}>
            <PrivateComp />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
export default RouteComponent
