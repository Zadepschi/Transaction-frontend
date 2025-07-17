import React from 'react';
import PieChartComponent from './PieChartComponent';

function Dashboard({ transactions }) {
  // Группировка расходов по категориям
  const expenseData = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      const found = acc.find(item => item.category === tx.category);
      if (found) {
        found.amount += tx.amount;
      } else {
        acc.push({ category: tx.category, amount: tx.amount });
      }
      return acc;
    }, []);

  // Группировка доходов по категориям
  const incomeData = transactions
    .filter(tx => tx.type === 'income')
    .reduce((acc, tx) => {
      const found = acc.find(item => item.category === tx.category);
      if (found) {
        found.amount += tx.amount;
      } else {
        acc.push({ category: tx.category, amount: tx.amount });
      }
      return acc;
    }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <PieChartComponent data={expenseData} title="Expenses by Category" />
      <PieChartComponent data={incomeData} title="Income by Category" />
    </div>
  );
}

export default Dashboard;
