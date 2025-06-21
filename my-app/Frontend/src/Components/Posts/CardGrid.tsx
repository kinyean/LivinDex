import * as React from 'react';
import Box from '@mui/material/Box';
import { GridLegacy as Grid } from '@mui/material';
import { useEffect, useState } from "react";
import { Post } from './GetPosts'; 
import { getAllPosts as getAllPostsApi } from './GetPosts';
import Cards from './Cards';


  export default function NestedGridColumns() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await getAllPostsApi();
        setPosts(data);
      };
  
      fetchData();
    }, []);

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, width: '100%' }}>
        <Grid container spacing={2} sx={{ width: '100%', px: 4 }}>          
          {posts.map((post, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{ display: 'flex', minWidth: 300 }} 
            >
              <Cards               
                image={post.media?.[0]?.mediaURL}
                alt={post.header}
                title={post.header}
                description={post.text} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  