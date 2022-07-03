import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const avatarUrl = localStorage.getItem('avatar');
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                        }}
                    >
                        Welcome to my blog
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={e => setAnchorEl(e.currentTarget)}
                        color="inherit"
                    >
                        <Avatar
                            alt="avatar"
                            src={avatarUrl}
                            sx={{ width: 56, height: 56 }}
                        />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={() => navigate('/')}>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
