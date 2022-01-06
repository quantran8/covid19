import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fireBase from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { setUser } from 'features/user/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    width: '10rem',
    margin: '0 auto',
  },
  btn_account: {
    width: '100%',
    marginBottom: 70,
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

const SideBar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state) => state.user);
  const handleOnclick = () => {
    fireBase.auth().signOut();
    dispatch(
      setUser({
        ...auth,
        userInfo: {},
        userAllRequest: [],
        userInteresed: [],
      }),
    );
    props.setOpen(false);
  };
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleRedirect = (path) => {
    if (auth.userInfo.id) {
      history.push(path);
      handleClose();
    } else {
      history.push('/login');
      handleClose();
    }
  };
  return (
    <div className="menu">
      <Accordion style={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>SOS Map</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List style={{ width: '100%' }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleRedirect('/request_help');
                }}
              >
                <ListItemText primary="Muốn nhận" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleRedirect('/map');
                }}
              >
                <ListItemText primary="Muốn cho" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </AccordionDetails>
      </Accordion>
      <Link
        style={{ width: '100%' }}
        onClick={handleClose}
        to="/account"
        className="link"
      >
        <Button
          className={classes.btn_account}
          onClick={handleClose}
          variant="outlined"
          color="primary"
        >
          Tài khoản của tôi
        </Button>
      </Link>
      {auth.userInfo.id ? (
        <Button
          className={classes.btn}
          onClick={handleOnclick}
          variant="contained"
          color="primary"
        >
          Đăng xuất
        </Button>
      ) : (
        <Link onClick={handleClose} to="/login" className="link">
          <Button className={classes.btn} variant="contained" color="primary">
            Đăng nhập
          </Button>
        </Link>
      )}

      <Button
        className={classes.btn}
        onClick={handleClose}
        variant="contained"
        color="primary"
      >
        Đóng
      </Button>
    </div>
  );
};
export default SideBar;
