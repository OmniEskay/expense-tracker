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