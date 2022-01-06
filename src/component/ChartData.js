import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid, Paper, Tabs, Tab } from '@material-ui/core';
import ReChart from 'component/ReChart';
function Chart(props) {
  const chartHeight = 350;
  const VN = useSelector((state) => state.covid.VietNam);
  const HN = useSelector((state) => state.covid.HaNoi);
  const HCM = useSelector((state) => state.covid.HoChiMinh);
  const [daily, setDaily] = useState([]);
  const [title, setTitle] = useState('Việt Nam');
  const [value, setValue] = useState('Việt Nam');
  const province = useSelector((state) => state.covid.Province);
  const provinceTotal = province
    ? province
        .filter((item) => item.z > 10000)
        .sort((a, b) => b.z - a.z)
        .slice(0, 4)
    : [];
  const dailyProvince = province
    ? province
        .filter((item) => item.y > 300)
        .sort((a, b) => b.y - a.y)
        .slice(0, 4)
    : [];
  useEffect(() => {
    setDaily(VN);
  }, [VN]);
  const handleChange = (e, newValue) => {
    switch (newValue) {
      case 'Hà Nội': {
        const data = HN.map((item) => {
          return {
            ...item,
            total: parseInt(item.total.split('.').join('')),
            daily: parseInt(item.daily.split('.').join('')),
          };
        });
        setDaily(data);
        setTitle('Hà Nội');
        break;
      }

      case 'Hồ Chí Minh': {
        const data = HCM.map((item) => {
          return {
            ...item,
            total: parseInt(item.total.split('.').join('')),
            daily: parseInt(item.daily.split('.').join('')),
          };
        });
        setDaily(data);
        setTitle('Hồ Chí Minh');
        break;
      }

      default:
        setDaily(VN);
        setTitle('Việt Nam');
    }
    setValue(newValue);
    console.log(newValue);
  };
  return (
    <div>
      <Paper elevation={4} className="selected">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value="Việt Nam" label="Tất cả" />
          <Tab value="Hà Nội" label="Hà Nội" />
          <Tab value="Hồ Chí Minh" label="Hồ Chí Minh" />
        </Tabs>
      </Paper>

      <Grid container spacing={2} className="chartContainer">
        <Grid item xs={12} md={6} lg={6} className="chartItem">
          <Paper elevation={4}>
            <h2>Số ca mắc tại {title} theo ngày</h2>
            <ReChart
              type="bar"
              data={daily}
              Xkey="date"
              Ykey="daily"
              color="red"
              height={chartHeight}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6} className="chartItem">
          <Paper elevation={4}>
            <h2>Tổng số ca mắc tại {title}</h2>
            <ReChart
              type="area"
              data={daily}
              Xkey="date"
              Ykey="total"
              stroke="red"
              color="red"
              height={chartHeight}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6} className="chartItem">
          <Paper elevation={4}>
            <h2>Tỉnh thành có số ca mắc trong ngày nhiều nhất</h2>
            <ReChart
              type="bar"
              data={dailyProvince}
              Xkey="x"
              Ykey="y"
              color="red"
              height={chartHeight}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6} className="chartItem">
          <Paper elevation={4}>
            <h2>Tỉnh thành có số ca mắc nhiều nhất</h2>
            <ReChart
              type="bar"
              data={provinceTotal}
              Xkey="x"
              Ykey="z"
              color="red"
              height={chartHeight}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Chart;
