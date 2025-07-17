import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#0088FE',
  '#FF8042',
  '#00C49F',
  '#FFBB28',
  '#A28CF2',
  '#FF6699',
  '#33CC99'
];

// Функция, чтобы выводить проценты в лейбле
const renderCustomizedLabel = ({ percent, name }) => {
  return `${name}: ${(percent * 100).toFixed(0)}%`;
};

function PieChartComponent({ data, title }) {
  const [chartSize, setChartSize] = useState({
    width: 510,
    height: 450,
    radius: 90
  });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 500) {
        // Мобильная версия
        setChartSize({ width: 300, height: 280, radius: 60 });
      } else if (width < 768) {
        // Планшет
        setChartSize({ width: 400, height: 400, radius: 75 });
      } else {
        // Десктоп
        setChartSize({ width: 510, height: 450, radius: 90 });
      }
    };

    updateSize(); // начальное значение
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div style={{ margin: 10, textAlign: 'center' }}>
      <h3>{title}</h3>

      <PieChart width={chartSize.width} height={chartSize.height}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={chartSize.radius}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}$`, 'Amount']} />
        <Legend />
      </PieChart>
    </div>
  );
}

export default PieChartComponent;
