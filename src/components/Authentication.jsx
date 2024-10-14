import { useState } from "react";
import PropTypes from "prop-types";
import SignupOrLogin from "./SignupOrLogin";

const Authentication = ({ setLoggedIn, signUp, setSignUp, setShowTodo }) => {
  // stores the userData
  const [userData, setUserData] = useState({ username: "", password: "" });

  // function for toggling between signup page and login page
  function handleSignup() {
    setSignUp((prevState) => !prevState);
  }

  return (
    <div className="pt-6 flex w-full h-full flex-col items-center gap-3 bg-[#8A9C8C]">
      <h1 className="mb-3 text-xl tracking-wider">Welcome to DOIT-rn</h1>

      {/* Showes diff content according to the signUp state */}
      <div className="w-64">
        {signUp ? (
          <SignupOrLogin
            buttonName={"Sign Up"}
            userData={userData}
            setUserData={setUserData}
            setLoggedIn={setLoggedIn}
            signUp={signUp}
            setShowTodo={setShowTodo}
          />
        ) : (
          <SignupOrLogin
            buttonName={"Log in"}
            userData={userData}
            setUserData={setUserData}
            setLoggedIn={setLoggedIn}
            signUp={signUp}
            setShowTodo={setShowTodo}
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
  setLoggedIn: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
  setSignUp: PropTypes.func.isRequired,
  setShowTodo: PropTypes.func.isRequired,
};

export default Authentication;
