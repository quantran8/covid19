import {
  Drawer,
  AppBar,
  Button,
  IconButton,
  Modal,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { setUser } from 'auth/slice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fireBase from '../firebase';
import { Link, NavLink } from 'react-router-dom';
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
  const history = useHistory();
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
  const body = (
    <div className='menu' >
      {auth.id ? (
        <Button
          className={classes.btn}
          onClick={handleonclick}
          variant="contained"
          color="primary"
        >
          Sign Out
        </Button>
      ) : (
        <Link onClick={handleClose} to="/login" className="link">
          <Button className={classes.btn} variant="contained" color="primary">
            Sign In
          </Button>
        </Link>
      )}
      <Button
        className={classes.btn}
        onClick={handleClose}
        variant="contained"
        color="primary"
      >
        Close
      </Button>
    </div>
  );

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
              Trang chủ
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/world" className="NavLink" activeClassName="active">
              Thế Giới
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/news" className="NavLink" activeClassName="active">
              Tin tức
            </NavLink>
          </Typography>
          {auth.id && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Tooltip title={auth.email}>
                  <AccountCircle />
                </Tooltip>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleClose}>
        {body}
      </Drawer>
    </div>
  );
}
