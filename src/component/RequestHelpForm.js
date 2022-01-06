import React, { useState } from 'react';
import { Formik, Form, Field, FastField, ErrorMessage } from 'formik';
import Customfield from '../custom/customfield';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRequest } from 'features/user/userSlice';
const RequestHelpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const requestIfno = useSelector((state) =>
    state.user.userAllRequest?.find((item) => item.id == id),
  );
  console.log(requestIfno);
  const initialValues = id
    ? {
        title: requestIfno.title,
        phone: requestIfno.phone,
        address: requestIfno.address,
        description: requestIfno.description,
      }
    : {
        title: '',
        phone: '',
        address: '',
        description: '',
      };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Vui lòng nhập tiêu đề'),
        phone: Yup.string().required('Vui lòng nhập số điện thoại'),
        address: Yup.string().required('Vui lòng nhập địa chỉ'),
        description: Yup.string().required('Vui lòng nhập nội dung'),
      })}
      onSubmit={(value, { resetForm }) => {
        const { title, phone, address, description } = value;
        if (id)
          dispatch(setRequest({ title, phone, address, description, id }));
        else dispatch(setRequest({ title, phone, address, description }));
        history.push('/map');
      }}
    >
      <Form>
        <div>
          <FastField name="title" component={Customfield} />
          <ErrorMessage
            name="title"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>
        <div>
          <FastField name="phone" component={Customfield} />
          <ErrorMessage
            name="phone"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>
        <div>
          <FastField name="address" component={Customfield} />
          <ErrorMessage
            name="address"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>

        <div>
          <FastField name="description" type="text">
            {(field, form) => <Customfield textArea={true} {...field} />}
          </FastField>
          <ErrorMessage
            name="description"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Tiếp tục
        </Button>
      </Form>
    </Formik>
  );
};
export default RequestHelpForm;
