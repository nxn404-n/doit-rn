import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import bcrypt from 'bcryptjs';
import SignupOrLogin from '../components/SignupOrLogin';

describe('SignupOrLogin component', () => {
  const mockUserData = { username: '', password: '' };
  const mockSetUserData = vi.fn();
  const mockSetLoggedIn = vi.fn();
  const mockSetShowTodo = vi.fn();

  it('should render correctly', () => {
    render(<SignupOrLogin
      buttonName={"Sign Up"}
      userData={mockUserData}
      setUserData={mockSetUserData}
      setLoggedIn={mockSetLoggedIn}
      signUp={true}
      setShowTodo={mockSetShowTodo}
    />);

    const usernameLabel = screen.getByLabelText("Username");
    expect(usernameLabel).toBeInTheDocument();
    
    const passwordLabel = screen.getByLabelText("Password");
    expect(passwordLabel).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: "Sign Up" });
    expect(btn).toBeInTheDocument();
  });

  it('should toggle password visibility when clicking the eye icon', () => {
    render(<SignupOrLogin
      buttonName={"Sign Up"}
      userData={mockUserData}
      setUserData={mockSetUserData}
      setLoggedIn={mockSetLoggedIn}
      signUp={true}
      setShowTodo={mockSetShowTodo}
    />);
  
    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByTestId('toggle-password');
  
    expect(toggleButton).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  
  it('should show an error when inputs are empty', () => {
    render(<SignupOrLogin
      buttonName={"Sign Up"}
      userData={mockUserData}
      setUserData={mockSetUserData}
      setLoggedIn={mockSetLoggedIn}
      signUp={true}
      setShowTodo={mockSetShowTodo}
    />);

    const signupBtn = screen.getByText("Sign Up");
    fireEvent.click(signupBtn);

    const errorMsg = screen.getByText("Please enter an username and a password!");
    expect(errorMsg).toBeInTheDocument();
  });

  it('should show an error when only username is entered', () => {
    render(<SignupOrLogin
      buttonName={"Sign Up"}
      userData={{ username: "test", password: "" }}
      setUserData={mockSetUserData}
      setLoggedIn={mockSetLoggedIn}
      signUp={true}
      setShowTodo={mockSetShowTodo}
    />);

    const signupBtn = screen.getByText("Sign Up");
    fireEvent.click(signupBtn);

    const errorMsg = screen.getByText("Please enter a password!");
    expect(errorMsg).toBeInTheDocument();
  });

  it('should show an error when only password is entered', () => {
    render(<SignupOrLogin
      buttonName={"Sign Up"}
      userData={{ username: "", password: "test" }}
      setUserData={mockSetUserData}
      setLoggedIn={mockSetLoggedIn}
      signUp={true}
      setShowTodo={mockSetShowTodo}
    />);

    const signupBtn = screen.getByText("Sign Up");
    fireEvent.click(signupBtn);

    const errorMsg = screen.getByText("Please enter an username!");
    expect(errorMsg).toBeInTheDocument();
  });

  it('should not show error when both username and password are entered', () => {
    render(<SignupOrLogin
      buttonName={"Sign Up"}
      userData={{ username: "testUser", password: "testPassword" }}
      setUserData={mockSetUserData}
      setLoggedIn={mockSetLoggedIn}
      signUp={true}
      setShowTodo={mockSetShowTodo}
    />);

    const signupBtn = screen.getByText("Sign Up");
    fireEvent.click(signupBtn);

    const errorMsg = screen.queryByText(/Please enter/);
    expect(errorMsg).toBeNull(); // No error message should be displayed
  });

  it('should login successfully when correct credentials are provided', async () => {
    const hashedPassword = await bcrypt.hash("testPassword", 10);
    localStorage.setItem(
      'savedUserData',
      JSON.stringify({ username: 'testUser', password: hashedPassword })
    );

    render(<SignupOrLogin
      buttonName={"Login"}
      userData={{ username: "testUser", password: "testPassword" }}
      setUserData={mockSetUserData}
      setLoggedIn={mockSetLoggedIn}
      signUp={false}
      setShowTodo={mockSetShowTodo}
    />);

    const loginBtn = screen.getByText("Login");
    fireEvent.click(loginBtn);

    expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
    expect(localStorage.getItem("loggedIn")).toBe(JSON.stringify(true));
    expect(mockSetShowTodo).toHaveBeenCalledWith(true);
  });
});
