import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Area,
} from 'recharts';
import { formatNumber, formatDate } from 'custom/format';
import CustomTooltip from 'custom/CustomTooltip';

import React from 'react';

const ReChart = (props) => {
  if (props.type === 'bar')
    return (
      <div>
        <ResponsiveContainer width="100%" height={props.height}>
          <BarChart data={props.data}>
            <Bar
              dataKey={props.Ykey}
              fill={props.color ?? 'red'}
              opacity={0.8}
            />
            <XAxis
              dataKey={props.Xkey}
              tickFormatter={(date) => formatDate(date)}
            />
            <YAxis
              dataKey={props.Ykey}
              tickCount={6}
              tickFormatter={(number) => formatNumber(number)}
            />
            <Tooltip
              content={<CustomTooltip text={props.content ?? 'Số ca mắc'} />}
            />
            <CartesianGrid opacity={0.5} vertical={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  else
    return (
      <ResponsiveContainer width="100%" height={props.height}>
        <AreaChart data={props.data ?? []}>
          <Area
            dataKey={props.Ykey}
            stroke={props.stroke ?? 'blue'}
            fill={props.color ?? 'red'}
            opacity={0.8}
          />
          <XAxis
            dataKey={props.Xkey}
            tickFormatter={(date) => formatDate(date)}
          />
          <YAxis
            dataKey={props.Ykey}
            tickCount={6}
            tickFormatter={(number) => formatNumber(number)}
          />
          <Tooltip
            content={<CustomTooltip text={props.content ?? 'Số ca mắc'} />}
          />
          <CartesianGrid opacity={0.5} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
};

export default ReChart;
