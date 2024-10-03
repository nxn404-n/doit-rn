import { useState } from "react";
import SignupOrLogin from "./SignupOrLogin";

const Authentication = () => {
  // If its true thn shows the signup form instead
  const [signUp, setSignUp] = useState(false);

  const [loggedIn, setLoggedIn] = useState(() => {
    // Lazy intialization in useState to check if there are any userData in localStorage when the component first reneders
    try {
      const savedLoginData = localStorage.getItem("loggedIn");
      return savedLoginData
        ? JSON.parse(savedLoginData)
        : false;
    } catch (error) {
      console.error("Error parsing userData from localStorage", error);
      return false;
    }
  });

  const [userData, setUserData] = useState(() => {
    // Lazy intialization in useState to check if there are any userData in localStorage when the component first reneders
    try {
      const savedUserData = localStorage.getItem("userData");
      return savedUserData
        ? JSON.parse(savedUserData)
        : { username: "", password: "" };
    } catch (error) {
      console.error("Error parsing userData from localStorage", error);
      return { username: "", password: "" };
    }
  });

  // function for toggling between signup page and login page
  function handleSignup() {
    setSignUp((prevState) => !prevState);
  }

  return (
    <>
      {loggedIn ? null : (
        <div className='border-2 border-black'>
          <h1>Welcome to DOIT-rn</h1>

          {/* Showes diff content according to the state */}
          {signUp ? (
            <SignupOrLogin
              buttonName={"Log in"}
              userData={userData}
              setUserData={setUserData}
              setLoggedIn={setLoggedIn}
            />
          ) : (
            <SignupOrLogin
              buttonName={"Sign Up"}
              userData={userData}
              setUserData={setUserData}
              setLoggedIn={setLoggedIn}
            />
          )}

          {/* Showes diff footer according to the state */}
          {signUp ? (
            <div className='flex gap-2'>
              <p>Back to Sign up page?</p>
              <button onClick={() => handleSignup()}>Sign Up</button>
            </div>
          ) : (
            <div className='flex gap-2'>
              <p>Already have an account?</p>
              <button onClick={() => handleSignup()}>Log in</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Authentication;
