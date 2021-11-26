import { useState } from "react"; // Importing the function (state hook) from react library.
// Sare hooks start with "use" prefix

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  // const { expenseDate, expensePrice } = props;
  const {expenseTitle, expenseDate, expensePrice } = props;

  // The hooks MUST be called inside some COMPONENT FUNCTION.
  
  // Following me maine array destructing ka use kiya he, jisme order of elements matter karta he.
  // [the variable, a state updating function corresponding to the variable]
  // ye state updating function, variable ki value to change karega hi uske sath sath sirf JIS component instance me define kiya he (here, ExpenseItem) will be re-rendered by React.
  // yaha const isliye use kiya kyoki mai "expenseTitle" variable ki value directly (= se) change ni karunga (although I can do that).
  // react apnse paas likhke rakhta he ki kis component me state hook laga hua he, to jab ye state hook pehli baar execute hoga to variable ko defualt value di jaiyegi aur subsequent re-renders me jo managed value he (jo maine di usko setExpenseTitle use karke) di jaiyegi.
  // const [expenseTitle, setExpenseTitle] = useState(props.expenseTitle);

  // Event Listner wale functions me "Handler" suffix likhte he.
  // const changeTitleHandler = () => {
  //   // expenseTitle = "Updated"; // Simple aise value change karne me React re-render ni karega, to DOM pe value update ni hogi.
  //   setExpenseTitle("Updated");

  //   // Upar maine expenseTitle ki value update karna "schedule" kar diya he, it won't be instantly available.
  //   // Isliye abhi agar print kara to purani value hi mili.
  //   console.log(expenseTitle);
  // };

  return (
    <Card className="expense-item">
      <ExpenseDate expenseDate={expenseDate} />
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <p className="expense-item__price">${expensePrice}</p>
      </div>
      {/* Adding event listener to the below button */}
      {/* <button
        // IMPORTANT - The function shoudn't be called, it should just be pointed to the function. Agr call daldunga to jaise hi JSX execute ho rahi hogi tabhi function execute ho jaega naki click hone par.
        onClick={changeTitleHandler}
      >
        Change Title
      </button> */}
    </Card>
  );
};

export default ExpenseItem;
