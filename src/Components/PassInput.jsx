import React, { useState } from 'react';
import useHandleInputValue from '../Hooks/useHandleInputValue';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

export default function PassInput({ onGetPassSuccess, isSignIn }) {
    const [showPassword, setShowPassword] = useState(false),
        [passSuccess, setPassSuccess] = useState(false),
        [passErrors, setPassErrors] = useState(false),
        [helperTextPass, setHelperTextPass] = useState('');

    const { value: password, onChange } = useHandleInputValue();

    const validatePasswordSignUp = () => {
        if (password) {
            if (password.length < 8) {
                setPassErrors(true);
                setHelperTextPass('Password must be at least 8 characters');
            } else if (!password.match(/^(?=.*?[#!@$%^&*]).{8,}$/)) {
                setPassErrors(true);
                setHelperTextPass(
                    'Password must contains at least one of this characters: !@#$%^&*'
                );
            } else if (password.length > 32) {
                setPassErrors(true);
                setHelperTextPass('Password must be less than 32 characters');
            } else {
                setPassSuccess(true);
                localStorage.setItem('password', JSON.stringify(password));
            }
        }
    };

    const validatePasswordSignIn = () => {
        if (password) {
            const passFromLS = JSON.parse(localStorage.getItem('password'));

            if (passFromLS === password) {
                setPassSuccess(true);
            } else {
                setPassErrors(true);
                setHelperTextPass(
                    'Your password is incorrect, please try again'
                );
            }
        }
    };

    onGetPassSuccess(passSuccess);

    return (
        <FormControl
            variant="outlined"
            fullWidth
            size="small"
            required
            sx={{ mb: 7 }}
        >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                error={passErrors ? true : false}
                onBlur={
                    isSignIn
                        ? () => validatePasswordSignIn()
                        : () => validatePasswordSignUp()
                }
                onFocus={() => setPassErrors(false)}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={e => e.preventDefault()}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
    );
}
