import * as React from 'react';
import { useState, useEffect } from 'react';
import { auth } from "../../index";
import { Notification } from './GetNotification'; 
import BaseAPI from "../../API/BaseAPI"; 
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import UserProfile from '../../Assets/UnknownUser.jpg';

export default function NotificationDropdown() {

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const res = await BaseAPI.get(`/notifications?userId=${user.uid}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  
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
      <Typography variant="h6" sx={{ px: 2, mb: 1, color: 'black' }} >
        Notifications
      </Typography>
      <Divider />
      <MenuList dense>
        {notifications.length === 0 ? (
          <Typography variant="body2" sx={{ px: 2, py: 1, color: 'gray' }}>
            There is no notification.
          </Typography>
        ) : (
          notifications.slice(0, 5).map((item, index) => (
            <MenuItem
              key={item.id}
              sx={{
                alignItems: 'flex-start',
                mb: index !== 4 ? 1 : 0,
                borderRadius: 1,
              }}
            >
              <ListItemIcon>
                <Avatar
                  src={item.avatar || UserProfile}
                  sx={{ width: 48, height: 48, marginRight: 2 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                secondary={new Date(item.time).toLocaleString()}
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{ fontSize: 12 }}
              />
            </MenuItem>
          ))
        )}
      </MenuList>
    </Paper>
  );
}
