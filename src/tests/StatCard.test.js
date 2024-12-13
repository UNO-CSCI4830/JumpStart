import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatCard from "../frontend/components/admin/StatCard";

describe("StatCard", () => {
  // Helper function to render the StatCard with default props
  const renderStatCard = (props = {}) =>
    render(<StatCard title="Test Title" value={0} {...props} />);

  // Test suite for rendering title and value correctly
  test.each([
    ["Test Title", 0],
    ["Resources", 10],
    ["Advice Posts", 100],
  ])("renders title '%s' and value %i correctly", (title, value) => {
    renderStatCard({ title, value });
    const headingElement = screen.getByRole("heading", { level: 2 });
    expect(headingElement).toHaveTextContent(title);
    expect(screen.getByText(value.toString())).toBeInTheDocument();
  });

  // Test case for rendering zero value
  test("renders zero value", () => {
    renderStatCard({ value: 0 });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  // Test case for checking the correct heading level
  test("renders with correct heading level", () => {
    renderStatCard();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
