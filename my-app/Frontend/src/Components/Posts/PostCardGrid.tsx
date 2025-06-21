import * as React from 'react';
import Box from '@mui/material/Box';
import { GridLegacy as Grid } from '@mui/material';
import PostsCards from './PostsCards';
import testpic from '../../Assets/contemplative-reptile.jpg';

const cardData = [
    {
      image: testpic,
      alt: 'another iguana',
      title: 'Gecko',
      description: 'Geckos are small, nocturnal lizards found all over the world.',
    },
    {
      image: testpic,
      alt: 'another iguana',
      title: 'Gecko',
      description: 'Geckos are small, nocturnal lizards found all over the world.',
    },
    {
      image: testpic,
      alt: 'another iguana',
      title: 'Gecko',
      description: 'Geckos are small, nocturnal lizards found all over the world.',
    },
  ];

  export default function NestedGridColumns() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, px: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: 1500, width: '100%' }}>
          {cardData.map((card, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              sx={{ display: 'flex' }} 
            >
              <PostsCards {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  