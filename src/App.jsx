import React, { useState, useEffect } from "react";
import FinanceForm from "./FinanceForm";
import TransactionList from "./TransactionList";
import axios from "axios";
import "./App.css";
import FinanceChart from "./FinanceChart";
import Dashboard from "./Dashboard";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


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
  const {i18n, t } = useTranslation();


   const toglleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

const fetchTransactions = async () => {
  try {
    const res = await axios.get("https://transaction-backend-hgo9.onrender.com/api/transactions");
    setTransactions(res.data);
  } catch (err) {
    console.error("Ошибка загрузки транзакций:", err.message);
  }
};

const handleAddOrUpdate = async (data) => {
  try {
    const baseURL = "https://transaction-backend-hgo9.onrender.com/api/transactions";

    if (data._id) {
      await axios.put(`${baseURL}/${data._id}`, data);
    } else {
      await axios.post(baseURL, data);
    }

    setEditingTransaction(null);
    fetchTransactions();
  } catch (err) {
    console.error("Ошибка при сохранении транзакции:", err.message);
  }
};


const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: t('Are you sure?'),
    text: t('Do you really want to delete this transaction?'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: t('Yes, delete it'),
    cancelButtonText: t('Cancel')
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`https://transaction-backend-hgo9.onrender.com/api/transactions/${id}`);
      fetchTransactions();
      Swal.fire(t('Deleted!'), t('The transaction has been deleted.'), 'success');
    } catch (err) {
      console.error(t('Error deleting transaction:'), err.message);
      Swal.fire(t('Error'), t('Failed to delete the transaction'), 'error');
    }
  }
};


  const chartData = aggregateByMonth(transactions);

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}> {t('Finance Tracker')}</h1>
        <button onClick={toglleLang} className="lang-button">
          {i18n.language === 'en' ? 'EN'  : 'RU'}
        </button>
        <div className="app-content">
          <div className="form-container">
            <FinanceForm
              onAddTransaction={handleAddOrUpdate}
              editingTransaction={editingTransaction}
            />
          <div  className="showButtons">
            <div>
              <button className="custom-button" onClick={() => setModalOpen(true)}>{t("Show Chart")}</button>

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
                    <h2>{t("Finance Chart")}</h2>
                    <FinanceChart data={chartData} />
                  </div>
                </div>
              )}
            </div>

            <div>
              <button className="custom-button" onClick={() => setDashboardOpen(true)}>
               {t( "Show Dashboard")}
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
                    <h2>{t('Dashboard')}</h2>
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
