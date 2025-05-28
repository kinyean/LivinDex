import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 5,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: '1500px',
          height: '100%'
        }}
        columns={24}
        justifyContent="center"
      >
          {cardData.map((card, index) => (
          <Grid size={6} key={index}>
            <Cards {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}