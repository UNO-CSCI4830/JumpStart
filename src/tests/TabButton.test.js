import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import TabButton from "../frontend/components/admin/TabButton";

describe("TabButton", () => {
  // Test case for rendering and click handling
  test("renders with correct class name and handles click", () => {
    const handleClick = jest.fn();
    render(<TabButton onClick={handleClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("tab-button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test case for active state
  test("shows active state when selected", () => {
    render(<TabButton isActive={true} />);
    expect(screen.getByRole("button")).toHaveClass("active");
  });
});
