import React, { useState,useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4'

// const initialExpenses = [{ 
//   id: uuid(),
//   charge: "rent",
//   amount: 1200
//   },
//   {
//     id: uuid(),
//     charge: "car",
//     amount: 1200
//   },
//   {
//     id: uuid(),
//     charge: "mom",
//     amount: 300
//   }
// ];

//local storage api
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  :[];



function App() {
  //all of the expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");
//alert
  const [alert, setAlert] = useState({show:false});

  const [edit, setEdit] = useState(false);

  const [id, setId] = useState(0);
  
  useEffect(()=>{
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses])

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
      if(edit){
        let temp = expenses.map(item => {
          return item.id === id?{...item, charge, amount} :item
        })
        setExpenses(temp);
        setEdit(false);
        handleAlert({type: "success", text: "Expense Edited"});
      }
      else{
        const singleExpense = {id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpense]);
        handleAlert({type: "success", text: "Added Expense to List"});
      }
      setCharge("");
      setAmount("");

    }
    else{
      handleAlert({type: "danger", text: "Fill the category section and Insert amount with value > 0"}); 
    }
  };
  //Clear every items

  const clearItems = () =>{
    setTimeout(()=>{
      setExpenses([]);
    }, 600)
    handleAlert({type:"danger", text:"All Expenses Deleted"})
  }

  //Delete single item

  const handleDelete = (id)=> {
    let temp = expenses.filter(item => item.id !== id);
    setExpenses(temp);
    handleAlert({type:"danger", text:"Expense Deleted"})
  }

  const handleEdit = (id)=> {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

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
        handleSubmit={handleSubmit}
        edit={edit} /
        >
        <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems}/>
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
