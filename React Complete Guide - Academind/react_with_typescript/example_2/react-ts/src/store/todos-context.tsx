import React from "react";
import { useState } from "react";
import ToDo from "../models/todo";

// Just like useState, useRef, createContext is also generic, so, I have to give it a concrete type acc. to my state object.
export const TodoContext = React.createContext<{
  items: ToDo[];
  addTodo: (todoText: string) => void;
  removeTodo: (todoText: string) => void;
}>({
  items: [],
  addTodo: (todoText: string) => {},
  removeTodo: (todoText: string) => {},
});

const TodoContextProvider: React.FC = (props) => {
  const intitialTodoArr = [
    new ToDo("Learn TypeScript"),
    new ToDo("Learn NodeJS"),
  ];
  const [todoArr, setTodoArr] = useState<ToDo[]>(intitialTodoArr);
  const addTodoHandler = (todoText: string): void => {
    const todoObj = new ToDo(todoText);
    setTodoArr((prevState) => [todoObj, ...prevState]);
  };
  const removeTodoHandler = (todoText: string): void => {
    setTodoArr((prevState) => {
      const newTodoArr = prevState.filter((todo) => todo.todoText !== todoText);
      return newTodoArr;
    });
  };
  return (
    <TodoContext.Provider
      // value is all the contents of the app-wide state that I want to use.
      value={{
        items: todoArr,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
