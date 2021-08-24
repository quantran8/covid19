import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Card, CardContent, Typography, Grid } from '@material-ui/core';
import { formatDate } from 'custom/format';
function Info(props) {
  const data = useSelector((state) => state.covid.VietNam);
  const lastUpdate = data[data.length - 1];
  const date = lastUpdate ? formatDate(lastUpdate.date) : '';

  return (
    <div>
      {lastUpdate && (
        <div>
          <div>
            <Typography variant="h4">Dữ liệu CoVid-19 tại Việt Nam </Typography>
            <Typography variant="h6">Dữ liệu cập nhật ngày : {date}</Typography>
            <Typography variant="h7">Nguồn theo Zingnews.vn</Typography>
          </div>

          <Paper elevation={4} className="info">
            <h2 className="title">Tình hình dịch COVID-19 tại Việt Nam</h2>
            <Typography variant="h5">Ngày {date}</Typography>
            <Grid container>
              <Grid item xs={12} md={6} lg={6}>
                <Card square>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6">Số ca mắc</Typography>
                        <Typography className="Cases" variant="h3">
                          {lastUpdate.daily}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6">Tổng số ca mắc</Typography>
                        <Typography className="Cases" variant="h3">
                          {lastUpdate.total}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <Card square>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6">Số ca hồi phục</Typography>
                        <Typography className="recover" variant="h3">
                          {lastUpdate.recover}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6">
                          Tổng số ca hồi phục
                        </Typography>
                        <Typography className="recover" variant="h3">
                          {lastUpdate['total-recover']}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <Card square>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6">Số ca tử vong</Typography>
                        <Typography className="dead" variant="h3">
                          {lastUpdate.dead}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h6">Tổng số ca tử vong</Typography>
                        <Typography className="dead" variant="h3">
                          {lastUpdate['total-dead']}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <Card square>
                  <CardContent>
                    <Typography variant="h6">Số ca đang diều trị</Typography>
                    <Typography className="treat" variant="h3">
                      {lastUpdate.total - lastUpdate['total-recover']}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );
}

export default Info;
