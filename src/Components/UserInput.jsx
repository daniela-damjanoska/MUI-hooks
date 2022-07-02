import React, { useState } from 'react';
import useHandleInputValue from '../Hooks/useHandleInputValue';
import TextField from '@mui/material/TextField';

export default function UserInput({ onGetUserSuccess, isSignIn }) {
    const [userSuccess, setUserSuccess] = useState(false),
        [userErrors, setUserErrors] = useState(false),
        [helperTextUser, setHelperTextUser] = useState('');

    const { value: username, onChange } = useHandleInputValue();

    const validateUserSignUp = () => {
        if (username) {
            if (
                !username.match(
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                )
            ) {
                setUserErrors(true);
                setHelperTextUser('Please enter a valid e-mail address');
            } else {
                setUserSuccess(true);
                localStorage.setItem('username', JSON.stringify(username));
            }
        }
    };

    const validateUserSignIn = () => {
        if (username) {
            const userFromLS = JSON.parse(localStorage.getItem('username'));

            if (userFromLS && userFromLS === username) {
                setUserSuccess(true);
            } else {
                setUserErrors(true);
                setHelperTextUser(
                    'The e-mail address does not exist, please try again'
                );
            }
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
            error={userErrors ? true : false}
            helperText={userErrors ? helperTextUser : ''}
            onBlur={
                isSignIn
                    ? () => validateUserSignIn()
                    : () => validateUserSignUp()
            }
            onFocus={() => setUserErrors(false)}
            value={username}
            onChange={onChange}
            sx={{ mb: 3 }}
        />
    );
}
