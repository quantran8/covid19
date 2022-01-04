import React, { useState } from 'react';
import { Card, CardContent, Typography, Paper, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Chart from 'component/ReChart';
function Vaccin(props) {
  const vaccin = useSelector((state) => state.covid.Vaccin);
  return (
    <div>
      <h2>Tình hình tiêm chủng tại Việt Nam</h2>
      <Grid container >
        <Grid  item xs={12} sm={4} md={4} lg={4}>
          <Card square className="recover">
          <CardContent >
            <Typography  variant="h6" component="h2">
              Số người đã tiêm 1 mũi 
            </Typography>
            <Typography variant="h4"  >
              {vaccin.first.total&& vaccin.first.total.toLocaleString()}
            </Typography>
          </CardContent>
          </Card>
        </Grid>

        <Grid  item xs={12} sm={4} md={4} lg={4} >
          <Card square className="recover">
          <CardContent >
            <Typography  variant="h6" component="h2">
              Số người đã tiêm 2 mũi 
            </Typography>
            <Typography variant="h4" >
              {vaccin.second.total&&vaccin.second.total.toLocaleString()}
            </Typography>
          </CardContent>
          </Card>
        </Grid>

        <Grid  item xs={12} sm={4} md={4} lg={4}>
          <Card square className="recover">
          <CardContent >
            <Typography  variant="h6" component="h2">
              Số người đã được tiêm 
            </Typography>
            <Typography variant="h4" >
              {(vaccin.second.total + vaccin.first.total).toLocaleString()}
            </Typography>
          </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={4}>
            <h2>Tổng số người đã tiêm 1 mũi vaccin</h2>
            <Chart data={vaccin.first.datas} stroke="blue" height={400} Xkey="x" Ykey="z" color="rgb(3, 252, 236)" content="Số mũi tiêm được"/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={4}>
            <h2>Tổng số người đã tiêm 2 mũi vaccin</h2>
            <Chart data={vaccin.second.datas} stroke="blue" height={400} Xkey="x" Ykey="z" color="rgb(3, 252, 236)" content="Số mũi tiêm được" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default React.memo(Vaccin);
