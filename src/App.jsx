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