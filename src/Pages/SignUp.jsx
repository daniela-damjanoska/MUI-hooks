import React from 'react';
import { useNavigate } from 'react-router-dom';

import UserInput from '../Components/UserInput';
import PassInput from '../Components/PassInput';
import SignInSignUpWrapper from '../Components/SignInSignUpWrapper';

import Button from '@mui/material/Button';

export default function SignUp() {
    let userSuccess, passSuccess;

    const navigate = useNavigate();

    const getUserSuccess = value => (userSuccess = value);
    const getPassSuccess = value => (passSuccess = value);

    const fetchAvatarAndNavigate = () => {
        fetch('https://randomuser.me/api')
            .then(data => data.json())
            .then(data =>
                localStorage.setItem(
                    'avatar',
                    data.results[0].picture.thumbnail
                )
            )
            .then(() => navigate('/Blog'))
            .catch(err => alert(err.message));
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (userSuccess && passSuccess) fetchAvatarAndNavigate();
    };

    return (
        <SignInSignUpWrapper
            title="SIGN UP"
            desc=" Already have an account?"
            linkTo="/"
            linkDesc="Sign in please."
        >
            <form onSubmit={handleSubmit}>
                <UserInput onGetUserSuccess={getUserSuccess} />
                <PassInput onGetPassSuccess={getPassSuccess} />
                <Button variant="contained" type="submit">
                    Sign up
                </Button>
            </form>
        </SignInSignUpWrapper>
    );
}
