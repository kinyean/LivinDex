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
  userId?: string;
  userPosts?: Post[];
}

export default function NestedGridColumns({ userId, userPosts }: PostCardGridProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const load = async () => {
      if (userPosts && userPosts.length > 0) {
        setPosts(userPosts);
      } else if (userId) {
        try {
          const data = await getPostsApi(userId); 
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch posts", error);
        }
      }
    };

    load();
  }, [userId, userPosts]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, px: 2 }}>
      <Grid container spacing={2} sx={{ maxWidth: 1500, width: '100%' }}>
        {posts.map((post, index) => (
            <Grid 
                item  
                xs={6}  // each card takes 6 out of 12 columns, so 2 per row
                key={index}
                sx={{ display: 'flex' }}
                >
            <PostsCards post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
