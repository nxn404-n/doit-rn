import axios from "axios";
import PropTypes from "prop-types";

const AccountCenter = ({ setSignUp, loggedIn, showTodo, user, setUser, setLoggedIn }) => {
  const accName = user.username;

  // Handles the Logout button
  async function handleLogOut() {
    await axios.post(
      `https://doit-rn-backend.onrender.com/api/user/logout/${user.userId}`,
      { withCredentials: true },
    );
    setLoggedIn(false);
    setUser({});
    localStorage.setItem("loggedIn", "false");
    setSignUp(true);
  }

  // Handles the Delete account button
  async function handleDeleteAcc() {
    await axios.delete(
      `https://doit-rn-backend.onrender.com/api/user/${user.userId}`,
      { withCredentials: true },
    );
    setLoggedIn(false);
    setUser({});
    localStorage.setItem("loggedIn", "false");
    setSignUp(true);
  }

  return (
    <>
      {loggedIn && !showTodo && (
        <div className="flex flex-col gap-3 pt-3">
          <h2 className="border-b-2 border-black px-4 text-xl">
            Account Center
          </h2>

          <div className="flex flex-col gap-1 text-lg">
            <p>Username: {accName}</p>
            <p
              onClick={handleDeleteAcc}
              className="cursor-pointer text-red-600 hover:scale-105"
            >
              Delete account
            </p>
            <p
              onClick={handleLogOut}
              className="cursor-pointer hover:scale-105"
            >
              Log out
            </p>
          </div>
        </div>
      )}
    </>
  );
};

AccountCenter.propTypes = {
  setSignUp: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  showTodo: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default AccountCenter;
