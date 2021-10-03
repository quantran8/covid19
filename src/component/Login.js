import React, { useState } from 'react';
import { Formik, Form, Field, FastField, ErrorMessage } from 'formik';
import { Button, Backdrop } from '@material-ui/core';
import * as Yup from 'yup';
import Customfield from '../custom/customfield';
import fireBase, { uiConfig } from '../firebase';
import { useHistory, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CircularProgress from '@material-ui/core/CircularProgress';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Login(props) {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const initialValues = {
    name: '',
    password: '',
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required('please enter your acount name'),
          password: Yup.string().required('please enter your password'),
        })}
        onSubmit={(value, { resetForm }) => {
          setOpen(true);
          const { name, password } = value;
          fireBase
            .auth()
            .signInWithEmailAndPassword(name, password)
            .then((userinfo) => {
              resetForm();
              history.push('/');
              setOpen(false);
            })
            .catch((error) => {
              alert(error.message);
              setOpen(false);
            });
        }}
      >
        <Form>
          <div>
            <FastField name="name" component={Customfield} />
            <ErrorMessage
              name="name"
              render={(msg) => <div className="error">{msg}</div>}
            />
          </div>

          <div>
            <FastField
              name="password"
              component={Customfield}
              type="password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="error">{msg}</div>}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            submit
          </Button>
          <Link to="/registed">Dont have acount ?</Link>
        </Form>
      </Formik>
      <h3>or</h3>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireBase.auth()} />
      <Backdrop style={{ zIndex: '10' }} open={open}>
        <CircularProgress style={{ color: 'white' }} />
      </Backdrop>
    </motion.div>
  );
}

export default Login;
