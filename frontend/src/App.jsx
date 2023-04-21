import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './app_route';

import './App.css'

const App = () => (
  <AuthProvider authType={'localstorage'}
    authName={'_auth'}>
    <RouteComponent />
  </AuthProvider >
);
export default App
