import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllRequest } from 'Api/firebasedb';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRequest } from './userSlice';
import { removeRequest } from 'Api/firebasedb';
import UserSideBar from './UserSideBar';
import UserRequest from './UserRequest';
import UserInteresedRequest from './UserInteresedRequest';
import './user.scss';
const User = () => {
  const route = useRouteMatch();
  return (
    <div className="user-control">
      <div className="user-control-sidebar">
        <UserSideBar />
      </div>
      <div className="user-control-action">
        <Switch>
          <Route exact path={route.url}>
            <UserRequest />
          </Route>
          <Route path={`${route.url}/interesed`}>
            <UserInteresedRequest />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default User;
