import React from 'react';
import { motion } from 'framer-motion';
import { Paper, Typography, Card, CardContent, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
function World(props) {
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
      <h4>Cập nhật : {convertTime(world.Date)}</h4>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <Card className="Cases" square>
            <CardContent>
              <Typography variant="h5">Số ca mắc mới</Typography>
              <Typography variant="h3" >
                {world.NewConfirmed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card  className="dead" square>
            <CardContent>
              <Typography variant="h5">Số ca tử vong</Typography>
              <Typography variant="h3">
                {world.NewDeaths}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card className="Cases" square>
            <CardContent>
              <Typography variant="h5">Tổng số ca mắc</Typography>
              <Typography variant="h3" >
                {world.TotalConfirmed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card className="dead" square>
            <CardContent>
              <Typography variant="h5">Tổng số ca tử vong</Typography>
              <Typography variant="h3" >
                {world.TotalDeaths}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default World;
