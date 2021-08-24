import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,

} from 'recharts';
import { useSelector } from 'react-redux';
import { Button, Grid, Paper, Tabs, Tab } from '@material-ui/core';
import CustomTooltip from 'custom/CustomTooltip';
import { formatNumber, formatDate } from 'custom/format';
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
    ? province.filter((item) => item.z > 10000).sort((a, b) => b.z - a.z)
    : [];
  const dailyProvince = province
    ? province.filter((item) => item.y > 300).sort((a, b) => b.y - a.y)
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
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={daily}>
                <Bar dataKey="daily" fill="red" opacity={0.8} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => formatDate(date)}
                />
                <YAxis
                  dataKey="daily"
                  tickCount={6}
                  tickFormatter={(number) => formatNumber(number)}
                />
                <Tooltip content={<CustomTooltip text="Số ca mắc" />} />
                <CartesianGrid opacity={0.5} vertical={false} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6} className="chartItem">
          <Paper elevation={4}>
            <h2>Tổng số ca mắc tại {title}</h2>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <AreaChart data={daily}>
                <Area dataKey="total" stroke="red" fill="red" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => formatDate(date)}
                />
                <YAxis
                  dataKey="total"
                  tickCount={6}
                  tickFormatter={(number) => formatNumber(number)}
                />
                <Tooltip content={<CustomTooltip text="Số ca mắc" />} />
                <CartesianGrid opacity={0.5} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6} className="chartItem">
          <Paper elevation={4}>
            <h2>Tỉnh thành có số ca mắc trong ngày nhiều nhất</h2>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={dailyProvince}>
                <Bar dataKey="y" stroke="red" fill="red" opacity={0.7} />
                <XAxis dataKey="x" />
                <YAxis
                  dataKey="y"
                  tickCount={4}
                  tickFormatter={(number) => formatNumber(number)}
                />
                <Tooltip content={<CustomTooltip text="Số ca mắc" />} />
                <CartesianGrid opacity={0.5} vertical={false} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6} className="chartItem">
          <Paper elevation={4}>
            <h2>Tỉnh thành có tổng số ca mắc nhiều nhất</h2>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={provinceTotal}>
                <Bar dataKey="z" stroke="red" fill="red" opacity={0.7} />
                <XAxis dataKey="x" />
                <YAxis
                  dataKey="z"
                  tickCount={4}
                  tickFormatter={(number) => formatNumber(number)}
                />
                <Tooltip content={<CustomTooltip text="Số ca mắc" />} />
                <CartesianGrid opacity={0.5} vertical={false} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Chart;
