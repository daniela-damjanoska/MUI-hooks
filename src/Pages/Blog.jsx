import React from 'react';

export default function Blog() {
    const avatarUrl = localStorage.getItem('avatar');
    console.log(avatarUrl);
    return <div>Blog</div>;
}
