import { useState } from "react";
import SignupOrLogin from "./SignupOrLogin";

const Authentication = () => {
  // If its true thn shows the signup form instead
  const [signUp, setSignUp] = useState(false);

  function handleSignup() {
    setSignUp((prevState) => !prevState);
  }

  return (
    <div className='border-2 border-black'>
      <h1>Welcome to DOIT-rn</h1>

    {/* Showes diff content according to the state */}
      {signUp ? (
        <SignupOrLogin buttonName={"Sign Up"} />
      ) : (
        <SignupOrLogin buttonName={"Log in"} />
      )}

    {/* Showes diff footer according to the state */}
      {signUp ? (
        <div className='flex gap-2'>
          <p>Back to Login page?</p>
          <button onClick={() => handleSignup()}>Log In</button>
        </div>
      ) : (
        <div className='flex gap-2'>
          <p>Already have an account?</p>
          <button onClick={() => handleSignup()}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
