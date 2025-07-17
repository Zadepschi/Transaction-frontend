import React, { useState, useEffect } from "react";
import FinanceForm from "./FinanceForm";
import TransactionList from "./TransactionList";
import axios from "axios";
import "./App.css";
import FinanceChart from "./FinanceChart";
import Dashboard from "./Dashboard";
import Swal from 'sweetalert2';

// Вынес функцию вне компонента, чтобы не создавать заново при каждом рендере
function aggregateByMonth(transactions) {
  const monthly = {};
  transactions.forEach((tx) => {
    const month = tx.date.slice(0, 7);
    if (!monthly[month]) {
      monthly[month] = { date: month, income: 0, expense: 0 };
    }
    if (tx.type === "income") {
      monthly[month].income += tx.amount;
    } else {
      monthly[month].expense += tx.amount;
    }
  });
  return Object.values(monthly).sort((a, b) => a.date.localeCompare(b.date));
}

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Ошибка загрузки транзакций:", err.message);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      if (data._id) {
        await axios.put(
          `http://localhost:4000/api/transactions/${data._id}`,
          data,
        );
      } else {
        await axios.post("http://localhost:4000/api/transactions", data);
      }
      setEditingTransaction(null);
      fetchTransactions();
    } catch (err) {
      console.error("Ошибка при сохранении транзакции:", err.message);
    }
  };

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to delete this transaction?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:4000/api/transactions/${id}`);
      fetchTransactions();
      Swal.fire('Deleted!', 'The transaction has been deleted.', 'success');
    } catch (err) {
      console.error('Error deleting transaction:', err.message);
      Swal.fire('Error', 'Failed to delete the transaction', 'error');
    }
  }
};



  const chartData = aggregateByMonth(transactions);

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Finance Tracker</h1>
        <div className="app-content">
          <div className="form-container">
            <FinanceForm
              onAddTransaction={handleAddOrUpdate}
              editingTransaction={editingTransaction}
            />
          <div  className="showButtons">
            <div>
              <button className="custom-button" onClick={() => setModalOpen(true)}>Show Chart</button>

              {modalOpen && (
                <div
                  className="modal-overlay"
                  onClick={() => setModalOpen(false)}
                >
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="close-btn"
                      onClick={() => setModalOpen(false)}
                    >
                      ×
                    </button>
                    <h2>Finance Chart</h2>
                    <FinanceChart data={chartData} />
                  </div>
                </div>
              )}
            </div>

            <div>
              <button className="custom-button" onClick={() => setDashboardOpen(true)}>
                Show Dashboard
              </button>

              {dashboardOpen && (
                <div
                  className="modal-overlay1"
                  onClick={() => setDashboardOpen(false)}
                >
                  <div
                    className="modal-content1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="close-btn"
                      onClick={() => setDashboardOpen(false)}
                    >
                      ×
                    </button>
                    <h2>Dashboard</h2>
                    <Dashboard transactions={transactions} />
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>

          <div className="transaction-list-container">
            <TransactionList
              transactions={transactions}
              onEdit={setEditingTransaction}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
