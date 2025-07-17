import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

const COLORS = [
  '#0088FE',
  '#FF8042',
  '#00C49F',
  '#FFBB28',
  '#A28CF2',
  '#FF6699',
  '#33CC99'
];

function PieChartComponent({ data, title }) {
  const [chartSize, setChartSize] = useState({
    width: 510,
    height: 450,
    radius: 90
  });

  const { t } = useTranslation();

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 500) {
        setChartSize({ width: 300, height: 280, radius: 60 });
      } else if (width < 768) {
        setChartSize({ width: 400, height: 400, radius: 75 });
      } else {
        setChartSize({ width: 510, height: 450, radius: 90 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  
const renderCustomizedLabel = ({ percent, name }) => {
  return `${t(`${name}`)}: ${(percent * 100).toFixed(0)}%`;
};



  return (
    <div style={{ margin: 10, textAlign: 'center' }}>
      <h3>{t(title)}</h3>

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
     <Tooltip
  formatter={(value, name) => [`${value}$`, t('Amount')]}
  labelFormatter={(label) => t(`${label}`)} // обязательно с префиксом
/>
<Legend
  formatter={(value) => t(`${value}`)}
/>

      </PieChart>
    </div>
  );
}

export default PieChartComponent;
