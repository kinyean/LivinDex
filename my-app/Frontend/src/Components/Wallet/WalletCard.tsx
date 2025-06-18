import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopUpIcon from '../../Assets/top_up.png';
import CashInIcon from '../../Assets/cash_in.png';
import RewardIcon from '../../Assets/rewards.png';

const WalletCard = () => {
  const navigate = useNavigate();
  
  const options = [
    { icon: TopUpIcon, label: 'Top Up', path: '/wallet/top_up'},
    { icon: CashInIcon, label: 'Cash Out', path: '/wallet/cash_out' },
    { icon: RewardIcon, label: 'Rewards', path: '/wallet/rewards' },
  ];

  return (
    <Box sx={{ backgroundColor: 'var(--wallet_card_background)', borderRadius: 2, p: 2, cursor: 'pointer' }}>
      <Grid container spacing={2} justifyContent="space-around">
        {options.map((opt) => (
          <Grid key={opt.label} size={4} sx={{ textAlign: 'center' }} onClick={() => navigate(opt.path)}>
            <Box
              component="img"
              src={opt.icon}
              alt={opt.label}
              sx={{ height: 50,
                    maxHeight: '65%',
                    maxWidth: '65%',
                    objectFit: 'contain',
                    cursor: 'pointer'
                  }}
            />
            <Typography variant="body1" sx={{ color: 'text.primary', mt: 1 }}>{opt.label}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default WalletCard;
