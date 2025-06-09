import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TopUpIcon from '../Assets/top_up.png';
import CashInIcon from '../Assets/cash_in.png';
import RewardIcon from '../Assets/rewards.png';

const WalletCard = () => {
  const options = [
    { icon: TopUpIcon, label: 'Request' },
    { icon: CashInIcon, label: 'Cash In' },
    { icon: RewardIcon, label: 'Rewards' },
  ];

  return (
    <Box sx={{ backgroundColor: '#f1f1f2', borderRadius: 2, p: 2 }}>
      <Grid container spacing={2} justifyContent="space-around">
        {options.map((opt, idx) => (
          <Grid sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src={opt.icon}
              alt={opt.label}
              sx={{ height: 40, mb: 1 }}
            />
            <Typography variant="body1">{opt.label}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default WalletCard;
