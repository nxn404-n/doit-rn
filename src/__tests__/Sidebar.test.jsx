import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "../components/Sidebar";

describe("Sidebar Component", () => {
  const mockSetShowTodo = vi.fn();
  const mockSetShowAccCenter = vi.fn();

  beforeEach(() => {
    // Clear the mock function calls before each test
    mockSetShowTodo.mockClear();
    mockSetShowAccCenter.mockClear();
  });

  it("renders correctly with Todo and Account buttons", () => {
    render(
      <Sidebar
        setShowTodo={mockSetShowTodo}
        setShowAccCenter={mockSetShowAccCenter}
      />
    );

    // Check if the Todo button is rendered
    expect(screen.getByText(/Todo/i)).toBeInTheDocument();

    // Check if the Account button is rendered
    expect(screen.getByText(/Account/i)).toBeInTheDocument();
  });

  it("calls setShowTodo and setShowAccCenter with correct values on button clicks", () => {
    render(
      <Sidebar
        setShowTodo={mockSetShowTodo}
        setShowAccCenter={mockSetShowAccCenter}
      />
    );

    // Click the Todo button
    fireEvent.click(screen.getByText(/Todo/i));
    expect(mockSetShowTodo).toHaveBeenCalledWith(true);
    expect(mockSetShowAccCenter).toHaveBeenCalledWith(false);

    // Click the Account button
    fireEvent.click(screen.getByText(/Account/i));
    expect(mockSetShowTodo).toHaveBeenCalledWith(false);
    expect(mockSetShowAccCenter).toHaveBeenCalledWith(true);
  });
});
