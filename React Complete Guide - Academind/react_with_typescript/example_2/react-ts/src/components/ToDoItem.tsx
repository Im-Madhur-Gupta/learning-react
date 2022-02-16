import { useContext } from "react";
import { TodoContext } from "../store/todos-context";

const ToDoItem: React.FC<{
  todoText: string;
}> = ({ todoText }) => {
  const { removeTodo: onRemoveTodo } = useContext(TodoContext);
  const onRemoveTodoHandler = () => {
    onRemoveTodo(todoText);
  };
  return (
    <div>
      <li>{todoText}</li>
      <button type="button" onClick={onRemoveTodoHandler}>
        Remove
      </button>
    </div>
  );
};

export default ToDoItem;
