import { useState } from "react";
import PropTypes from "prop-types";
import SignupOrLogin from "./SignupOrLogin";

const Authentication = ({
  loggedIn,
  setLoggedIn,
  signUp,
  setSignUp,
  setShowTodo,
}) => {
  // stores the userData
  const [userData, setUserData] = useState({ username: "", password: "" });

  // function for toggling between signup page and login page
  function handleSignup() {
    setSignUp((prevState) => !prevState);
  }

  return (
    <div className='border-2 border-black'>
      <h1>Welcome to DOIT-rn</h1>

      {/* Showes diff content according to the signUp state */}
      {signUp ? (
        <SignupOrLogin
          buttonName={"Sign Up"}
          userData={userData}
          setUserData={setUserData}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          signUp={signUp}
          setShowTodo={setShowTodo}
        />
      ) : (
        <SignupOrLogin
          buttonName={"Log in"}
          userData={userData}
          setUserData={setUserData}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          signUp={signUp}
          setShowTodo={setShowTodo}
        />
      )}

      {/* Showes diff footer according to the state according to the signUp state */}
      {signUp ? (
        <div className='flex gap-2'>
          <p>Already have an account?</p>
          <button onClick={() => handleSignup()}>Log in</button>
        </div>
      ) : (
        <div className='flex gap-2'>
          <p>Create a new account?</p>
          <button onClick={() => handleSignup()}>Sign Up</button>
        </div>
      )}
    </div>
  );
};
Authentication.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
  setSignUp: PropTypes.func.isRequired,
  setShowTodo: PropTypes.func.isRequired,
};

export default Authentication;
