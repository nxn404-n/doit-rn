import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Authentication from "../components/Authentication";

describe("Authentication Component", () => {
  const mockSetLoggedIn = vi.fn();
  const mockSetSignUp = vi.fn();
  const mockSetShowTodo = vi.fn();

  it("renders correctly and shows Sign Up form when signUp is true", () => {
    render(
      <Authentication
        setLoggedIn={mockSetLoggedIn}
        signUp={true}
        setSignUp={mockSetSignUp}
        setShowTodo={mockSetShowTodo}
      />
    );

    // Check if the Sign Up form is displayed
    expect(screen.getByText(/Welcome to DOIT-rn/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
  });

  it("renders correctly and shows Log In form when signUp is false", () => {
    render(
      <Authentication
        setLoggedIn={mockSetLoggedIn}
        signUp={false}
        setSignUp={mockSetSignUp}
        setShowTodo={mockSetShowTodo}
      />
    );

    // Check if the Log In form is displayed
    expect(screen.getByText(/Welcome to DOIT-rn/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log in/i })).toBeInTheDocument();
    expect(screen.getByText(/Create a new account\?/i)).toBeInTheDocument();
  });

  it("toggles between Sign Up and Log In", () => {
    render(
      <Authentication
        setLoggedIn={mockSetLoggedIn}
        signUp={true}
        setSignUp={mockSetSignUp}
        setShowTodo={mockSetShowTodo}
      />
    );

    // Click the "Log in" button
    fireEvent.click(screen.getByRole("button", { name: /Log in/i }));

    // Check if setSignUp has been called
    expect(mockSetSignUp).toHaveBeenCalled();
  });

  it("toggles back to Sign Up from Log In", () => {
    render(
      <Authentication
        setLoggedIn={mockSetLoggedIn}
        signUp={false}
        setSignUp={mockSetSignUp}
        setShowTodo={mockSetShowTodo}
      />
    );

    // Click the "Sign Up" button
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Check if setSignUp has been called
    expect(mockSetSignUp).toHaveBeenCalled();
  });
});
