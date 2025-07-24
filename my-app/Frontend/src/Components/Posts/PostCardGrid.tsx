import React from 'react';
import { useEffect, useState } from "react";
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
              sx={{ display: 'flex' }}
              key={index}
              xs={12}     
              sm={6}      
              md={4}     
              lg={3}      
              >
            <PostsCards post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
