// This file will be used to create a data model (basically a class)
// Data Model banane ke liye "type" keyword bhi use kar sakte he.
// Not to write some JSX / React Component.
// Hence, extension is ts and not tsx.

// Way of writing a class with attributes in TS is slightly diff. from vanilla JS

class ToDo {
  todoText: string;

  constructor(todoText: string) {
    this.todoText = todoText;
  }
}

export default ToDo;
