import { useState } from 'react'
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './app_route';
import { Routes, Route, Link } from 'react-router-dom'

import './App.css'

const App = () => (
  <AuthProvider authType={'localstorage'}
    authName={'_auth'}>
    <RouteComponent />
  </AuthProvider >
);
export default App
