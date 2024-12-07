import { render, screen, fireEvent } from "@testing-library/react";
import AdviceCard from "../../frontend/components/advice/AdviceCard";
import "@testing-library/jest-dom"; // Ensure this is imported for extended matchers like toBeInTheDocument
import Content from "../../frontend/components/advice/AdviceContent";
import AdviceShareModal from "../../frontend/components/advice/AdviceShareModal";

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
  const mockData = {
    title: "Sample Advice",
    author: "Lebron The GOAT JAMES",
    timeAgo: "23 hours ago",
    tag: "Basketball",
    content: "This is test content.",
    likes: 1000,
    hearts: 500,
  };

  render(<AdviceCard data={mockData} key="1" />);

  // Simulate clicking the "like" button
  const likeButton = screen.getByRole("button", { name: /1000/i });
  fireEvent.click(likeButton);

  // Verify the UI updates
  expect(screen.getByText("1001")).toBeInTheDocument();
});

describe("Content Component", () => {
  test("renders the correct number of AdviceCards based on posts", () => {
    const mockPosts = [
      { title: "Post 1", likes: 10, hearts: 5 },
      { title: "Post 2", likes: 20, hearts: 15 },
    ];

    render(<Content posts={mockPosts} onSortChange={jest.fn()} />);

    // Check if AdviceCard components are rendered
    const adviceCards = screen.getAllByRole("article");
    expect(adviceCards).toHaveLength(mockPosts.length);
  });

  test("calls onSortChange with the correct arguments when buttons are clicked", () => {
    const mockOnSortChange = jest.fn();

    render(<Content posts={[]} onSortChange={mockOnSortChange} />);

    // Simulate clicking the "MOST RECENT" button
    const mostRecentButton = screen.getByText("MOST RECENT");
    fireEvent.click(mostRecentButton);
    expect(mockOnSortChange).toHaveBeenCalledWith("mostRecent");

    // Simulate clicking the "MOST LIKED" button
    const mostLikedButton = screen.getByText("MOST LIKED");
    fireEvent.click(mostLikedButton);
    expect(mockOnSortChange).toHaveBeenCalledWith("mostLiked");

    // Simulate clicking the "MOST HEARTED" button
    const mostHeartedButton = screen.getByText("MOST HEARTED");
    fireEvent.click(mostHeartedButton);
    expect(mockOnSortChange).toHaveBeenCalledWith("mostHearted");
  });
});

describe("AdviceShareModal Component", () => {
  test("renders the modal and handles form submission", () => {
    const mockOnClose = jest.fn();

    // Render the component with the mock onClose function
    render(<AdviceShareModal onClose={mockOnClose} />);

    expect(screen.getByText("Share Your Advice")).toBeInTheDocument();

    //Fill out Form
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@example.com", name: "email" },
    });

    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: "Mike Tyson", name: "name" },
    });

    fireEvent.change(screen.getByLabelText(/Post as:/i), {
      target: { value: "Name", name: "postAs" },
    });

    // Select tags by simulating user interaction
    const tagsDropdown = screen.getByLabelText(/Tags:/i);

    // Simulate selecting multiple tags
    fireEvent.change(tagsDropdown, {
      target: { value: "Study tips" },
    });
    // Check that the selected options include the expected tags
    const selectedOptions = Array.from(tagsDropdown.selectedOptions).map(
      (option) => option.value
    );

    expect(selectedOptions).toEqual(["Study tips"]);

    fireEvent.click(screen.getByRole("button", { name: /Submit Advice/i }));

    expect(mockOnClose).toHaveBeenCalledWith({
      email: "test@example.com",
      name: "Mike Tyson",
      postAs: "Name",
      tags: ["Study tips"],
      advice: "",
    });
  });
});
