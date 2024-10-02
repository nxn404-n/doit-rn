import PropTypes from "prop-types";

const SignupOrLogin = ({ buttonName }) => {
  return (
    <div>
      <div>
        <label className='flex flex-col'>
          Full Name
          <input type='text' />
        </label>

        <label className='flex flex-col'>
          Password
          <input type='text' />
        </label>
      </div>

      <div className='border-2 border-black p-2 text-center'>
        <button>{buttonName}</button>
      </div>
    </div>
  );
};
SignupOrLogin.propTypes = {
  buttonName: PropTypes.string.isRequired,
};

export default SignupOrLogin;
