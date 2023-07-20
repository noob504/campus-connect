import { React } from "react";
import { Route, Routes } from "react-router-dom";
// import PrivateComp from './private';
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useLocation, Navigate } from "react-router-dom";

import Home from "../components/Home/HomePage";
import SignInComponent from "../components/SignIn/SignIn";
import SignUpComponent from "../components/SignUp/SignUp";

const PrivateRoute = ({ children, loginPath }) => {
  const User = useAuthUser();
  const isAuthentiated = useIsAuthenticated();
  const location = useLocation();

  if (isAuthentiated()) {
    return children;
  }
  return <Navigate to={loginPath} state={{ from: location }} replace />;
};

const RouteComponent = () => (
  <Routes>
    <Route path={"/"} element={<Home />} />
    <Route path="/login" element={<SignInComponent />} />
    <Route path="/signup" element={<SignUpComponent />} />
    {/* <Route path={'/secure'}
      element={
        <PrivateRoute loginPath={'/sign_in'}>
          <PrivateComp />
        </PrivateRoute>
      }
    /> */}
  </Routes>
);
export default RouteComponent;
