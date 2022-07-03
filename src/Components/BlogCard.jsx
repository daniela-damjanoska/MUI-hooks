import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function BlogCard({ title, desc, id, onGetId }) {
    return (
        <Card sx={{ position: 'relative' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="./Images/blog.jpg"
                    alt="blog-item"
                />
                <CardContent
                    sx={{
                        height: '170px',
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {desc}
                    </Typography>
                    <DeleteOutlineIcon
                        onClick={() => onGetId(id)}
                        sx={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                        }}
                    />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
