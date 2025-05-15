import { useState } from "react";
import PropTypes from "prop-types";
import SignupOrLogin from "./SignupOrLogin";

const Authentication = ({ signUp, setSignUp, setShowTodo, setLoggedIn }) => {
  // stores the userData
  const [userData, setUserData] = useState({ username: "", password: "" });

  // function for toggling between signup page and login page
  function handleSignup() {
    setSignUp((prevState) => !prevState);
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-3 bg-[#8A9C8C] pt-6">
      <h1 className="mb-3 text-xl tracking-wider">Welcome to DOIT-rn</h1>

      {/* Showes diff content according to the signUp state */}
      <div className="w-64">
        {signUp ? (
          <SignupOrLogin
            buttonName={"Sign Up"}
            userData={userData}
            setUserData={setUserData}
            signUp={signUp}
            setShowTodo={setShowTodo}
            setLoggedIn={setLoggedIn}
          />
        ) : (
          <SignupOrLogin
            buttonName={"Log in"}
            userData={userData}
            setUserData={setUserData}
            signUp={signUp}
            setShowTodo={setShowTodo}
            setLoggedIn={setLoggedIn}
          />
        )}
      </div>

      {/* Showes diff footer according to the state according to the signUp state */}
      {signUp ? (
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <button onClick={() => handleSignup()}>Log in</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <p>Create a new account?</p>
          <button onClick={() => handleSignup()}>Sign Up</button>
        </div>
      )}
    </div>
  );
};
Authentication.propTypes = {
  setLoggedIn: PropTypes.func,
  signUp: PropTypes.bool.isRequired,
  setSignUp: PropTypes.func.isRequired,
  setShowTodo: PropTypes.func.isRequired,
};

export default Authentication;
