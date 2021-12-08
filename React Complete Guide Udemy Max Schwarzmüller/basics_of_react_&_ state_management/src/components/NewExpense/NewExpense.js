import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";
const NewExpense = (props) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const onSaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    // console.log(expenseData);
    // Ab data ko mai simply yaha log karke ni rakhna chahta, mai usko NewExpense ke parent App.js ko dena chahta hu using same technique which we used to pass data from ExpenseForm.js to NewExpense.js.

    props.onAddExpense(expenseData);
  };
  return (
    <div className="new-expense">
      {showExpenseForm ? (
        <ExpenseForm
          onSaveExpenseData={onSaveExpenseDataHandler}
          setShowExpenseForm={setShowExpenseForm}
        />
      ) : (
        <button
          onClick={() => {
            // onClick ko direct function call ni dete, sirf jo bhi function execute karna he uska name/pointer/definition dete he.
            setShowExpenseForm(true);
          }}
        >
          Add New Expense
        </button>
      )}
    </div>
  );
};

export default NewExpense;
