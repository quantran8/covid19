import React from 'react';
import Chart from './chart';
import TableData from './TableData';
import Vaccin from './Vaccin';
import Info from './info';
import { useSelector } from 'react-redux';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { motion } from 'framer-motion';
import 'public/css/main.css';
function Main(props) {
  const loading = useSelector((state) => state.covid.Loading);
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mainContainer">
        <Info />
        <Chart />
        <TableData />
        <Vaccin />
        <Backdrop style={{ zIndex: '10' }} open={loading}>
          <CircularProgress style={{ color: 'white' }} />
        </Backdrop>
      </div>
    </motion.div>
  );
}

export default Main;
