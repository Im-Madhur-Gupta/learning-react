import { useState } from "react";
import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";

import "./Expenses.css";

const Expenses = ({ expenses }) => {
  const [expenseFilter, setExpenseFilter] = useState("2021");

  const onExpenseFilterSelectionHandler = (event) => {
    const enteredExpenseFilter = event.target.value;
    console.log(enteredExpenseFilter);
    setExpenseFilter(enteredExpenseFilter);
    // console.log(expenseFilter); -> Ye sahi output ni dega as React "schedules" changes rather than doing them instantaenously.
  };

  const filteredExpenses = expenses.filter(
    (expense) => expense.expenseDate.getFullYear().toString() === expenseFilter
  );
  // IMPORTANT - filteredExpenses ke liye koi aur hooks ki zaroorat ni he, because uski value jin pe depend kar rahi he ie "expenses" array and "expenseFilter" variable unpe state hooks pehle se lage hue he, to agr expenses ya expenseFilter ka state change hoga to react re-render/re-calculate karega un sab cheezo ko jaha par expenses array ya expenseFilter ka use hua tha, which includes filteredExpenses.

  // The Following expenseContent logic has been moved to ExpenseList -
  // let expenseContent = <p style={{ color: "white" }}>No expenses found.</p>;
  // if (filteredExpenses.length > 0) {
  //   expenseContent = filteredExpenses.map(
  //     ({ id, expenseDate, expenseTitle, expensePrice }) => {
  //       return (
  //         <ExpenseItem
  //           key={id}
  //           expenseDate={expenseDate}
  //           expenseTitle={expenseTitle}
  //           expensePrice={expensePrice}
  //         />
  //       );
  //     }
  //   );
  // }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selectedValue={expenseFilter} // for 2 way binding
          onExpenseFilterSelection={onExpenseFilterSelectionHandler}
        />
        {/* Component List jab bhi render karo to always add "key" property to the elements of the list aisa nahi karne par performance issues aur bugs bhi aa sakte he. This key ppt/prop se react uniquely identify karta he elements ko.
        Performance Issue - expenses array in App.js me new object array ke front me add ho raha he, lekin tab bhi jab react new addition to array pe re-render kar raha he to wo pehle to end me new element render kar raha he fir baki sare elements ke content ko update kar raha he taki order match kar jae.
        Bugs - Manlo ExpenseItem ek stateful component hota aur agr elements overwrite honge to unki jo previous state ke changes the wo loose ho jaenge aur state basically reset ho jaegi.
        
        In sab cheezo se bachne ke liye mai list elements ko key ppt/prop deta hu, its value should be unique per element of the list.
        index shoudnt be used for this purpose as its not attached to the data its rather attached to the position of the array.
        */}
        {/* {filteredExpenses.length === 0 ? (
          <p style={{ color: "white" }}>No expenses found.</p>
        ) : (
          filteredExpenses.map(
            ({ id, expenseDate, expenseTitle, expensePrice }) => {
              return (
                <ExpenseItem
                  key={id}
                  expenseDate={expenseDate}
                  expenseTitle={expenseTitle}
                  expensePrice={expensePrice}
                />
              );
            }
          )
        )} */}
        {/* OR 
        
        Instead of above we can use the && operator of JS and "abuse its notation" - 
        condition && what we want to return if that condition is met.*/}
        {/* {filteredExpenses.length === 0 && (
          <p style={{ color: "white" }}>No expenses found.</p>
        )}

        {filteredExpenses.length > 0 &&
          filteredExpenses.map(
            ({ id, expenseDate, expenseTitle, expensePrice }) => {
              return (
                <ExpenseItem
                  key={id}
                  expenseDate={expenseDate}
                  expenseTitle={expenseTitle}
                  expensePrice={expensePrice}
                />
              );
            }
          )} */}
        {/* OR */}
        {/* Simply take all the logic OUT from the JSX and take it to the function component's body. */}
        {/* {expenseContent} --> Moved to ExpensesList*/}
        <ExpensesList filteredExpenses={filteredExpenses}/>
      </Card>
    </div>
  );
};

export default Expenses;
