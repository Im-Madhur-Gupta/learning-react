import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select
          defaultValue={props.selectedValue}
          onChange={props.onExpenseFilterSelection}
          // Actually If we see, the selectedValue and onExpenseFilterSelection() arent a part of ExpenseFilter component they come from Expenses comp(parent), so, the Expenses Component is controlling the ExpensesFilter component, hence, we call the ExpenseFilter component as a "Controlled Component". Jaha par bhi 2 way binding hoti he waha controlled components bante he, these controlled component could be custom React components or default HTML tags / components.
          // Controlled Component - Aisa component jisme value aur uspar hone wale changes are not handled by the component itself, rather they are handled by its parent component.
          // Controlled comp ka ulta is Uncontrolled comp.
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
