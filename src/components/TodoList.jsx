import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import Todo from "./Todo";

const TodoList = ({ loggedIn }) => {
  // This input stores the value of the input box
  const [input, setInput] = useState("");

  // State for storing todos
  const [todos, setTodos] = useState(() => {
    // Lazy initialization to check if there are any todos in localStorage when the component first renders
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : []; // Checks if savedTodos exists in localStorage or not
    } catch (error) {
      console.error("Error parsing todos from localStorage", error);
      return [];
    }
  });

  // Save todos to localStorage every time todos changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  function addTodo() {
    if (input !== "") {
      const newTodo = {
        id: nanoid(), // Unique id for todos
        task: input.trim(), // Trims any spaces
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  }

  // Delete Todo
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Toggle completed
  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  return (
    <div className="pt-3 pr-3 w-full">
      {loggedIn && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">To-Do</h2>

          {/* Todo input */}
          <div className="flex gap-2">
            <input
              type="text"
              className="outline-none max-w-80 bg-[#719F9D] rounded-md px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="addTodo bg-[#719F9D] px-2 py-1 max-w-32" onClick={addTodo}>
              Add todo
            </button>
          </div>

          {/* Todo List */}
          <div className="flex flex-col max-w-96 gap-3">
            {todos.map((todo) => (
              <Todo
                data={todo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                key={todo.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
TodoList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default TodoList;
