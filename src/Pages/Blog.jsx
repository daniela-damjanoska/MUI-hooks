import React, { useEffect, useState, useCallback, useMemo } from 'react';
import useFetch from '../Hooks/useFetch';

import Navbar from '../Components/Navbar';
import Search from '../Components/Search';
import BlogCard from '../Components/BlogCard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Blog() {
    const [data, setData] = useState([]),
        [searchValue, setSearchValue] = useState(''),
        [id, setId] = useState('');

    const matches = useMediaQuery('(min-width:768px)');

    const blogPosts = useFetch(
        'http://jsonplaceholder.typicode.com/posts/?_limit=20'
    );

    useEffect(() => {
        setData(blogPosts);
    }, [blogPosts]);

    useEffect(() => {
        const filteredBlogs = blogPosts.filter(
            el =>
                el.title.includes(searchValue) || el.body.includes(searchValue)
        );
        setData(filteredBlogs);
    }, [searchValue]);

    useEffect(() => {
        const filteredBlogs = data.filter(el => el.id !== id);
        setData(filteredBlogs);
    }, [id]);

    // const filteredBySearch = useMemo(() => {
    //     if (!searchValue) return blogPosts;

    //     return blogPosts.filter(
    //         el =>
    //             el.title.includes(searchValue) || el.body.includes(searchValue)
    //     );
    // }, [searchValue]);

    // console.log(filteredBySearch);

    const getSearchValue = useCallback(
        value => {
            setSearchValue(value);
        },
        [searchValue]
    );
    const getBlogId = useCallback(
        id => {
            setId(id);
        },
        [id]
    );

    return (
        <>
            <Navbar />
            <Box sx={{ height: '80vh' }}>
                <img
                    src="./Images/banner.jpg"
                    alt="banner"
                    style={{
                        width: '100%',
                        display: 'block',
                        height: '100%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    marginY: 7,
                    marginX: matches ? 17 : 7,
                }}
            >
                <Search onSearch={getSearchValue} />
                <Grid container spacing={4}>
                    {data.map(({ id, title, body }) => (
                        <Grid item xs={12} lg={6} key={id}>
                            <BlogCard
                                title={title}
                                desc={body}
                                id={id}
                                onGetId={getBlogId}
                            />
                        </Grid>
                    ))}
                    {data.length === 0 && searchValue && (
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                textAlign: 'center',
                                mt: 3,
                            }}
                        >
                            No blog found, please try again!
                        </Typography>
                    )}
                </Grid>
            </Box>
        </>
    );
}
