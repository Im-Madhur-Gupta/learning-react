import { useState, useRef } from "react";
import styles from "./Checkout.module.css";

const Checkout = ({ onCancel, placeOrderHandler }) => {
  // below state is for error handling
  const [formInputsValidity, setFormInputsValidity] = useState({
    nameIsValid: true,
    streetIsValid: true,
    pinCodeIsValid: true,
    cityIsValid: true,
  });

  const isEmpty = (data) => data.trim() === "";
  const is6Chars = (data) => data.trim().length === 6;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pincodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    // Remember, ref_name.current stores the html element for which you have created the ref.
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPinCode = pincodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPinCodeIsValid = is6Chars(enteredPinCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      nameIsValid: enteredNameIsValid,
      streetIsValid: enteredStreetIsValid,
      pinCodeIsValid: enteredPinCodeIsValid,
      cityIsValid: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPinCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    // submit the cart data here.
    placeOrderHandler({
      name: enteredName,
      street: enteredStreet,
      pincode: enteredPinCode,
      city: enteredCity,
    });
  };
  return (
    <form onSubmit={confirmHandler}>
      <div
        className={`${styles.control} ${
          !formInputsValidity.nameIsValid && styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.nameIsValid && <p>Please Enter a valid name.</p>}
      </div>
      <div
        className={`${styles.control} ${
          !formInputsValidity.streetIsValid && styles.invalid
        }`}
      >
        <label htmlFor="street">Your Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.streetIsValid && (
          <p>Please Enter a valid street.</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          !formInputsValidity.pinCodeIsValid && styles.invalid
        }`}
      >
        <label htmlFor="pincode">Your Pincode</label>
        <input type="text" id="pincode" ref={pincodeInputRef} />
        {!formInputsValidity.pinCodeIsValid && (
          <p>Please Enter a valid pincode.</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          !formInputsValidity.cityIsValid && styles.invalid
        }`}
      >
        <label htmlFor="city">Your City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.cityIsValid && <p>Please Enter a valid city.</p>}
      </div>
      <div className={styles.actions}>
        <button type="submit">Place Order</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        {/* default type for a button is submit, to agr submit ni karwana to type="button" dena padega. */}
      </div>
    </form>
  );
};

export default Checkout;
