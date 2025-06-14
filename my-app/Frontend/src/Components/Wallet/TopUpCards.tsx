import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, TextField} from '@mui/material';

interface TopUpCardsProps {
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  customTopUp: string;
  setCustomTopUp: (v: string) => void;
}

const options = ["$10", "$20", "$30", "$50", "$100", "Others"];

const OptionCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: 12,
  border: `2px solid #17602a`,
  color: selected ? '#fff' : '#17602a',
  backgroundColor: selected ? '#24ab67' : '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: selected ? '#1c8a53' : '#f1f1f9',
  },
}));

export default function TopUpCards({ selectedIndex, setSelectedIndex, customTopUp, setCustomTopUp }: TopUpCardsProps) {
  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1600, mx: 'auto' }}>
      <Grid container spacing={2}>
      {options.map((value, index) => (
          <Grid size={2} key={index}>
            <OptionCard
              elevation={0}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              {value}
            </OptionCard>
          </Grid>
        ))}
      </Grid>

      {options[selectedIndex ?? 0] === "Others" && (
        <Box mt={3} sx={{ textAlign: 'center' }}>
          <TextField
            type="number"
            label="Enter Amount (Min $1, Max $999)"
            value={customTopUp}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || (Number(value) > 0 && Number(value) <= 999)) {
                setCustomTopUp(value);
              }
            }}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            variant="outlined"
            sx={{ width: 400 }}
          />
        </Box>
      )}
    </Box>
  );
}