import { React, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignInComponent from './app_routes/sign_in'

const RouteComponent = () => (
  <>
    <div>abcdef</div>
    <Routes>
      <Route path="/sign_in" element={<SignInComponent />} />
    </Routes>
  </>
);
export default RouteComponent
