import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom';
const UserSideBar = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <NavLink
                exact
                to="/account"
                className="NavLink"
                activeClassName="active"
              >
                <ListItemText primary="Yêu cầu của tôi" />
              </NavLink>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <NavLink
                to="/account/interesed"
                className="NavLink"
                activeClassName="active"
              >
                <ListItemText primary="Yêu cầu quan tâm" />
              </NavLink>
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
};

export default UserSideBar;
