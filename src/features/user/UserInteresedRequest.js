import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllRequest } from 'Api/firebasedb';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useDispatch } from 'react-redux';
import { updateInteresedRequest, deleteInteresedRequest } from './userSlice';
import { updateRequestFB } from 'Api/firebasedb';
const UserInteresedRequest = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [DialogData, setDialogData] = useState({});
  const user = useSelector((state) => state.user);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (id) => {
    setOpen(true);
    const data = user.userInteresed.find((item) => item.id == id);
    setDialogData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*---------update request to redux and firebase------*/
  const handleEdit = (id) => {
    const request = user.userInteresed.find((item) => item.id == id);
    updateRequestFB(id, {
      ...request,
      helped: true,
    });
    dispatch(updateInteresedRequest(id));
  };
  /*---------remove request from redux and firebase------*/
  const handleRemove = (id) => {
    if (window.confirm('Bạn có muốn xóa')) {
      const request = user.userInteresed.find((item) => item.id == id);
      dispatch(deleteInteresedRequest(id));
      updateRequestFB(id, {
        ...request,
        userInteresed: '',
      });
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'title', headerName: 'Tiêu đề', width: 250 },
    { field: 'status', headerName: 'Trạng thái', width: 130 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 250,
      editable: false,
      renderCell: (data) => {
        if (data.row.status == 'Đã được giúp đỡ')
          return (
            <>
              <Button variant="contained" disabled>
                <VisibilityIcon />
              </Button>
              <Button variant="contained" disabled>
                <DeleteIcon />
              </Button>
              <Button variant="contained" disabled>
                Đã giúp đỡ
              </Button>
            </>
          );
        else
          return (
            <>
              <Button
                variant="outlined"
                onClick={() => handleClickOpen(data.id)}
              >
                <VisibilityIcon />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(data.id)}
              >
                <DeleteIcon />
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleEdit(data.id)}
              >
                Đã giúp đỡ
              </Button>
            </>
          );
      },
    },
  ];
  const rows = user.userInteresed.map((item) => {
    return {
      id: item.id,
      title: item.title,
      status: item.helped == false ? 'Đang quan tâm' : 'Đã giúp đỡ',
    };
  });
  return (
    <div style={{ height: 750, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3>Số điện thoại :{DialogData.phone}</h3>
            <h3>Địa chỉ :{DialogData.address}</h3>
            <p>Nội dung :{DialogData.description}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserInteresedRequest;
