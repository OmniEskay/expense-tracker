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
        <label htmlFor="amount">Amount: </label>
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
            <td>${expense.amount.toFixed(2)}</td>
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