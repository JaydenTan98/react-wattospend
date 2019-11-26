import React from 'react';
import {MdMoodBad} from "react-icons/md";

const ExpenseForm = ({charge,amount,handleCharge,handleAmount,handleSubmit,edit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">Category</label>
                    <input type="text" className="form-control" id="charge" name="charge" placeholder="What Expense?" 
                        value={charge} onChange={handleCharge} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" placeholder="How Much?" 
                        value={amount} onChange={handleAmount}
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                {edit ? "Edit":"Submit"}
                <MdMoodBad className="btn-icon" />
            </button>

        </form>
    );
}

export default ExpenseForm