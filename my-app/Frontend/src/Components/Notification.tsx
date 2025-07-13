import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const notifications = [
  {
    id: 1,
    title: 'Mark Rober uploaded: Rocket Swings',
    time: '2 days ago',
    avatar: 'https://via.placeholder.com/60',
  },
];

export default function NotificationDropdown() {
  return (
    <Paper
      sx={{
        width: 400,
        maxHeight: 500,
        overflowY: 'auto',
        position: 'absolute',
        top: '40px',
        right: '-125px',
        zIndex: 999,
        borderRadius: 2,
        p: 1,
        bgcolor: 'var(--noti_color)', 
      }}
      elevation={4}
    >
      <Typography variant="h6" sx={{ px: 2, mb: 1, color: 'black'}} >
        Notifications
      </Typography>
      <Divider />
      <MenuList dense>
        {notifications.map((item) => (
          <MenuItem key={item.id} sx={{ alignItems: 'flex-start' }}>
            <ListItemIcon>
              <Avatar src={item.avatar} sx={{ width: 48, height: 48, marginRight: 2}} />
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              secondary={item.time}
              primaryTypographyProps={{ fontSize: 14 }}
              secondaryTypographyProps={{ fontSize: 12 }}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}
