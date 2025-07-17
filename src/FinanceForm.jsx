import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


function FinanceForm({ onAddTransaction, editingTransaction }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [id, setId] = useState(null); 
  
  const { t } = useTranslation();


  const categories = {
    expense: ['Food', 'Transport', 'Fun', 'Housing', 'Other'],
    income: ['Salary', 'Gifts', 'Side Income', 'Other'],
  };

  
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date.slice(0, 10));
      setDescription(editingTransaction.description || '');
      setId(editingTransaction._id);
    }
  }, [editingTransaction]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!amount || !category) {
      alert('Please enter amount and category.');
      return;
    }

    const transaction = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    if (id) {
      transaction._id = id;
    }

    onAddTransaction(transaction);

   
    setType('expense');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
    setDescription('');
    setId(null);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>{id ? t('Edit Transaction') : t('Add Transaction')}</h2>

<label>
  {t('Transaction Type')}:
  <select value={type} onChange={e => setType(e.target.value)}>
    <option value="expense">{t('Expense')}</option>
    <option value="income">{t('Income')}</option>
  </select>
</label>

<label>
  {t('Amount')}:
  <input
    type="number"
    value={amount}
    onChange={e => setAmount(e.target.value)}
    step="0.01"
    min="0"
    required
  />
</label>

<label>
  {t('Category')}:
  <select
    value={category}
    onChange={e => setCategory(e.target.value)}
    required
  >
    <option value="">{t('Select a category')}</option>
    {categories[type].map(cat => (
      <option key={cat} value={cat}>{t(`${cat}`)}</option>
    ))}
  </select>
</label>

<label>
  {t('Date')}:
  <input
    type="date"
    value={date}
    onChange={e => setDate(e.target.value)}
    required
  />
</label>

<label>
  {t("Description (optional)")}:
  <input
    type="text"
    value={description}
    onChange={e => setDescription(e.target.value)}
    placeholder={t("e.g. grocery shopping")}
  />
</label>

<button type="submit" style={{ marginTop: 10 }}>
  {id ? t('Save') : t('Add')}
</button>

    </form>
  );
}

export default FinanceForm;
