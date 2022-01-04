import React, { useState } from 'react';
import { Formik, Form, Field, FastField, ErrorMessage } from 'formik';
import Customfield from '../custom/customfield';
import * as Yup from 'yup';
import {Button} from '@mui/material';
import { useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {helperInfo} from 'auth/slice';
const HelperForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const initialValues = {
        title: '',
        phone:'',
        address:'',
        description: '',
      };
    
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
            title: Yup.string().required('please enter title'),
            phone: Yup.string().required('please enter your acount phone'),
            address: Yup.string().required('please enter your acount address'),
            description: Yup.string().required('please enter your password'),

        })}
        onSubmit={(value, { resetForm }) => {
          const { title,phone,address,description } = value;
          dispatch(helperInfo({title,phone,address,description}))
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
            <FastField
              name="description"
              type="text"
            >
             {(field,form) =><Customfield textArea={true} {...field}/>}
            </FastField>
            <ErrorMessage
              name="description"
              render={(msg) => <div className="error">{msg}</div>}
            />
          </div>
          <Button variant="contained" color="primary" type="submit" >
            Tiếp tục
          </Button>
          
        </Form>
      </Formik>
    )
}
export default HelperForm;