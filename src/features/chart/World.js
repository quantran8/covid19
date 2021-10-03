import React from 'react';
import { motion } from 'framer-motion';
import { Paper, Typography, Card, CardContent, Grid, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import 'moment/locale/vi';  
import moment from 'moment';

function World(props) {
  const loading = useSelector((state) => state.covid.Loading);
  const world = useSelector((state) => state.covid.World);
  const convertTime = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  return (
    <motion.div
      className="world"
      initial={{ x: -100, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
    {loading?
    <Container>
        <Skeleton variant='react' height={100} width='100%'/> 
        <Skeleton variant='text' height={30} width='100%'/> 
        <Skeleton variant='text' height={20} width='80%'/> 
        <Skeleton variant='text' height={20} width='90%'/> 
        <Skeleton variant='text' height={20} width='70%'/> 

    </Container>
    :
    <Container>
        <h4>Cập nhật : {moment(world.Date).fromNow()}</h4>
      <Grid container >
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card className="Cases" square>
            <CardContent>
              <Typography variant="h6">Số ca mắc mới</Typography>
              <Typography variant="h4" >
                {world.new_cases}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card  className="dead" square>
            <CardContent>
              <Typography variant="h6">Số ca tử vong</Typography>
              <Typography variant="h4">
                {world.new_deaths}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card className="Cases" square>
            <CardContent>
              <Typography variant="h6">Tổng số ca mắc</Typography>
              <Typography variant="h4" >
                {world.total_cases}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card className="dead" square>
            <CardContent>
              <Typography variant="h6">Tổng số ca tử vong</Typography>
              <Typography variant="h4" >
                {world.total_deaths}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>}
    </motion.div>
  );
}

export default World;
