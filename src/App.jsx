import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import Login from "./Components/Login";
import { ToDoProvider } from "./contexts";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);  
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const addToDo = (todo) => setTodos((prev) => [{ ...todo }, ...prev]);
  const updateToDo = (id, todo) => setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
  const deleteToDo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));
  const toggleComplete = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );


  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("todos"));
      if (saved && Array.isArray(saved)) {
        setTodos(saved);
      }
    } catch (e) {
      console.error("Failed to load todos:", e);
    }
    setIsLoaded(true); 
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === "all" ? true : filter === "completed" ? todo.completed : !todo.completed)
  );

  if (!username) {
    return <Login setUsername={setUsername} />;
  }

  return (
    <ToDoProvider
      value={{
        todos,
        addToDo,
        updateToDo,
        deleteToDo,
        toggleComplete,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
      }}
    >
      <div className="container">
        <h2>Welcome, {username}!</h2>
        <button
          onClick={() => {
            localStorage.removeItem("username");
            setUsername("");
          }}
          style={{
            marginBottom: "10px",
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            background: "rgba(255, 255, 255, 0.25)",
            color: "#2e3a59",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
        <TodoForm />
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={filter === "incomplete" ? "active-filter" : ""}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>
        </div>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </ToDoProvider>
  );
}

export default App;