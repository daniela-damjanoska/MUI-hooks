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
        [id, setId] = useState(''),
        [isFiltering, setIsFiltering] = useState(false);

    const matches = useMediaQuery('(min-width:768px)');

    const blogPosts = useFetch(
        'http://jsonplaceholder.typicode.com/posts/?_limit=20'
    );

    // set data to blogPosts after fetching
    useEffect(() => {
        setData(blogPosts);
    }, [blogPosts]);

    useEffect(() => {
        searchValue === '' ? setIsFiltering(false) : setIsFiltering(true);
    }, [searchValue]);

    useEffect(() => {
        const filteredBlogs = data.filter(el => el.id !== id);
        setData(filteredBlogs);
    }, [id]);

    const dataToRender = useMemo(() => {
        if (!isFiltering) return data;

        return data.filter(
            el =>
                el.title.includes(searchValue) || el.body.includes(searchValue)
        );
    }, [isFiltering, searchValue, data]);

    const getSearchValue = value => {
        setSearchValue(value);
    };
    const getBlogId = id => setId(id);

    //with useMemo
    // const getSearchValue = useCallback(
    //     value => {
    //         setSearchValue(value);
    //     },
    //     [searchValue]
    // );
    // const getBlogId = useCallback(
    //     id => {
    //         setId(id);
    //     },
    //     [id]
    // );

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
                <Search onSearch={getSearchValue} isFiltering={isFiltering} />
                <Grid container spacing={4}>
                    {dataToRender.map(({ id, title, body }) => (
                        <Grid item xs={12} lg={6} key={id}>
                            <BlogCard
                                title={title}
                                desc={body}
                                id={id}
                                onGetId={getBlogId}
                            />
                        </Grid>
                    ))}
                    {isFiltering && dataToRender.length === 0 && (
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                textAlign: 'center',
                                mt: 3,
                            }}
                        >
                            No post found, please try again!
                        </Typography>
                    )}
                </Grid>
            </Box>
        </>
    );
}
