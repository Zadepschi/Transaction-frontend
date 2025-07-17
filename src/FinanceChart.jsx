import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';

function FinanceChart({ data }) {
  const { t } = useTranslation();

  // Кастомный тултип для перевода
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', padding: 10, border: '1px solid #ccc' }}>
          <p>{label}</p>
          {payload.map((entry) => (
            <p key={entry.name} style={{ color: entry.color }}>
              {t(entry.name)}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Кастомная легенда для перевода
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      {payload.map((entry) => (
        <span key={entry.value} style={{ marginRight: 20, display: 'flex', alignItems: 'center', color: '#000' }}>
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: entry.color,
              marginRight: 6,
              borderRadius: 2,
            }}
          />
          {t(entry.value)}
        </span>
      ))}
    </div>
  );
};


  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="30%"
        barGap={5}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
        <Bar dataKey="income" fill="#4caf50" name="Income" barSize={20}  />
        <Bar dataKey="expense" fill="#f44336" name="Expense" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FinanceChart;
