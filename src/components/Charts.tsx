import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import * as dataSource from '../data';
import './Charts.css';

const TinyLineChart = () => (
  <ResponsiveContainer>
    <LineChart data={dataSource.d1}>
      <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={1} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={1} />
    </LineChart>
  </ResponsiveContainer>
);

const Charts = () => (
  <div style={{ width: '100%', height: 300 }}>
    <h1>Charts</h1>

    <TinyLineChart />
  </div>
);

export { Charts };
