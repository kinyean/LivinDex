import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaylahIcon from '../../Assets/paylah.png';
import CreditCard from '../../Assets/creditcard.png';
import PayNow from '../../Assets/paynow.png';

const PaymentCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: selected ? '2px solid #17602a' : '2px solid #ccc',
  borderRadius: 20,
  padding: '12px 20px',
  cursor: 'pointer',
  backgroundColor: '#fff',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#17602a',
  },
}));

interface PaymentMethodProps {
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedIndex, setSelectedIndex }) => {
  const methods = [
    { label: 'Pay with DBS PayLah', image: PaylahIcon },
    { label: 'Pay with PayNow', image: PayNow },
    { label: 'Pay with Credit Card', image: CreditCard },
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', px: 10 }}>
      <Grid container spacing={3} direction="column">
        {methods.map((method, index) => (
          <Grid size={12} key={index}>
            <PaymentCard
              elevation={0}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                    src={method.image}
                    alt={method.label}
                    style={{
                        width: method.label.includes("PayNow") ? 60 : 40,
                        height: 40,
                        borderRadius: 8,
                        objectFit: "contain",
                    }}
                />
                <Typography fontWeight={600}>{method.label}</Typography>
              </Box>
              {selectedIndex === index && (
                <CheckCircleIcon sx={{ color: '#1a23cc' }} />
              )}
            </PaymentCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PaymentMethod;
