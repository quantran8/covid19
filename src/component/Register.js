import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import Customfield from '../custom/customfield';
import fireBase from '../firebase';
import { useHistory, Link } from 'react-router-dom';
function Register(props) {
  const history = useHistory();
  const initialValues = {
    email: '',
    name: '',
    password: '',
    confirm: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('email không hợp lệ')
          .required('Vui lòng nhập email'),
        name: Yup.string().required('Vui lòng nhập tên tài khoản'),
        password: Yup.string().required('Vui lòng nhập mật khẩu'),
        confirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
          .required('Vui lòng xác nhận mật khẩu'),
      })}
      onSubmit={(value, { resetForm }) => {
        const { email, name, password } = value;
        fireBase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            alert('sign in success !');
            const user = res.user;
            user.updateProfile({
              displayName: name,
            });
            console.log(user);
            history.push('/login');
          })
          .catch((err) => {
            console.log(err.message);
            alert('error :' + err.message);
          });
      }}
    >
      <Form>
        <div>
          <FastField name="email" component={Customfield} />
          <ErrorMessage
            name="email"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>
        <div>
          <FastField name="name" component={Customfield} />
          <ErrorMessage
            name="name"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>
        <div>
          <FastField name="password" component={Customfield} type="password" />
          <ErrorMessage
            name="password"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>
        <div>
          <FastField name="confirm" component={Customfield} type="password" />
          <ErrorMessage
            name="confirm"
            render={(msg) => <div className="error">{msg}</div>}
          />
        </div>

        <Button variant="contained" color="primary" type="submit">
          Đăng kí
        </Button>
        <Link to="/login">Đăng nhập ngay </Link>
      </Form>
    </Formik>
  );
}

export default Register;
