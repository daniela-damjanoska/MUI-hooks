import React from 'react';
import useHandleInputValue from '../Hooks/useHandleInputValue';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Search({ onSearch }) {
    const { value, onChange } = useHandleInputValue();

    return (
        <Box sx={{ mb: 5, display: 'flex' }}>
            <TextField
                id="search"
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                value={value}
                onChange={onChange}
            />
            <Button
                variant="contained"
                sx={{ ml: 2 }}
                onClick={() => {
                    onSearch(value);
                }}
            >
                Search
            </Button>
        </Box>
    );
}
