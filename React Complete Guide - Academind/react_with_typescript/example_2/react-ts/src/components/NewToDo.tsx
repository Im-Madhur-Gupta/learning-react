import React, { useContext, useRef } from "react";
import { TodoContext } from "../store/todos-context";

const NewToDo: React.FC = () => {
  const { addTodo: onAddTodo } = useContext(TodoContext);
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredInput: string = todoTextInputRef.current!.value;
    if (enteredInput.trim().length === 0) return;
    onAddTodo(enteredInput.trim());
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <h2>Enter a Todo</h2>
      <label htmlFor="todoText">ToDo Text</label>
      <input type="text" name="todoText" id="todoText" ref={todoTextInputRef} />
      <button type="submit">Add a Todo</button>
    </form>
  );
};

export default NewToDo;
