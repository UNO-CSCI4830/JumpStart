import { render, screen, fireEvent } from "@testing-library/react";
import AdviceCard from "../frontend/components/advice/AdviceCard";
import "@testing-library/jest-dom"; // Ensure this is imported for extended matchers like toBeInTheDocument
import Content from "../frontend/components/advice/AdviceContent";
import AdviceShareModal from "../frontend/components/advice/AdviceShareModal";
import React from "react";

jest.mock("mongodb", () => ({
  MongoClient: jest.fn(() => ({
    connect: jest.fn(),
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      }),
    }),
    close: jest.fn(),
  })),
}));

test("increments likes on button click", () => {
  const mockOnLike = jest.fn(); // Mock the online function

  // Mock data with props matching the component's expected structure
  const mockData = {
    id: 1,
    title: "Sample Advice",
    author: "Lebron The GOAT JAMES",
    timeAgo: "23 hours ago",
    tag: "Basketball",
    content: "This is test content.",
    likes: 1000,
  };

  render(
    <AdviceCard
      id={mockData.id}
      title={mockData.title}
      author={mockData.author}
      timeAgo={mockData.timeAgo}
      tag={mockData.tag}
      content={mockData.content}
      likes={mockData.likes}
      onLike={mockOnLike} // Pass the mock function
    />
  );

  // Simulate clicking the "like" button
  const likeButton = screen.getByRole("button");
  fireEvent.click(likeButton);

  // Verify the mock function was called with the correct id
  expect(mockOnLike).toHaveBeenCalledWith(mockData.id);
});

describe("Content Component", () => {
  test("renders the correct number of AdviceCards based on posts", () => {
    const mockPosts = [
      { _id: "1", title: "Post 1", likes: 10 },
      { _id: "2", title: "Post 2", likes: 20 },
    ];

    render(
      <Content posts={mockPosts} onSortChange={jest.fn()} onLike={jest.fn()} />
    );

    // Check if AdviceCard components are rendered
    const adviceCards = screen.getAllByRole("article"); // Ensure AdviceCard uses role="article"
    expect(adviceCards).toHaveLength(mockPosts.length);
  });

  test("calls onSortChange with the correct arguments when buttons are clicked", () => {
    const mockOnSortChange = jest.fn();

    render(
      <Content posts={[]} onSortChange={mockOnSortChange} onLike={jest.fn()} />
    );

    // Simulate clicking the "MOST RECENT" button
    const mostRecentButton = screen.getByText("MOST RECENT");
    fireEvent.click(mostRecentButton);
    expect(mockOnSortChange).toHaveBeenCalledWith("mostRecent");

    // Simulate clicking the "MOST LIKED" button
    const mostLikedButton = screen.getByText("MOST LIKED");
    fireEvent.click(mostLikedButton);
    expect(mockOnSortChange).toHaveBeenCalledWith("mostLiked");
  });
});

// Test User Interactions with the form fields
// Test to ensure the modal renders correctly when the component is loaded
// Test that the Tags dropdown handles user interactions
describe("AdviceShareModal Component", () => {
  test("renders the modal and handles form submission", () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    const mockOnClose = jest.fn();
    const mockHandleInputChange = jest.fn();
    const mockSubmission = {
      uploader: "",
      title: "",
      anon: "anon",
      tags: [],
      description: "",
    };

    render(
      <AdviceShareModal
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        submission={mockSubmission}
        handleInputChange={mockHandleInputChange}
      />
    );

    // Check modal title
    expect(screen.getByText("Share Your Advice")).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@example.com", name: "uploader" },
    });
    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: "Mike Tyson", name: "title" },
    });
    fireEvent.change(screen.getByLabelText(/Post as:/i), {
      target: { value: "name", name: "anon" },
    });

    // Simulate tag selection using the `value` property
    const tagsSelect = screen.getByLabelText(/Tags:/i);
    fireEvent.change(tagsSelect, { target: { value: "Study tips" } });

    expect(mockHandleInputChange).toHaveBeenCalledWith({
      target: { name: "tags", value: ["Study tips"] },
    });

    // Simulate form submission
    const submitButton = screen.getByRole("button", { name: /Submit Advice/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);

    // Simulate closing the modal
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
