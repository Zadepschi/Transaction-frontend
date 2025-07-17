import React, { useEffect, useState } from 'react';

function FinanceForm({ onAddTransaction, editingTransaction }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [id, setId] = useState(null); // used to distinguish editing mode
  const [modalOpen, setModalOpen] = useState(false);

  const categories = {
    expense: ['Food', 'Transport', 'Fun', 'Housing', 'Other'],
    income: ['Salary', 'Gifts', 'Side Income', 'Other'],
  };

  // Automatically fill form for editing
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

    // Clear form
    setType('expense');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
    setDescription('');
    setId(null);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>{id ? 'Edit' : 'Add'} Transaction</h2>

      <label>
        Transaction Type:
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>

      <label>
        Amount:
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
        Category:
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories[type].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Description (optional):
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="e.g. grocery shopping"
        />
      </label>

      <button type="submit" style={{ marginTop: 10 }}>
        {id ? 'Save' : 'Add'}
      </button>
     
    </form>
  );
}

export default FinanceForm;
