import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./Todo";

const TodoList = () => {
  // This input stores the value of the input box
  const [input, setInput] = useState("");

  // state for storing todos
  const [todos, setTodos] = useState([]);

  // Add Todo
  function addTodo() {
    if (input !== "") {
      const newTodo = {
        id: nanoid(), //unique id for todos
        task: input.trim(), //trims any spaces
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
  setTodos(todos.map((todo) => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )));
};

  return (
    <div>
      <h2>To-Do</h2>

      {/* Todo input */}
      <div>
        <input
          type='text'
          className='border-2 border-black'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className='border-2 border-black bg-white'
          onClick={() => addTodo()}
        >
          Add todo
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <Todo data={todo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
