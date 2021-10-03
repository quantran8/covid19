import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Card, CardContent, Typography, Grid, formatMs } from '@material-ui/core';
import { formatDate } from 'custom/format';
import moment from 'moment';
import 'moment/locale/vi';  
function Info(props) {
  moment.locale('vi');
  console.log(moment.locale('vi'));
  const data = useSelector((state) => state.covid.VietNam);
  const time = useSelector((state) => state.covid.Time);
  const lastUpdate = data[data.length - 1];
  const date = lastUpdate ? formatDate(lastUpdate.date) : '';
  const day =lastUpdate? moment(lastUpdate.date).calendar():'';
  const d=day.split('l');

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
            <Typography variant="h5">Cập nhật : {d[0] }</Typography>
            <Grid container>
              <Grid item xs={6} md={3} lg={3}>
                <Card square className="Cases">
                  <CardContent >
                   
                        <Typography variant="h6"> Nhiễm</Typography>
                        <Typography variant="h4">+{lastUpdate.daily.toLocaleString()}</Typography>
                    
                        <Typography variant="h6">Tổng nhiễm</Typography>
                        <Typography variant="h4">{lastUpdate.total.toLocaleString()}</Typography>
                     
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} md={3} lg={3}>
                <Card className="recover" square>
                  <CardContent>
                  
                        <Typography variant="h6"> Khỏi</Typography>
                        <Typography variant="h4">
                          +{lastUpdate.recover.toLocaleString()}
                        </Typography>
                    
                        <Typography variant="h6">
                          Tổng khỏi
                        </Typography>
                        <Typography variant="h4">
                          {lastUpdate['total-recover'].toLocaleString()}
                        </Typography>
                    
                  
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} md={3} lg={3}>
                <Card className="dead" square>
                  <CardContent>
                   
                        <Typography  variant="h6">tử vong</Typography>
                        <Typography variant="h4">+{lastUpdate.dead.toLocaleString()}</Typography>
                      
                        <Typography variant="h6">Tổng tử vong</Typography>
                        <Typography variant="h4">
                          {lastUpdate['total-dead'].toLocaleString()}
                        </Typography>
                     
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} md={3} lg={3}>
                <Card className="treat" square>
                  <CardContent>
                    <Typography  variant="h6"> đang diều trị</Typography>
                    <Typography variant="h4">
                      {(lastUpdate.total - lastUpdate['total-recover']).toLocaleString()}
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
