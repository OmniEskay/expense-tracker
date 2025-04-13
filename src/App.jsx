import React, { useState } from 'react';
import './App.css'; 


function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (!description || !amount || !category) {
      alert('Please fill in all fields.');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        alert('Please enter a valid positive amount.');
        return;
    }

    const newExpense = {
      id: Date.now(),
      description,
      amount: numericAmount,
      category,
    };

    onAddExpense(newExpense);

    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add New Expense</h2>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount (KES): </label> 
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
}

function ExpenseFilter({ filterTerm, onFilterChange }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label htmlFor="search">Filter by Description: </label>
      <input
        type="search"
        id="search"
        placeholder="Search expenses..."
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}

function ExpenseTable({ expenses, onDeleteExpense, onSort }) {

  if (!expenses || expenses.length === 0) {
    return <p>No expenses to display.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => onSort('description')}>
              Description
            </button>
          </th>
          <th>Amount</th> 
          <th>
             <button type="button" onClick={() => onSort('category')}>
               Category
             </button>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>
              {expense.amount.toLocaleString('en-KE', {
                style: 'currency',
                currency: 'KES',
              })}
            </td>
            <td>{expense.category}</td>
            <td>
              <button onClick={() => onDeleteExpense(expense.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



const INITIAL_EXPENSES = [
  { id: 1, description: 'Groceries (Naivas)', amount: 3550.75, category: 'Food' },
  { id: 2, description: 'Petrol (Total)', amount: 5000.00, category: 'Transport' },
  { id: 3, description: 'Movie Tickets (Century Cinemax)', amount: 1200.00, category: 'Entertainment' },
  { id: 4, description: 'Coffee (Java House)', amount: 450.00, category: 'Food' },
];

function App() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [filterTerm, setFilterTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (idToDelete) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== idToDelete)
    );
  };

  const handleFilterChange = (term) => {
    setFilterTerm(term);
  };

   const handleSort = (key) => {
    if (sortKey === key) {
        setSortKey(null);
    } else {
        setSortKey(key);
    }
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const sortedAndFilteredExpenses = [...filteredExpenses];
  if (sortKey) {
    sortedAndFilteredExpenses.sort((a, b) => {
      const valueA = String(a[sortKey] || '').toLowerCase();
      const valueB = String(b[sortKey] || '').toLowerCase();
      return valueA.localeCompare(valueB);
    });
  }

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <hr />
      <h2>My Expenses</h2>
      <ExpenseFilter
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <ExpenseTable
        expenses={sortedAndFilteredExpenses}
        onDeleteExpense={handleDeleteExpense}
        onSort={handleSort}
      />
    </div>
  );
}

export default App;