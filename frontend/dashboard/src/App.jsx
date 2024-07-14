/*
import React, { useState } from 'react';
import TransactionList from './components/TransactionList';
import BarChart from './components/Chart/BarChart';
import PieChart from './components/Chart/PieChart';
import { fetchTransactions, fetchStatistics } from './services/api';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [month, setMonth] = useState('');

  const handleSearch = async (selectedMonth) => {
    const transactionData = await fetchTransactions(selectedMonth);
    setTransactions(transactionData);

    const statisticsData = await fetchStatistics(selectedMonth);
    setStatistics(statisticsData);
  };

  return (
    <div className="App">
      <header>
        <h1>Dashboard</h1>
        <input
          type="month"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </header>
      <TransactionList transactions={transactions} />
      {statistics && (
        <div className="charts">
          <BarChart statistics={statistics} />
          <PieChart statistics={statistics} />
        </div>
      )}
    </div>
  );
}

export default App;
*/

//this is last updated code

/*
import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import BarChart from './components/Chart/BarChart';
import PieChart from './components/Chart/PieChart';
import { fetchTransactions, fetchStatistics } from './services/api';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    handleSearch();
  }, [month, currentPage]);

  const handleSearch = async () => {
    try {
      const transactionData = await fetchTransactions(month, currentPage, 10, search);
      setTransactions(transactionData.transactions);
      setTotalPages(Math.ceil(transactionData.total / 10));

      const statsData = await fetchStatistics(month);
      setStatistics(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="App">
      <header>
        <h1>Dashboard</h1>
        <nav>
          <button 
            className={activeTab === 'transactions' ? 'active' : ''}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
        </nav>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </header>
      <main>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search transactions" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
        {activeTab === 'transactions' && (
          <>
            <h2>Transactions for {month}</h2>
            <TransactionList transactions={transactions} />
            <div className="pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
        {activeTab === 'stats' && statistics && (
          <div className="charts">
            <BarChart statistics={statistics} />
            <PieChart statistics={statistics} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
*/

/*
import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import BarChart from './components/Chart/BarChart';
import PieChart from './components/Chart/PieChart';
import { fetchTransactions, fetchStatistics } from './services/api';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSearch();
  }, [month, currentPage]); // Remove search from dependencies

  useEffect(() => {
    handleSearch();
  }, []); // Add this effect for initial load

  const handleSearch = async () => {
    try {
      setError(null);
      const transactionData = await fetchTransactions(month, currentPage, 10, search);
      console.log('Received transaction data:', transactionData);
      setTransactions(transactionData);
      // Assuming the backend now returns a total count
      setTotalPages(Math.ceil(transactionData.totalCount / 10));

      const statsData = await fetchStatistics(month);
      console.log('Received statistics data:', statsData);
      setStatistics(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again.');
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="App">
      <header>
        <h1>Dashboard</h1>
        <nav>
          <button 
            className={activeTab === 'transactions' ? 'active' : ''}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
        </nav>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </header>
      <main>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search transactions" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {activeTab === 'transactions' && (
          <>
            <h2>Transactions for {month}</h2>
            <TransactionList transactions={transactions} />
            <div className="pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
        {activeTab === 'stats' && statistics && (
          <div className="charts">
            <BarChart statistics={statistics} />
            <PieChart statistics={statistics} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
*/

import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import BarChart from './components/Chart/BarChart';
import PieChart from './components/Chart/PieChart';
import { fetchTransactions, fetchStatistics } from './services/api';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [month, currentPage]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const transactionData = await fetchTransactions(month, currentPage, 10, search);
      console.log('Received transaction data:', transactionData);
      setTransactions(transactionData.transactions || []);
      setTotalPages(Math.ceil(transactionData.totalCount / 10));

      const statsData = await fetchStatistics(month);
      console.log('Received statistics data:', statsData);
      setStatistics(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="App">
      <header>
        <h1>Dashboard</h1>
        <nav>
          <button 
            className={activeTab === 'transactions' ? 'active' : ''}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
        </nav>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </header>
      <main>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search transactions" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Loading...</div>}
        {!loading && activeTab === 'transactions' && (
          <>
            <h2>Transactions for {month}</h2>
            {transactions.length > 0 ? (
              <TransactionList transactions={transactions} />
            ) : (
              <p>No transactions found.</p>
            )}
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1 || loading}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages || loading}
              >
                Next
              </button>
            </div>
          </>
        )}
        {!loading && activeTab === 'stats' && statistics && (
          <div className="charts">
            <BarChart statistics={statistics} />
            <PieChart statistics={statistics} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;