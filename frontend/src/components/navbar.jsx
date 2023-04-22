import * as React from 'react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ButtonAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Campus Connect
                    </Typography>
                    {isAuthenticated() ?
                        <Button color="inherit" onClick={() => signOut()}>Logout</Button>
                        :
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
                <MenuItem onClick={handleMenuClose}>About</MenuItem>
                <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
            </Menu>
        </Box >
    );
}
