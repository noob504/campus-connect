import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './app_routes/routes';

import './App.css'
import { ThemeProvider } from '@mui/material';
import theme from './muitheme';


import Navbar from './components/navbar'
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <AuthProvider authType={'localstorage'}
    authName={'_auth'}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <RouteComponent />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider >
);
export default App
