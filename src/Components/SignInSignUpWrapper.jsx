import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SignInSignUpWrapper({
    children,
    title,
    desc,
    linkTo,
    linkDesc,
}) {
    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: 600,
            }}
        >
            <Box
                pt={8}
                sx={{
                    textAlign: 'center',
                }}
            >
                <img
                    src="./Images/logo.png"
                    alt="logo"
                    style={{ width: 150 }}
                />
                <Typography variant="h5" component="h1" mt={8} mb={4}>
                    {title}
                </Typography>
                {children}
                <Typography variant="body2" component="p" mt={2}>
                    {desc}
                </Typography>
                <Link to={linkTo}>{linkDesc}</Link>
            </Box>
        </Container>
    );
}
