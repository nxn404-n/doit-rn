import PropTypes from "prop-types";

const AccountCenter = ({ setLoggedIn, setSignUp, loggedIn, showTodo }) => {
  const accName = JSON.parse(localStorage.getItem("savedUserData")).username;

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    setSignUp(false);
  }

  function handleDeleteAcc() {
    setLoggedIn(false);
    localStorage.setItem("savedUserData", JSON.stringify({ username: "", password: "" }));
    localStorage.setItem("todos", JSON.stringify([]));
  }

  return (
    <>
      {loggedIn && !showTodo && (
        <div>
          <h2>Account Center</h2>

          <div>
            <p>Username: {accName}</p>
            <p onClick={handleDeleteAcc}>Delete account</p>
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
