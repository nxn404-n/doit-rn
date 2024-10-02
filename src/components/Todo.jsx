import PropTypes from "prop-types";

const Todo = ({ data, deleteTodo, toggleComplete }) => {
  return (
    <div className="flex gap-3">
      <input type="checkbox" checked={data.completed} onChange={() => {toggleComplete(data.id)}} />
      <p className={`${data.completed ? 'line-through' : ''}`}>{data.task}</p>
      <button onClick={() => deleteTodo(data.id)}>delete</button>
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
