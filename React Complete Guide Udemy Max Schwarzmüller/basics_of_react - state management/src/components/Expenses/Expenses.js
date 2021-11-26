import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";

import "./Expenses.css";

const Expenses = ({ expenses }) => {

  const [expenseFilter, setExpenseFilter] = useState("2021");
  const onExpenseFilterSelectionHandler = (event) => {
    const enteredExpenseFilter = event.target.value;
    console.log(enteredExpenseFilter);
    setExpenseFilter(enteredExpenseFilter);
    // console.log(expenseFilter); -> Ye sahi output ni dega as React "schedules" changes rather than doing them instantaenously.
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selectedValue={expenseFilter} // for 2 way binding
          onExpenseFilterSelection={onExpenseFilterSelectionHandler}
        />
        {expenses.map(({ expenseDate, expenseTitle, expensePrice }) => {
          return (
            <ExpenseItem
              expenseDate={expenseDate}
              expenseTitle={expenseTitle}
              expensePrice={expensePrice}
            />
          );
        })}
      </Card>
    </div>
  );
};

export default Expenses;
