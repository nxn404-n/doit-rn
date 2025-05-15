import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const SignupOrLogin = ({
  buttonName,
  userData,
  setUserData,
  signUp,
  setShowTodo,
  setLoggedIn,
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

  const handleSubmit = async () => {
    // Login page
    if (!signUp) {
      try {
        const response = await axios.post(
          "https://doit-rn-backend.onrender.com/api/user/login",
          {
            username: userData.username,
            password: userData.password,
          },
          { withCredentials: true },
        );
        localStorage.setItem("loggedIn", response.data.loggedIn);
        setLoggedIn(response.data.loggedIn);
        setShowTodo(true);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        }
      }
    } else {
      // Signup page
      try {
        const response = await axios.post(
          "https://doit-rn-backend.onrender.com/api/user/signup",
          {
            username: userData.username,
            password: userData.password,
          },
          { withCredentials: true },
        );
        localStorage.setItem("loggedIn", response.data.loggedIn);
        setLoggedIn(response.data.loggedIn);
        setShowTodo(true);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        }
      }
    }
    // Display appropriate error messages
    if (userData.username === "" && userData.password !== "") {
      setErrorMessage("Please enter an username!");
    } else if (userData.username !== "" && userData.password === "") {
      setErrorMessage("Please enter a password!");
    } else if (userData.username === "" && userData.password === "") {
      setErrorMessage("Please enter an username and a password!");
    }
  };

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
  signUp: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default SignupOrLogin;
