import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import TodoList from "../components/TodoList";

describe("TodoList component", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it("should render the input and button when logged in", () => {
    render(<TodoList loggedIn={true} />);
    
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Add todo");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should not render anything if not logged in", () => {
    render(<TodoList loggedIn={false} />);
    
    const input = screen.queryByRole("textbox");
    const button = screen.queryByText("Add todo");

    expect(input).toBeNull();
    expect(button).toBeNull();
  });

  it("should add a new todo", () => {
    render(<TodoList loggedIn={true} />);
    
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Add todo");

    // Simulate adding a new todo
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    const todoItem = screen.getByText("New Todo");
    expect(todoItem).toBeInTheDocument();
  });

  it("should persist todos in localStorage", () => {
    render(<TodoList loggedIn={true} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByText("Add todo");

    // Add a new todo
    fireEvent.change(input, { target: { value: "Persistent Todo" } });
    fireEvent.click(button);

    // Check if the todo is in localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    expect(savedTodos).toHaveLength(1);
    expect(savedTodos[0].task).toBe("Persistent Todo");
  });

  it("should delete a todo", () => {
    render(<TodoList loggedIn={true} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByText("Add todo");

    // Add a new todo
    fireEvent.change(input, { target: { value: "Todo to be deleted" } });
    fireEvent.click(button);

    // Delete the todo
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    const deletedTodo = screen.queryByText("Todo to be deleted");
    expect(deletedTodo).toBeNull();
  });

  it("should toggle a todo's completion status", () => {
    render(<TodoList loggedIn={true} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByText("Add todo");

    // Add a new todo
    fireEvent.change(input, { target: { value: "Todo to toggle" } });
    fireEvent.click(button);

    // Toggle the todo
    const todoCheckbox = screen.getByRole("checkbox");
    fireEvent.click(todoCheckbox);

    const todoItem = screen.getByText("Todo to toggle");

    expect(todoItem).toHaveClass("line-through"); // Assuming completed todos get a "completed" class
  });
});
