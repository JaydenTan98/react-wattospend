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
//alert
  const [alert, setAlert] = useState({show:false});

  //functions to handle
  const handleCharge = e =>{
    setCharge(e.target.value)
  };
  //functions to handle
  const handleAmount = e =>{
    setAmount(e.target.value)
  };

  const handleAlert = ({type, text}) =>{
    setAlert({show: true, type, text});
    setTimeout(()=>{
      setAlert({show: false});
    }, 3000)              //Disapppear after 3 seconds (The Alert)
  }
  
  const handleSubmit = e =>{
    e.preventDefault();
    if(charge !== "" && amount > 0){  //Name of expense and amount conditions
      const singleExpense = {id: uuid(), charge, amount};
      setExpenses([...expenses, singleExpense]);
      handleAlert({type: "success", text: "Added Expense to List"});
      setCharge("");
      setAmount("");

    }
    else{
      handleAlert({type: "danger", text: "Fill the category section and Insert amount with value > 0"}); 
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/> }
      <Alert />
      <h1>WattoSpend</h1>
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
