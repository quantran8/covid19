import { Container } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Chart from 'component/chart';
import Info from 'component/info';
import TableData from 'component/TableData';
import Vaccin from 'component/Vaccin';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import './main.scss';

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
