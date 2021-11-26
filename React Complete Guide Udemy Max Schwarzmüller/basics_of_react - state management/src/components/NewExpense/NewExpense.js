import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
const NewExpense = (props) => {
    const onSaveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        }

        // console.log(expenseData);
        // Ab data ko mai simply yaha log karke ni rakhna chahta, mai usko NewExpense ke parent App.js ko dena chahta hu using same technique which we used to pass data from ExpenseForm.js to NewExpense.js.

        props.onAddExpense(expenseData);
    }
    return(
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler}/>
        </div>
    )
};

export default NewExpense;
