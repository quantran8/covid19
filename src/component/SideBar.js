import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import fireBase from '../firebase';
import {Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import{Accordion,AccordionSummary,AccordionDetails,Button,Typography,List,ListItem,ListItemButton,ListItemText} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {setUser} from 'auth/slice';

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
  
const  SideBar = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const auth = useSelector(state => state.user);
    const handleOnclick = () => {
        fireBase.auth().signOut();
        dispatch(setUser({}));
        props.setOpen(false);
    } 
    const handleClose = () => {
        props.setOpen(false);
    }
    const handleRedirect = (path) => {
        if(auth.id){
           history.push(path);
           handleClose();
        }
        else{
            history.push('/login');
            handleClose();
        }
   }
    return(
    <div className='menu' >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Trợ giúp</Typography>
        </AccordionSummary>
        <AccordionDetails>
           <List>
              <ListItem disablePadding>
                  <ListItemButton
                   onClick={()=>{handleRedirect('/helperform')}}
                  >
                      <ListItemText primary="Tôi cần giúp đỡ" />
                  </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                   <ListItemButton 
                    onClick={()=>{handleRedirect('/map')}}
                   >
                      <ListItemText primary="Tôi Muốn giúp đỡ" />
                   </ListItemButton>
              </ListItem>
           </List>
        </AccordionDetails>
      </Accordion>

      {auth.id ? (
        <Button
          className={classes.btn}
          onClick={handleOnclick}
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
    </div>)
}
export default SideBar;