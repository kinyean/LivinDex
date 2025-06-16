import * as React from 'react';
import Box from '@mui/material/Box';
import { GridLegacy as Grid } from '@mui/material';
import Cards from './Cards';
import testpic from '../Assets/contemplative-reptile.jpg';

const cardData = [
    {
      image: testpic,
      alt: 'green iguana',
      title: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
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
    {
      image: testpic,
      alt: 'another iguana',
      title: 'Gecko',
      description: 'Geckos are small, nocturnal lizards found all over the world.',
    },
    {
      image: testpic,
      alt: 'green iguana',
      title: 'Lizard',
      description:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species.',
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
    {
      image: testpic,
      alt: 'another iguana',
      title: 'Gecko',
      description: 'Geckos are small, nocturnal lizards found all over the world.',
    },
  ];

  export default function NestedGridColumns() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Grid container spacing={2} sx={{ maxWidth: 1500, width: '100%' }}>
          {cardData.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{ display: 'flex' }} 
            >
              <Cards {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  