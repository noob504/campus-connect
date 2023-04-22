import React, { useState } from 'react';
import api from '../../api';

import { TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    margin: 'auto',
    marginTop: '20vh',
    maxWidth: '400px',
    width: '100%',
    color: '#333'
});

const SignUpComponent = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/signup', {
                email,
                password,
            });

            console.log(response.data);
            // handle successful signup here
        } catch (error) {
            console.error(error);
            // handle signup error here
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <FormContainer onSubmit={handleSubmit}>
                <Typography variant="h5" component="h1">Sign Up</Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button variant="contained" type="submit">Sign Up</Button>
            </FormContainer>
        </Box>);
};

export default SignUpComponent;
