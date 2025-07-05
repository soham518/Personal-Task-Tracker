import { useState } from "react";
import { useToDo } from "../contexts";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addToDo, searchTerm, setSearchTerm } = useToDo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    addToDo({
      id: Date.now(),
      todo,
      completed: false,
      createdAt: new Date().toISOString()
    });
    setTodo("");
  };
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Task"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <form onSubmit={add}>
        <input
          type="text"
          placeholder="Enter task name"
          required
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default TodoForm;