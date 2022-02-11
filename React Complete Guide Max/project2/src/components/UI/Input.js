import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref} />
      {/* Ye {...props.input} karne se input object ke sare key value pairs pass ho jaenge as props for this input tag. Ex - if input={type:"text"} then is input ko type="text" ka prop mil jaega. */}
    </div>
  );
});

export default Input;
