import "./ExpenseForm.css";
import { useState } from "react";
const ExpenseForm = (props) => {
  // Using state hooks 3 times independently for each of the three variables -
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // OR

  // Using state hook only 1 time for a JS object containg all the 3 variables -
  //   const [enteredDetails, setEnteredDetails] = useState({
  //     expenseTitle: "",
  //     expenseAmount: "",
  //     expenseDate: "",
  //   });

  // IMPORTANT, event.target.value gives STRINGS even if the type for input fields is number, date, text etc.

  const titleChangeHandler = (event) => {
    // yaha maine title pe state hook daal rakha he kyoki agr component re-render bhi hota he kisi aur wajah se to bhi variable ki value loose/reset NI hogi.
    setEnteredTitle(event.target.value);

    // OR

    // Yaha maine spread operator ka use kiya he. Remember, pehle spread operator wala part likhna zaroori he, fir wo part jo overwrite kare.
    // setEnteredDetails({ ...enteredDetails, expenseTitle: event.target.value });

    // **** VERY IMPORTANT ****
    // But above is not the best way, as we found earlier that React "schedules" state updates, wo instantaenously ni karta, to ye make sure karne ke liye ki mujhe latest prev state mile mai state-change method ke andar ek function daldeta hu which takes in the previous (latest) state -

    // setEnteredDetails((prevState) => {
    //   return { ...prevState, expenseTitle: event.target.value };
    // });

    // NOTE - Previous state change pe dependent hone ki wajah se ye ek state hook wala method yaha use karne ki zaroorat ni he, instead we prefer having different state hooks for all the properties.
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    // OR
    // setEnteredDetails({ ...enteredDetails, expenseAmount: event.target.value });
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // OR
    // setEnteredDetails({ ...enteredDetails, expenseDate: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault(); // This will prevent the default behaviour of HTML form submission which is to cause a page reload, which we do NOT want.

    const expenseData = {
      expenseTitle: enteredTitle,
      expenseAmount: enteredAmount,
      expenseDate: new Date(enteredDate),
    };

    // console.log(expenseData);
    // Ye data to mil gaya now we have to pass this data to App.js (thourgh NewExpense.js) (parent component). Yani child to parent (bottom-up) data transfer karna he, we do this by introducing a function prop to parent (here, NewExpense.js). (parent to child data transfer is simply props)

    // SUPER IMPORATANT - CHILD TO PARENT DATA TRANSFER
    // This is called "Lifting the State Up".
    props.onSaveExpenseData(expenseData);
    // Ye function maine props me pass kiya tha
    // Data is being passed from child comp (ExpenseForm) to a function defined in parent comp (NewExpense).

    setEnteredDate(""); // clearing the input fields
    setEnteredTitle("");
    setEnteredAmount("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          {/* onChange event lister will detect ANY changes in the input field */}
          <input
            type="text"
            onChange={titleChangeHandler}
            value={enteredTitle}
            // Mai ye isliye daal raha hu taki form submit karne ke baad mai fields ko clear kar saku, using the state-change function. This is called 2 way binding.
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2001-04-06"
            max="3001-04-06"
            onChange={dateChangeHandler}
            value={enteredDate}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
        {/* yaha is button me ek event listner dal ke mai submit karwa sakta hu
            but I should use the default behaviour of HTML form instead, and that is to add a onSubmit event listner to the form tag. */}
      </div>
    </form>
  );
};

export default ExpenseForm;
