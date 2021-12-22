import { useState, useRef } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import "./AddUser.css";

const AddUser = ({ setUsers }) => {
  const [modalText, setModalText] = useState("");
  // Modal text ko ek normal variable ki tarah treat ni kar sakte kyoki jab react re-render karega to wo ye AddUser.js ko re-run karega jisse modalText (normal variable) ki value reset ho jaegi jaha par bhi usse declare kiya hoga, so uska state hook hi dalna padega.

  const [showModal, setShowModal] = useState(false);

  // Replacing state hooks by refs -
  // const [inputUserName, setInputUserName] = useState("");
  // const [inputAge, setInputAge] = useState("");
  const inputUserNameRef = useRef("");
  const inputAgeRef = useRef("");

  const onAddUser = (e) => {
    e.preventDefault();
    const username = inputUserNameRef.current.value;
    const age = inputAgeRef.current.value;
    if (username.trim().length === 0 || age.trim().length === 0) {
      setShowModal(true);
      setModalText("Empty fields detected.");
    } else if (Number(age) < 1) {
      setShowModal(true);
      setModalText("Invalid Age detected.");
    } else {
      setUsers((prevState) => [
        ...prevState,
        { username: username, age: age, id: Math.random() },
      ]);

      // Actually ye recommended ni hota but mujhe kyoki yaha pe ek exclusive re-render ni chahiye (wo re-render mujhe pehle se hi setUsers de raha he) to mai below wali cheez kar sakta hu.
      inputUserNameRef.current.value = "";
      inputAgeRef.current.value = "";
    }
  };
  return (
    <div>
      <form onSubmit={onAddUser}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            // Har key stroke pe state change karne ki zarorat ni he sirf jab mujhe data pass karna he tab mujhe username, age read karna he to maine state hook ki jagah refs ka use kiya.
            // value={inputUserName}
            // onChange={(e) => {
            //   setInputUserName(e.target.value);
            // }}
            // Note - Pehle jaise maine ye input fields rakhi thi state hooks ke sath tab ye input fields "Controlled Components" hoti lekin ab maine sirf ek ref dal diya he jisse mai primarily value read karne ke liye use karta hu to ye input fields ab "Uncontrolled Components" he. Mai value reset karne me zaroor write kar raha hu but that is just JS, React isn't actually involved there. Controlled, Uncontrolled generally comes up for input fields and forms.

            ref={inputUserNameRef}
          />
        </div>
        <div>
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            name="age"
            // value={inputAge}
            // onChange={(e) => {
            //   setInputAge(e.target.value);
            // }}
            ref={inputAgeRef}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
      {showModal && (
        <ErrorModal setShowModal={setShowModal} displayText={modalText} />
      )}
    </div>
  );
};

export default AddUser;
