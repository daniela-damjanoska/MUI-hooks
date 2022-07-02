import React from 'react';
import { useNavigate } from 'react-router-dom';

import UserInput from '../Components/UserInput';
import PassInput from '../Components/PassInput';
import SignInSignUpWrapper from '../Components/SignInSignUpWrapper';

import Button from '@mui/material/Button';

export default function SignIn() {
    let userSuccess, passSuccess;

    const isSignIn = true;

    const navigate = useNavigate();

    const getUserSuccess = value => (userSuccess = value);
    const getPassSuccess = value => (passSuccess = value);

    const handleSubmit = e => {
        e.preventDefault();

        if (userSuccess && passSuccess) navigate('/Blog');
    };

    return (
        <SignInSignUpWrapper
            title="SIGN IN"
            desc="Don't have an account yet?"
            linkTo="/SignUp"
            linkDesc="Sign up now, it is free"
        >
            <form onSubmit={handleSubmit}>
                <UserInput
                    onGetUserSuccess={getUserSuccess}
                    isSignIn={isSignIn}
                />
                <PassInput
                    onGetPassSuccess={getPassSuccess}
                    isSignIn={isSignIn}
                />
                <Button variant="contained" type="submit">
                    Sign in
                </Button>
            </form>
        </SignInSignUpWrapper>
    );
}
