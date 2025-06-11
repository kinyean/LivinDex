import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Transaction_Icon from '../../Assets/transactions.png'
import '../../Styles/Wallet.css';

const transactions = [
  {
    type: 'Top Up',
    date: '10 June 2019, 3:08 pm',
    amount: 354.5,
  },
  {
    type: 'Daily Earnings',
    date: '10 June 2019, 3:08 pm',
    amount: 10,
  },
  {
    type: 'Cash Out',
    date: '10 June 2019, 3:08 pm',
    amount: 354.5,
  },
  {
    type: 'Top Up',
    date: '10 June 2019, 3:08 pm',
    amount: 354.5,
  },
];


export default function WalletList() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value : number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {transactions.map((tx, index) => (
        <ListItem
          key={index}
          alignItems="flex-start"
          divider
          secondaryAction={
            <Typography
              sx={{
                color: (tx.type === 'Top Up' || tx.type === 'Daily Earnings') ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {(tx.type === 'Daily Earnings')
                ? `+${Math.round(tx.amount)} pts`
                : `${tx.type === 'Top Up' ? '+' : '-'}$${tx.amount.toFixed(2)}`
              }
            </Typography>
          }
        >
          <ListItemAvatar>
          <img className="wallet-transaction-icon" src={Transaction_Icon} alt="Transaction_Icon" />
          </ListItemAvatar>
          <ListItemText
            primary={
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {tx.type}
            </Typography>
            }
            secondary={
            <>
              <Typography variant="caption" color="text.secondary">
              {tx.date}
              </Typography>
            </>
          }
        />
      </ListItem>
    ))}
    </List>
  );
}
