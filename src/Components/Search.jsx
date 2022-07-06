import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Search({ onSearch, isFiltering }) {
    const [value, setValue] = useState('');

    return (
        <Box sx={{ mb: 5, display: 'flex' }}>
            {!isFiltering && (
                <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ input: { color: 'primary.main' } }}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            )}
            {!isFiltering ? (
                <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={() => {
                        onSearch(value);
                        setValue('');
                    }}
                >
                    SEARCH
                </Button>
            ) : (
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        onSearch(value);
                    }}
                >
                    BACK TO ALL POSTS
                </Button>
            )}
        </Box>
    );
}
