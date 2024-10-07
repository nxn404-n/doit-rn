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
    <>
      {loggedIn && (
        <div>
          <h2>To-Do</h2>

          {/* Todo input */}
          <div>
            <input
              type="text"
              className="border-2 border-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="border-2 border-black bg-white"
              onClick={addTodo}
            >
              Add todo
            </button>
          </div>

          {/* Todo List */}
          <div>
            {todos.map((todo) => (
              <div key={todo.id}>
                <Todo
                  data={todo}
                  deleteTodo={deleteTodo}
                  toggleComplete={toggleComplete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
TodoList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default TodoList;
