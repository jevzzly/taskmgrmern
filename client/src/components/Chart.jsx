import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Кастомный компонент для легенды
const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="recharts-default-legend" style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
          <svg width="14" height="14" viewBox="0 0 32 32" fill={entry.color} style={{ marginRight: 4 }}>
            <rect width="32" height="32" />
          </svg>
          {entry.value === 'total' ? 'Всего' : entry.value}
        </li>
      ))}
    </ul>
  );
};

// Кастомный компонент для подсказки (tooltip)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: 10, border: '1px solid #ccc' }}>
        <p className="label">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name === 'total' ? 'Всего' : entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export const Chart = ({data}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;