import React, { useState } from 'react';
import { Card, CardContent, Typography, Paper, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import CustomTooltip from 'custom/CustomTooltip';
import { formatNumber, formatDate } from 'custom/format';
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
              Tổng số người đã tiêm 1 mũi Vaccin
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
              Tổng số người đã tiêm 2 mũi Vaccin
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
              Tổng số mũi Vaccin đã tiêm được
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
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={vaccin.first.datas}>
                <Area dataKey="z" stroke="blue" fill="rgb(3, 252, 236)" />
                <XAxis dataKey="x" tickFormatter={(date) => formatDate(date)} />
                <YAxis
                  dataKey="z"
                  tickFormatter={(number) => formatNumber(number)}
                />
                <Tooltip content={<CustomTooltip text="Đã tiêm 1 mũi" />} />
                <CartesianGrid opacity={0.5} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={4}>
            <h2>Tổng số người đã tiêm 2 mũi vaccin</h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={vaccin.second.datas}>
                <Area dataKey="z" stroke="blue" fill="rgb(3, 252, 236)" />
                <XAxis dataKey="x" tickFormatter={(date) => formatDate(date)} />
                <YAxis
                  dataKey="z"
                  tickFormatter={(number) => formatNumber(number)}
                />
                <Tooltip content={<CustomTooltip text="Đã tiêm 2 mũi" />} />
                <CartesianGrid opacity={0.5} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default React.memo(Vaccin);
