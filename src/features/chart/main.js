import React from 'react';
import Chart from './chart';
import TableData from './TableData';
import Vaccin from './Vaccin';
import Info from './info';
import { useSelector } from 'react-redux';
import { Backdrop, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';

import { motion } from 'framer-motion';
import 'public/scss/main.scss';
function Main(props) {
  const loading = useSelector((state) => state.covid.Loading);
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
         {loading?

          Array.from(new Array(5)).map((item) =>{
            return(
            <Container>
              <div key={item} style={{margin :'30px'}}>
              <Skeleton variant='react' height={100} width='100%'/> 
              <Skeleton variant='text' height={30} width='100%'/> 
              <Skeleton variant='text' height={20} width='80%'/> 
              <Skeleton variant='text' height={20} width='90%'/> 
              <Skeleton variant='text' height={20} width='70%'/> 
            </div>
            </Container>
            )
          })
         
         :
          <Container className='container'>
          <Info />
          <Chart />
          <TableData />
          <Vaccin />
          </Container>

         }
    </motion.div>
  );
}

export default Main;
