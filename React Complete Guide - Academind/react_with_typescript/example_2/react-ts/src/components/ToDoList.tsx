import { useContext } from "react";
import { TodoContext } from "../store/todos-context";
import ToDoItem from "./ToDoItem";

const ToDoList: React.FC = () => {
  const { items } = useContext(TodoContext);
  return (
    <ul>
      {items.map((item) => (
        <ToDoItem key={item.todoText} todoText={item.todoText} />
      ))}
    </ul>
  );
};

export default ToDoList;
