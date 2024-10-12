import { render, screen, fireEvent } from '@testing-library/react';
import AccountCenter from '../components/AccountCenter';
import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';

describe('AccountCenter Component', () => {
  const mockSetLoggedIn = vi.fn();
  const mockSetSignUp = vi.fn();

  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();

    // Set initial state in localStorage
    localStorage.setItem('savedUserData', JSON.stringify({ username: 'testuser', password: 'password' }));
    localStorage.setItem('loggedIn', JSON.stringify(true));
  });

  afterEach(() => {
    // Reset mocks and localStorage after each test
    mockSetLoggedIn.mockClear();
    mockSetSignUp.mockClear();
    localStorage.clear();
  });

  test('renders Account Center when logged in and showTodo is false', () => {
    render(<AccountCenter setLoggedIn={mockSetLoggedIn} setSignUp={mockSetSignUp} loggedIn={true} showTodo={false} />);

    expect(screen.getByText('Account Center')).toBeInTheDocument();
    expect(screen.getByText('Username: testuser')).toBeInTheDocument();
    expect(screen.getByText('Delete account')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('does not render Account Center when loggedIn is false or showTodo is true', () => {
    render(<AccountCenter setLoggedIn={mockSetLoggedIn} setSignUp={mockSetSignUp} loggedIn={false} showTodo={false} />);
    expect(screen.queryByText('Account Center')).not.toBeInTheDocument();

    render(<AccountCenter setLoggedIn={mockSetLoggedIn} setSignUp={mockSetSignUp} loggedIn={true} showTodo={true} />);
    expect(screen.queryByText('Account Center')).not.toBeInTheDocument();
  });

  test('calls handleLogOut when Log out is clicked', () => {
    render(<AccountCenter setLoggedIn={mockSetLoggedIn} setSignUp={mockSetSignUp} loggedIn={true} showTodo={false} />);

    const logOutButton = screen.getByText('Log out');
    fireEvent.click(logOutButton);

    // Check that the setLoggedIn and setSignUp functions were called
    expect(mockSetLoggedIn).toHaveBeenCalledWith(false);
    expect(mockSetSignUp).toHaveBeenCalledWith(false);

    // Check that loggedIn was set correctly in localStorage
    expect(localStorage.getItem('loggedIn')).toBe(JSON.stringify(true));
  });

  test('calls handleDeleteAcc when Delete account is clicked', () => {
    render(<AccountCenter setLoggedIn={mockSetLoggedIn} setSignUp={mockSetSignUp} loggedIn={true} showTodo={false} />);

    const deleteAccButton = screen.getByText('Delete account');
    fireEvent.click(deleteAccButton);

    // Check that the setLoggedIn function was called
    expect(mockSetLoggedIn).toHaveBeenCalledWith(false);

    // Check that savedUserData and todos were cleared from localStorage
    expect(localStorage.getItem('savedUserData')).toBe(JSON.stringify({ username: '', password: '' }));
    expect(localStorage.getItem('todos')).toBe(JSON.stringify([]));
  });
});
