import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const SignupOrLogin = ({
  buttonName,
  userData,
  setUserData,
  loggedIn,
  setLoggedIn,
  signUp,
  setShowTodo,
}) => {
  // Stores the data if the user want to see the password or not
  const [showPassword, setShowPassword] = useState(false);
  // Stores the messege data if input fields are empty
  const [errorMessege, setErrorMessege] = useState("");

  // Handles the input changes and updates the useData state
  function handleInput(e) {
    const { name, value } = e.target; //Takes the name and value from the input
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit() {
    const savedUserData = JSON.parse(localStorage.getItem("savedUserData"));

    if (!signUp) {
      // If on the login page
      // Check if there is saved user data and if it matches the input
      if (
        savedUserData &&
        userData.username === savedUserData.username &&
        userData.password === savedUserData.password
      ) {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
        setShowTodo(true);
      } else {
        // Handle login failure case
        setErrorMessege("Username or password is incorrect!");
      }
    } else {
      // If on the signup page, proceed with saving new user data
      if (userData.username !== "" && userData.password !== "") {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
        setShowTodo(true);

        // Save the new user data in localStorage
        localStorage.setItem("savedUserData", JSON.stringify(userData));
      }

      // Display appropriate error messages
      if (userData.username === "" && userData.password !== "") {
        setErrorMessege("Please enter a username!");
      } else if (userData.username !== "" && userData.password === "") {
        setErrorMessege("Please enter a password!");
      } else if (userData.username === "" && userData.password === "") {
        setErrorMessege("Please enter a username and a password!");
      }
    }
  }

  return (
    <div>
      <div>
        <label className='flex flex-col'>
          Username
          <input
            type='text'
            name='username'
            value={userData.username}
            onChange={handleInput}
          />
        </label>

        <label className='flex flex-col'>
          Password
          <div className='flex items-center justify-between'>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={userData.password}
              onChange={handleInput}
            />
            {/* Toggles the showPassword state */}
            <div onClick={() => setShowPassword((prevState) => !prevState)}>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
        </label>
        <p className='text-red-500'>{errorMessege}</p>
      </div>

      <div
        className='border-2 border-black p-2 text-center'
        onClick={handleSubmit}
      >
        <button>{buttonName}</button>
      </div>
    </div>
  );
};
SignupOrLogin.propTypes = {
  setShowTodo: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  setUserData: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
};

export default SignupOrLogin;
