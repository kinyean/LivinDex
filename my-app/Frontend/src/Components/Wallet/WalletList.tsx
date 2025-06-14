import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Transaction_Icon from '../../Assets/transactions.png';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../index';
import { getUserTransactions as getUserTransactionsAPI } from "../../Pages/Wallet/GetWallet";

import '../../Styles/Wallet.css';

export default function WalletList() {
  const [transactions, setTransactions] = React.useState<any[]>([]);

  React.useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await getUserTransactionsAPI(user.uid);
          setTransactions(data.transactions || []);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <List>
      {Array.isArray(transactions) && transactions.map((tx, index) => (
        <ListItem
          key={tx.id || index}
          alignItems="flex-start"
          divider
          secondaryAction={
            <Typography
              sx={{
                color: (tx.type === 'Top Up' || tx.type === 'Daily Earnings') ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {tx.type === 'Daily Earnings'
                ? `+${Math.round(tx.amount)} pts`
                : `${tx.type === 'Top Up' ? '+' : '-'}$${Math.abs(tx.amount / 100).toFixed(2)}`
              }
            </Typography>
          }
        >
          <ListItemAvatar>
            <img className="wallet_transaction_icon" src={Transaction_Icon} alt="Transaction_Icon" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {tx.type}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {tx.createdAt
                  ? new Date(tx.createdAt).toLocaleString()
                  : 'No date available'}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
