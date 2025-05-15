import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";
import axios from "axios";
import { toast } from "react-toastify";

const TodoList = ({ loggedIn, userData }) => {
  // This input stores the value of the input box
  const [input, setInput] = useState("");

  // State for storing todos
  const [todos, setTodos] = useState([]);

  // State for loading toast
  const [loadingToast, setLoadingToast] = useState(null);

  // Fetch todos
  async function fetchTodos() {
    // If the loading toast is not already displayed, display it
    if (!loadingToast) {
      setLoadingToast(
        toast.loading("Updating Todo List...", {
          isLoading: false,
          autoClose: 2000,
        }),
      );
    }
    try {
      const response = await axios.get(
        `https://doit-rn-backend.onrender.com/api/todo/${userData.userId}`,
      );

      // Map the todos to a new array
      const todoArray = response.data.todos.map((todo) => {
        return {
          id: todo._id,
          task: todo.task,
          completed: todo.completed,
        };
      });
      setTodos(todoArray);
      // Update the loading toast
      toast.update(loadingToast, {
        render: "Todo loaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Remove the loading toast after a certain time
      setLoadingToast(null);
    } catch {
      // If the fetching fails, update the loading toast after a certain time
      setTimeout(() => {
        toast.update(loadingToast, {
          render: "Failed to fetch todos",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }, 3000);

      // Remove the loading toast after a certain time
      setLoadingToast(null);
    }
  }

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, [userData]);

  // Add Todo
  async function addTodo() {
    if (input !== "") {
      try {
        const trimmedInput = input.trim();
        setInput("");
        await axios.post(
          `https://doit-rn-backend.onrender.com/api/todo/${userData.userId}`,
          { task: trimmedInput },
        );
        fetchTodos();
      } catch {
        toast.update(loadingToast, {
          render: "Failed to add todo",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  }

  // Delete Todo
  async function deleteTodo(id) {
    await axios.delete(`https://doit-rn-backend.onrender.com/api/todo/${id}`);
    fetchTodos();
    toast.success("Todo deleted successfully!", {
      isLoading: false,
      autoClose: 2000,
    });
  }

  // Toggle completed
  async function toggleComplete(id, completed) {
    try {
      await axios.put(`https://doit-rn-backend.onrender.com/api/todo/${id}`, {
        completed: !completed,
      });
      fetchTodos();
    } catch(err) {
      toast.error("Something went wrong", {
        isLoading: false,
        autoClose: 2000,
      });
      console.log(err.response.data.error, todos)
    }
    
  }

  return (
    <>
      {loggedIn && (
        <div className="flex w-full flex-col gap-2 pr-3 pt-3">
          <h2 className="text-xl font-semibold">To-Do</h2>

          {/* Todo input */}
          <div className="flex gap-2">
            <input
              type="text"
              className="max-w-80 rounded-md bg-[#719F9D] px-2 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="addTodo max-w-32 bg-[#719F9D] px-2 py-1 sm:text-lg"
              onClick={addTodo}
            >
              Add todo
            </button>
          </div>

          {/* Todo List */}
          <div className="flex max-w-96 flex-col gap-3">
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
    </>
  );
};

TodoList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

export default TodoList;
