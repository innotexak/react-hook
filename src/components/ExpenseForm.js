import React from 'react';
import { MdSend } from 'react-icons/md';
const ExpenseForm = ({ charge, amount, handleCharge, handleAmount, handleSubmit, edit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group ">
          <label htmlFor="charge">Charge</label>
          <input className="form-control" type="text" onChange={handleCharge} value={charge} name="charge" id="charge" placeholder="e.g rent " />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input className="form-control" onChange={handleAmount} value={amount} type="number" id="amount" name="amount" placeholder="e.g. 100" />
        </div>
      </div>
      <button className="btn">
        {edit ? 'edit' : 'submit'}
        <MdSend />
      </button>
    </form>
  );
};

export default ExpenseForm;
