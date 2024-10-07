import { LuListTodo } from "react-icons/lu";
import { RiAccountBoxFill } from "react-icons/ri";
import PropTypes from "prop-types";

const Sidebar = ({ setShowTodo, setShowAccCenter }) => {
  // Handles the todo button
  function handleTodoBtn() {
    setShowTodo(true);
    setShowAccCenter(false);
  }

  // Handles the Account button
  function handleAccBtn() {
    setShowTodo(false);
    setShowAccCenter(true);
  }

  return (
    <div className="flex flex-col gap-16 pt-3 border-r-2 border-black px-2">
      <div className="sideBar-btn" onClick={handleTodoBtn}>
        <LuListTodo className="sideBar-btn-icon" />
        <p className="sideBarIconText">Todo-List</p>
      </div>
      <div className="sideBar-btn" onClick={handleAccBtn}>
        <RiAccountBoxFill className="sideBar-btn-icon" />
        <p className="sideBarIconText">Account</p>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  setShowTodo: PropTypes.func.isRequired,
  setShowAccCenter: PropTypes.func.isRequired,
};

export default Sidebar;
