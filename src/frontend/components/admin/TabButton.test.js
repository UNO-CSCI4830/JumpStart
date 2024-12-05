import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TabButton from "./TabButton";

describe("TabButton", () => {
  test("renders with correct the class name", () => {
    // Test if it is the correct class name
    const handleClick = jest.fn();
    render(<TabButton onClick={handleClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("tab-button");
  });

  // Test click functionality
  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<TabButton onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test active state
  test("shows active state when selected", () => {
    render(<TabButton isActive={true} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("active");
  });
});
