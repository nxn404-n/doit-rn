import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import bcrypt from "bcryptjs";

const SignupOrLogin = ({
  buttonName,
  userData,
  setUserData,
  setLoggedIn,
  signUp,
  setShowTodo,
}) => {
  // Stores the data if the user wants to see the password or not
  const [showPassword, setShowPassword] = useState(false);
  // Stores the error messege
  const [errorMessage, setErrorMessage] = useState("");

  // Handles the input changes and updates the userData state
  function handleInput(e) {
    const { name, value } = e.target; // Takes the name and value from the input
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit() {
    const savedUserData = JSON.parse(localStorage.getItem("savedUserData"));

    // If on the login page
    if (!signUp) {
      // Check if there is saved user data and if it matches the input
      if (savedUserData) {
        // Compare the hashed password using bcrypt
        bcrypt.compare(
          userData.password,
          savedUserData.password,
          (err, isMatch) => {
            if (err) {
              setErrorMessage("An error occurred while verifying password");
            } else if (
              isMatch &&
              userData.username === savedUserData.username
            ) {
              setLoggedIn(true);
              localStorage.setItem("loggedIn", JSON.stringify(true));
              setShowTodo(true);
            } else {
              setErrorMessage("Username or password is incorrect!");
            }
          },
        );
      } else {
        setErrorMessage("No account found. Please sign up first.");
      }
    } else {
      // If on the signup page, proceed with saving new user data
      if (userData.username !== "" && userData.password !== "") {
        // Hash the password using bcrypt before saving it
        bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
          if (err) {
            setErrorMessage("Error occurred while hashing the password.");
            return;
          }

          const newUserData = {
            username: userData.username,
            password: hashedPassword, // Save the hashed password
          };

          setLoggedIn(true);
          localStorage.setItem("loggedIn", JSON.stringify(true));
          localStorage.setItem("savedUserData", JSON.stringify(newUserData)); // Save the new user data with hashed password
          setShowTodo(true);
        });
      }

      // Display appropriate error messages
      if (userData.username === "" && userData.password !== "") {
        setErrorMessage("Please enter an username!");
      } else if (userData.username !== "" && userData.password === "") {
        setErrorMessage("Please enter a password!");
      } else if (userData.username === "" && userData.password === "") {
        setErrorMessage("Please enter an username and a password!");
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <label className="flex flex-col">
          <p className="inputLabel">Username</p>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInput}
            className="inputBox"
          />
        </label>

        <label className="flex flex-col">
          <p className="inputLabel">Password</p>
          <div className="flex items-center justify-between bg-white">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleInput}
              className="inputBox"
            />
            {/* Toggles the showPassword state */}
            <div
              onClick={() => setShowPassword((prevState) => !prevState)}
              data-testid="toggle-password"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
        </label>
        <p className="shake text-red-500" key={errorMessage}>
          {/* Added key={errorMessage} so that everytime error messege changes react will treat it as a new element and show the shake animation */}
          {errorMessage}
        </p>
      </div>

      <div
        className="loginOrsignupBtn cursor-pointer bg-black p-2 text-center text-lg font-semibold text-white"
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
  setLoggedIn: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
};

export default SignupOrLogin;
