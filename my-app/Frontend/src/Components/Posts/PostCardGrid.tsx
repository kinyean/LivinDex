import React from 'react';
import { useEffect, useState } from "react";
import { auth } from "../../index";
import { onAuthStateChanged, User } from "firebase/auth";
import { getPosts as getPostsApi } from './GetPosts';
import { Post } from './GetPosts'; 
import Box from '@mui/material/Box';
import { GridLegacy as Grid } from '@mui/material';
import PostsCards from './PostsCards';

interface PostCardGridProps {
  userId: string;
}

export default function NestedGridColumns({ userId }: PostCardGridProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!userId) return;
    
    const fetchPosts = async () => {
      try {
        const data = await getPostsApi(userId); 
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, px: 2 }}>
      <Grid container spacing={2} sx={{ maxWidth: 1500, width: '100%' }}>
        {posts.map((post, index) => (
          <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
            <PostsCards post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
