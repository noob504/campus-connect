import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#d43431',
        },
        secondary: {
            main: '#d46c00',
        },
        text: {
            primary: '#333',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 16,
    },
});

export default theme;
