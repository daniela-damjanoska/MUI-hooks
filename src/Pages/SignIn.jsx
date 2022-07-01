import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SignIn() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const [userErrors, setUserErrors] = useState(false),
        [passErrors, setPassErrors] = useState(false),
        [userSuccess, setUserSuccess] = useState(false),
        [passSuccess, setPassSuccess] = useState(false),
        [helperTextUser, setHelperTextUser] = useState(''),
        [helperTextPass, setHelperTextPass] = useState('');

    const navigate = useNavigate();
    const matches = useMediaQuery('(min-width:601px)');

    const handleChange = prop => e => {
        setValues({ ...values, [prop]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = e => e.preventDefault();

    async function fetchAvatarAndNavigate() {
        const response = await fetch('https://randomuser.me/api'),
            data = await response.json();

        localStorage.setItem('avatar', data.results[0].picture.thumbnail);
        navigate('/Blog');
    }

    const validateUser = () => {
        if (values.username) {
            const userFromLS = JSON.parse(localStorage.getItem('username'));

            if (userFromLS && userFromLS === values.username) {
                setUserSuccess(true);
            } else {
                setUserErrors(true);
                setHelperTextUser(
                    'The e-mail address does not exist, please try again'
                );
            }
        }
    };

    const validatePassword = () => {
        if (values.password) {
            const passFromLS = JSON.parse(localStorage.getItem('password'));

            if (passFromLS === values.password) {
                setPassSuccess(true);
            } else {
                setPassErrors(true);
                setHelperTextPass(
                    'Your password is incorrect, please try again'
                );
            }
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (userSuccess && passSuccess) {
            fetchAvatarAndNavigate();
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                backgroundColor: 'white',
                maxWidth: 600,
                height: matches ? 'undefined' : '100vh',
                borderRadius: matches ? '8px' : 'none',
                marginTop: matches ? 6 : 0,
                marginBottom: matches ? 6 : 0,
            }}
        >
            <Box
                paddingX={matches ? 4 : 0}
                paddingY={7}
                sx={{
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="./Images/logo.png"
                        alt="logo"
                        style={{ width: 150 }}
                    />
                </Box>
                <Typography
                    variant="h5"
                    component="h1"
                    marginTop={8}
                    marginBottom={4}
                >
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="login-username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        required
                        error={userErrors ? true : false}
                        helperText={userErrors ? helperTextUser : ''}
                        onBlur={() => validateUser()}
                        onFocus={() => setUserErrors(false)}
                        value={values.username}
                        onChange={handleChange('username')}
                        sx={{ mb: 3 }}
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                        required
                        sx={{ mb: 7 }}
                    >
                        <InputLabel htmlFor="login-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="login-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            error={passErrors ? true : false}
                            onBlur={() => validatePassword()}
                            onFocus={() => setPassErrors(false)}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {passErrors && (
                            <FormHelperText error id="password-error">
                                {helperTextPass}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Sign in
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
