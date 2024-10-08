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
          <h2 className="text-xl border-b-2 border-black px-4">Account Center</h2>

          <div className="text-lg flex flex-col gap-1">
            <p>Username: {accName}</p>
            <p onClick={handleDeleteAcc} className="text-red-600  hover:scale-105">Delete account</p>
            <p onClick={handleLogOut} className="hover:scale-105">Log out</p>
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
