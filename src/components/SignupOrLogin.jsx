import PropTypes from "prop-types";

const SignupOrLogin = ({ buttonName, userData, setUserData, setLoggedIn }) => {
  // Handles the input changes and updates the useData state
  function handleInput(e) {
    const { name, value } = e.target; //Takes the name and value from the input
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit() {
    localStorage.setItem("userData", JSON.stringify(userData))
    setLoggedIn(true);
    localStorage.setItem("loggedIn", JSON.stringify(true))
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
          {/* Only using onChange={handleInput} instead of onChange={(e) => handleInput(e)} because react automatically provides the even object like (e) and react internally calls handleInput(e) */}
        </label>

        <label className='flex flex-col'>
          Password
          <input
            type='text'
            name='password'
            value={userData.password}
            onChange={handleInput}
          />
        </label>
      </div>

      <div className='border-2 border-black p-2 text-center'>
        <button onClick={handleSubmit}>{buttonName}</button>
      </div>
    </div>
  );
};
SignupOrLogin.propTypes = {
  buttonName: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  setUserData: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default SignupOrLogin;
