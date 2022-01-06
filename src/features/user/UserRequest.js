import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRequest } from './userSlice';
import { removeRequest } from 'Api/firebasedb';
import { getDateTime } from 'custom/format';
const UserRequest = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [DialogData, setDialogData] = useState({});
  const user = useSelector((state) => state.user);
  const handleClickOpen = (id) => {
    setOpen(true);
    const data = user.userAllRequest.find((item) => item.id == id);
    setDialogData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (id) => {
    history.push(`/request_help/${id}`);
  };
  const handleRemove = (id) => {
    if (window.confirm('Bạn có muốn xóa')) {
      removeRequest(id);
      dispatch(deleteRequest(id));
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'title', headerName: 'Tiêu đề', width: 250 },
    { field: 'status', headerName: 'Trạng thái', width: 130 },
    { field: 'date', headerName: 'Đã tạo', width: 130 },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 250,
      editable: false,
      renderCell: (data) => {
        if (data.row.status == 'Đã được giúp đỡ')
          return (
            <>
              <Button variant="outlined" disabled>
                <VisibilityIcon />
              </Button>
              <Button variant="outlined" disabled>
                <EditIcon />
              </Button>
              <Button variant="outlined" disabled>
                <DeleteIcon />
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
                onClick={() => {
                  handleEdit(data.id);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  handleRemove(data.id);
                }}
              >
                <DeleteIcon />
              </Button>
            </>
          );
      },
    },
  ];
  const rows = user.userAllRequest.map((item) => {
    return {
      id: item.id,
      title: item.title,
      status: item.helped == false ? 'Đang trờ giúp đỡ' : 'Đã được giúp đỡ',
      date:getDateTime(item.created)
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

export default UserRequest;
