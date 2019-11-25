import React from 'react';
import {MdMoodBad} from "react-icons/md";

const ExpenseForm = () => {
    return (
        <form>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">Category</label>
                    <input type="text" className="form-control" id="charge" name="charge" placeholder="What Expense?" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="How Much?" 
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                submit
                <MdMoodBad className="btn-icon" />
            </button>

        </form>
    );
}

export default ExpenseForm