import {
  Drawer,
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ListItemButton from '@mui/material/ListItemButton';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import { setUser } from 'features/user/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fireBase from '../firebase';
import { Link, NavLink } from 'react-router-dom';
import SideBar from 'component/SideBar';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    width: '10rem',
    margin: '0 auto',
  },
  nav: {
    backgroundColor: 'white',
    color: 'black',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleonclick = () => {
    fireBase.auth().signOut();
    dispatch(setUser({}));
    setOpen(false);
  };

  return (
    <div className="appBar">
      <AppBar position="static" className={classes.nav}>
        <Toolbar id="back-to-top-anchor">
          <IconButton
            edge="start"
            onClick={() => {
              setOpen(true);
            }}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className="NavLink" activeClassName="active" exact>
              Trang ch???
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/world" className="NavLink" activeClassName="active">
              Th??? Gi???i
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/news" className="NavLink" activeClassName="active">
              Tin t???c
            </NavLink>
          </Typography>
          {auth.userInfo.id && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Tooltip title={auth.userInfo.email}>
                  <AccountCircle />
                </Tooltip>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleClose}>
        <SideBar setOpen={setOpen} />
      </Drawer>
    </div>
  );
}
