import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatCard from "./StatCard";

describe("StatCard", () => {
  // Define default props used across all tests
  const defaultProps = {
    title: "Test Title",
    value: 0,
  };

  // Helper function to render StatCard component with merged props
  function renderStatCard(props = {}) {
    return render(<StatCard {...defaultProps} {...props} />);
  }

  describe("value rendering", () => {
    // Test cases for different numeric values
    const testCases = [
      [10, "10", "renders positive numbers"],
      [0, "0", "renders zero"],
      [100, "100", "renders three digit numbers"],
    ];

    // Test each numeric value case
    testCases.forEach(([value, expected, description]) => {
      test(description, () => {
        renderStatCard({ value });
        expect(screen.getByText(expected)).toBeInTheDocument();
      });
    });
  });

  describe("title rendering", () => {
    // Test cases for different title strings
    const titleTestCases = [
      ["Total Resources", "renders resource title"],
      ["Total Advice Posts", "renders advice posts title"],
      ["Custom Title", "renders custom title"],
    ];

    // Test each title case
    titleTestCases.forEach(([title, description]) => {
      test(description, () => {
        renderStatCard({ title });
        const titleElement = screen.getByRole("heading", { level: 2 });
        expect(titleElement).toHaveTextContent(title);
      });
    });
  });

  describe("component structure", () => {
    // Test heading level accessibility
    test("renders with correct heading level", () => {
      renderStatCard();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    // Test both title and value render correctly together
    test("renders both title and value", () => {
      const title = "Test Title";
      const value = 42;
      renderStatCard({ title, value });
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        title
      );
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });
});
