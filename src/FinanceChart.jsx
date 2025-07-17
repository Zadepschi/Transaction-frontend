import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function FinanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="30%"  // отступ между группами (месяцами)
        barGap={5}             // отступ между доходом и расходом
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Два отдельных столбика рядом для одного месяца */}
        <Bar dataKey="income" fill="#4caf50" name="Income" barSize={20} />
        <Bar dataKey="expense" fill="#f44336" name="Expense" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FinanceChart;
