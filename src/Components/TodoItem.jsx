import React, { useState } from "react";
import { useToDo } from "../contexts";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMessage, setTodoMessage] = useState(todo.todo);
  const { updateToDo, deleteToDo, toggleComplete } = useToDo();

  const editTodo = () => {
    updateToDo(todo.id, {
      ...todo,
      todo: todoMessage,
      updatedAt: new Date().toISOString()
    });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={toggleCompleted} />
      <input
        type="text"
        value={todoMessage}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMessage(e.target.value)}
        className={todo.completed ? "completed" : ""}
      />
      <div className="todo-buttons">
        <button
          onClick={() => {
            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable(true);
            }
          }}
        >
          {isTodoEditable ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              deleteToDo(todo.id);
            }
          }}
        >
          Delete
        </button>
        {isTodoEditable && (
          <button onClick={() => setIsTodoEditable(false)}>Cancel</button>
        )}
      </div>
      <div className="date-label">
        Created: {new Date(todo.createdAt).toLocaleString()}
        {todo.updatedAt && (
          <>
            <br />
            Updated: {new Date(todo.updatedAt).toLocaleString()}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;