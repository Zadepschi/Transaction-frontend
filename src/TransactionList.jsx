import React from 'react';

function TransactionList({ transactions, onEdit, onDelete }) {
  // Группируем по месяцам
  const groupedByMonth = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7); // Формат YYYY-MM
    if (!acc[month]) acc[month] = [];
    acc[month].push(tx);
    return acc;
  }, {});

  return (
    <div className="transaction-container">
      <h2 className='head'>My Transactions</h2>
      {transactions.length === 0 && <p>No transactions</p>}

      {Object.entries(groupedByMonth).map(([month, txs]) => (
        <div key={month} className="month-group">
          <h3>
            {new Date(month + '-01').toLocaleDateString('en-GB', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>

          <ul className="transaction-list">
            {txs.map(tx => (
              <li key={tx._id} className="transaction-item">
                <div><strong>{tx.type === 'income' ? 'Income' : 'Expense'}:</strong> {tx.amount}$</div>
                <div><strong>Category:</strong> {tx.category}</div>
                <div><strong>Date:</strong> {tx.date.slice(0, 10)}</div>
                <div><strong>Description:</strong> {tx.description}</div>
                <button className='deleteBtn' onClick={() => onDelete(tx._id)}>Delete</button>
                <button className='editBtn' onClick={() => onEdit(tx)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
