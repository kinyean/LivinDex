import * as React from 'react';
import Box from '@mui/material/Box';
import { GridLegacy as Grid } from '@mui/material';
import { Post } from './GetPosts'; 
import Cards from './Cards';

type Props = {
  posts: Post[];
};

const CardGrid: React.FC<Props> = ({ posts }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, width: '100%' }}>
      <Grid container spacing={2} sx={{ width: '100%', px: 0 }}>
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
              image={post?.thumbnailURL ?? ""}
              alt={post.header}
              title={post.header}
              description={post.text}
              post={post}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardGrid;
