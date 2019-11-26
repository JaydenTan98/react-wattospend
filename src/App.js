import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4'

const initialExpenses = [{ 
  id: uuid(),
  charge: "rent",
  amount: 1200
  },
  {
    id: uuid(),
    charge: "car",
    amount: 1200
  },
  {
    id: uuid(),
    charge: "mom",
    amount: 300
  }
];


function App() {
  //all of the expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");

  //functions to handle
  const handleCharge = e =>{
    setCharge(e.target.value)
  };
  //functions to handle
  const handleAmount = e =>{
    setAmount(e.target.value)
  };
  
  const handleSubmit = e =>{
    e.preventDefault();
    if(charge !== "" && amount > 0){  //Name of expense and amount conditions
      const singleExpense = {id: uuid(), charge, amount};
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
    }
    else{

    }
  };

  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm 
        charge={charge} 
        amount={amount} 
        handleAmount={handleAmount} 
        handleCharge={handleCharge} 
        handleSubmit={handleSubmit} /
        >
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending: <span className="total">
          $ {expenses.reduce((acc, curr)=>{
            return (acc += parseInt(curr.amount)) ; //integer coersion
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
