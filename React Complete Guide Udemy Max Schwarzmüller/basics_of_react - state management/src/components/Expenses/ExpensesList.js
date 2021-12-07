import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ filteredExpenses }) => {
  let expenseContent = (
    <h2 className="expenses-list__fallback">No expenses found.</h2>
  );
  if (filteredExpenses.length > 0) {
    expenseContent = filteredExpenses.map(
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
    );
  }
  return;
  <ul>{expenseContent}</ul>;
};

export default ExpensesList;
