import React, { useState } from 'react';
import useHandleInputValue from '../Hooks/useHandleInputValue';
import TextField from '@mui/material/TextField';

export default function UserInput({ onGetUserSuccess, isSignIn }) {
    const [userSuccess, setUserSuccess] = useState(null),
        [helperTextUser, setHelperTextUser] = useState('');

    const { value: username, onChange } = useHandleInputValue();

    const validateUserSignUp = () => {
        if (!username) return;
        if (
            !username.match(
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            )
        ) {
            setUserSuccess(false);
            setHelperTextUser('Please enter a valid e-mail address');
        } else {
            setUserSuccess(true);
            localStorage.setItem('username', JSON.stringify(username));
        }
    };

    const validateUserSignIn = () => {
        if (!username) return;
        const userFromLS = JSON.parse(localStorage.getItem('username'));

        if (userFromLS && userFromLS === username) {
            setUserSuccess(true);
        } else {
            setUserSuccess(false);
            setHelperTextUser(
                'The e-mail address does not exist, please try again'
            );
        }
    };

    onGetUserSuccess(userSuccess);

    return (
        <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            size="small"
            required
            error={userSuccess === false ? true : false}
            helperText={userSuccess === false ? helperTextUser : ''}
            onBlur={
                isSignIn
                    ? () => validateUserSignIn()
                    : () => validateUserSignUp()
            }
            onFocus={() => setUserSuccess(null)}
            value={username}
            onChange={onChange}
            sx={{ mb: 3 }}
        />
    );
}
