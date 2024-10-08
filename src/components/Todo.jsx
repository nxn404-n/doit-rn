import PropTypes from "prop-types";

const Todo = ({ data, deleteTodo, toggleComplete }) => {
  return (
    <div className="black flex max-w-full items-center justify-between gap-2 rounded-md bg-[#8A9C8C] px-2 py-1">
      <input
        type="checkbox"
        checked={data.completed}
        onChange={() => toggleComplete(data.id)}
        className="scale-150"
      />
      <p
        className={`${data.completed ? "line-through" : ""} flex-grow break-all text-lg`}
      >
        {data.task}
      </p>
      <button
        onClick={() => deleteTodo(data.id)}
        className="deleteBtn h-8 bg-[#9C6F6A] px-2 text-white"
      >
        Delete
      </button>
    </div>
  );
};

Todo.propTypes = {
  data: PropTypes.shape({
    task: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default Todo;
