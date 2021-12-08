import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
function App() {
  const [expenses, setExpenses] = useState([
    {
      expenseDate: new Date(),
      expensePrice: "200",
      expenseTitle: "Something",
    },
    {
      expenseDate: new Date(2020, 10, 10),
      expensePrice: "300",
      expenseTitle: "Something1",
    },
    {
      expenseDate: new Date(),
      expensePrice: "200",
      expenseTitle: "Something",
    },
    {
      expenseDate: new Date(2020, 10, 10),
      expensePrice: "300",
      expenseTitle: "Something1",
    },
  ]);

  const onAddExpenseHandler = ({
    expenseTitle,
    expenseAmount,
    expenseDate,
  }) => {
    // expenses.push(expenseData); // Bina state hook ke add karenge to React ko pata ni chalega ki "kuch values update ho gai he to re-render karna padega".

    // Ab mai simply expenses array me state hook laga ke uski value update karunga taki "Expenses" component re-render ho jae with the new value.
    // Lekin kyoki ye previous state pe depend kar raha he to mujhe state change function ke andar prevstate wala arrow function use karna padega taki react mujhe latest snapshot de "expenses" ka.
    setExpenses((prevState) => {
      return [
        {
          expenseDate: expenseDate,
          expensePrice: expenseAmount,
          expenseTitle: expenseTitle,
        },
        ...prevState,
      ];
    });
    // Choti problem upar ye hogai ki jo object ExpenseForm -> NewExpense -> App me aya he usme "expensePrice" ppt name ki jagah "expenseAmount" ppt name he. To wo mujhe thik karna pada.

    console.log("Data added succesfully.");
  };

  return (
    <div>
      {/* <h2>Let's get started!</h2> */}
      <NewExpense onAddExpense={onAddExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );

  // React.createElement() equivalent -
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Let's get started!"),
  //   React.createElement(Expenses, { expenses: expenses })
  // );
}

export default App;
