import { render, screen } from "@testing-library/react";
import AdviceCard from "../../frontend/components/advice/AdviceCard";
import "@testing-library/jest-dom";

test("renders AdviceCard with given props", () => {
  render(
    <AdviceCard
      title="Testing Advice"
      author="Oliver Jimenez"
      time="2 hours ago"
      tag="Testing"
      content="Always keep learning."
      likes={10}
      hearts={5}
    />
  );

  // Check if the title is rendered
  expect(screen.getByText(/Testing Advice/i)).toBeInTheDocument();

  // Check if the author and time are displayed
  expect(screen.getByText(/Oliver Jimenez • 2 hours ago/i)).toBeInTheDocument();

  // Check if the tag is displayed
  const elements = screen.getAllByText(/Testing/i);
  expect(elements.length).toBeGreaterThan(1); // Ensure at least one element is found

  // Check if the content is displayed
  expect(screen.getByText(/always keep learning\./i)).toBeInTheDocument();

  // Check if the likes and hearts are displayed
  expect(screen.getByText(/10/)).toBeInTheDocument();
  expect(screen.getByText(/5/)).toBeInTheDocument();
});
