import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import { v4 as uuid } from 'uuid';

const initialExpense = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

//******************************Functionality *****************************************
function App() {
  const [expenses, setExpenses] = useState(initialExpense);

  // single change

  const [charge, setCharge] = useState('');

  // single amount
  const [amount, setAmount] = useState('');

  // alert
  const [alert, setAlert] = useState({ show: false });

  // edit
  const [edit, setEdit] = useState(false);

  //  id
  const [id, setId] = useState(0);

  //**************************** Use effect ***********************************

  useEffect(() => {
    console.log('effect called');
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  //******************************Functionality *****************************************

  // handle charge
  const handleCharge = (e) => {
    // console.log(e.target.value)
    setCharge(e.target.value);
  };

  // handle amount
  const handleAmount = (e) => {
    // console.log(e.target.value)
    setAmount(e.target.value);
  };

  // handle submit
  const handlSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: 'success', text: `item edited` });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: `an item had been added successfully` });
      }

      setAmount('');
      setCharge('');
    } else {
      // alert function to be called
      handleAlert({ type: 'danger', text: `charge value and amount can't be empty and amount can't be less than 0` });
    }
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // handle clear
  const handleClear = () => {
    setExpenses([]);
    handleAlert({ type: 'success', text: `All items cleared` });
  };

  // handle delete
  const handleDelete = (id) => {
    const sortedItem = expenses.filter((item) => item.id !== id);
    setExpenses(sortedItem);
    handleAlert({ type: 'success', text: 'item deleted ' });
  };

  // handle edit

  const handleEdit = (id) => {
    let temptItems = expenses.find((item) => item.id === id);
    const { charge, amount } = temptItems;
    setAmount(amount);
    setCharge(charge);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator </h1>
      <main className="App">
        <ExpenseForm charge={charge} handleCharge={handleCharge} edit={edit} amount={amount} handleAmount={handleAmount} handleSubmit={handlSubmit} />
        <ExpenseList expenses={expenses} handleClear={handleClear} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
      <h1>
        Total spending:{' '}
        <span className="total">
          <del>N</del>
          {expenses.reduce((total, curr) => {
            return (total += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
