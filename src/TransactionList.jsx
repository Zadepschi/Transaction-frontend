import React from 'react';
import { useTranslation } from 'react-i18next';

function TransactionList({ transactions, onEdit, onDelete }) {
  const { t, i18n } = useTranslation();

  // Группировка транзакций по месяцам
  const groupedByMonth = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7); // формат YYYY-MM
    if (!acc[month]) acc[month] = [];
    acc[month].push(tx);
    return acc;
  }, {});

  return (
    <div className="transaction-container">
      <h2 className="head">{t('My Transactions')}</h2>

      {transactions.length === 0 && <p>{t('No transactions')}</p>}

      {Object.entries(groupedByMonth).map(([month, txs]) => (
        <div key={month} className="month-group">
          <h3>
            {new Date(`${month}-01`).toLocaleDateString(
              i18n.language === 'ru' ?   'en-GB'   : 'ru-RU',
              {
                month: 'long',
                year: 'numeric',
              }
            )}
          </h3>

          <ul className="transaction-list">
            {txs.map((tx) => (
              <li key={tx._id} className="transaction-item">
                <div>
                  <strong>{t(tx.type === 'income' ? 'Income' : 'Expense')}:</strong> {tx.amount}$
                </div>
                <div>
                  <strong>{t('Category')}:</strong> {tx.category}
                </div>
                <div>
                  <strong>{t('Date')}:</strong> {tx.date.slice(0, 10)}
                </div>
                <div>
                  <strong>{t('Description')}:</strong> {tx.description}
                </div>
                <button className="deleteBtn" onClick={() => onDelete(tx._id)}>
                  {t('Delete')}
                </button>
                <button className="editBtn" onClick={() => onEdit(tx)}>
                  {t('Edit')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
