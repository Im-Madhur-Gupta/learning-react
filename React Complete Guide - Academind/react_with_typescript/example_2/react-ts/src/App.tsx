import TodoContextProvider from "./store/todos-context";
import ToDoList from "./components/ToDoList";
import NewToDo from "./components/NewToDo";

function App() {
  return (
    <div className="App">
      <TodoContextProvider>
        <NewToDo />
        <ToDoList />
      </TodoContextProvider>
    </div>
  );
}

export default App;
