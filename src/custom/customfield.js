import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30rem',
      marginBottom: theme.spacing(2),
    },
  },
}));

function Customfield(props) {
  const { form, field, type } = props;
  const { name } = field;
  const classes = useStyles();
  return (
    <FormControl className={classes.root} noValidate autoComplete="on">
      <TextField
        error={form.errors[name] && form.touched[name] ? true : false}
        label={name}
        type={type}
        {...field}
      />
    </FormControl>
  );
}

export default Customfield;
