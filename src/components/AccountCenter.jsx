import PropTypes from "prop-types";

const AccountCenter = ({ setLoggedIn, setSignUp, loggedIn, showTodo }) => {
  const accName = JSON.parse(localStorage.getItem("savedUserData")).username;

  // Handles the Logout button
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    setSignUp(false);
  }

  // Handles the Delete account button
  function handleDeleteAcc() {
    setLoggedIn(false);
    localStorage.setItem(
      "savedUserData",
      JSON.stringify({ username: "", password: "" }),
    );
    localStorage.setItem("todos", JSON.stringify([]));
  }

  return (
    <>
      {loggedIn && !showTodo && (
        <div className="pt-3 flex flex-col gap-3">
          <h2 className="text-xl">Account Center</h2>

          <div className="text-lg flex flex-col gap-1">
            <p>Username: {accName}</p>
            <p onClick={handleDeleteAcc} className="text-red-600">Delete account</p>
            <p onClick={handleLogOut}>Log out</p>
          </div>
        </div>
      )}
    </>
  );
};

AccountCenter.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
  setSignUp: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  showTodo: PropTypes.bool.isRequired,
};

export default AccountCenter;
