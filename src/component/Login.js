import React, { useEffect } from 'react';
import { Formik, Form, Field, FastField, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import Customfield from '../custom/customfield';
import fireBase from '../firebase';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';
function Login(props) {
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
          const { name, password } = value;
          fireBase
            .auth()
            .signInWithEmailAndPassword(name, password)
            .then((userinfo) => {
              console.log(userinfo.user);
              resetForm();
              history.push('/');
            })
            .catch((error) => {
              alert(error.message);
              console.log(error.message);
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
    </motion.div>
  );
}

export default Login;
