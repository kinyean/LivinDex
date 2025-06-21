import * as React from 'react';
import { useEffect, useState } from "react";
import { auth } from "../../index";
import { onAuthStateChanged, User } from "firebase/auth";
import { getPosts as getPostsApi } from './GetPosts';
import { Post } from './GetPosts'; 
import Box from '@mui/material/Box';
import { GridLegacy as Grid } from '@mui/material';
import PostsCards from './PostsCards';

  export default function NestedGridColumns() {

    const [posts, setPosts] = React.useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
      });
      return () => unsubscribe();
    }, []);

    useEffect(() => {
      if (!user) return;
    
      const fetchPosts = async () => {
        try {
          const data = await getPostsApi(user.uid);
          setPosts(data);
        } catch (error) {
        }
      };
    
      fetchPosts();
    }, [user]);

    return (
      <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, px: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: 1500, width: '100%' }}>
          {posts.map((post, index) => (
            <Grid
              item
              xs={12}
              md={6}
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
  