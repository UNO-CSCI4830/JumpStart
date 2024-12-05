import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResourceTable from "./ResourceTable";

describe("ResourceTable - Column Names", () => {
  // Define an array of test cases for the table headers
  const adminTableTestNames = [
    ["Title", "renders admin title"],
    ["Category", "renders category title"],
    ["Uploader", "renders uploader title"],
    ["Status", "renders status title"],
    ["Actions", "renders actions title"],
  ];

  // Mock data for testing the ResourceTable
  const mockResources = [
    {
      id: 1,
      title: "Resource 1",
      category: "Category 1",
      uploader: "Uploader 1",
      status: "approved", // Set the status to approved for testing
    },
  ];

  // Use test.each for cleaner testing of multiple cases
  test.each(adminTableTestNames)("%s column - %s", (title, description) => {
    render(<ResourceTable resources={mockResources} />); // Render the ResourceTable with mock resources
    const titleElement = screen.getByText(title); // Find the element containing the column title
    expect(titleElement).toHaveTextContent(title); // Assert that the title element has the correct text content
  });
});

describe("ResourceTable - Approve and Reject Buttons", () => {
  const mockResources = [
    {
      id: 1,
      title: "Resource 1",
      category: "Category 1",
      uploader: "Uploader 1",
      status: "pending",
    },
  ];

  // Test case for checking status change when the approve button is clicked
  test("shows the correct status when the approve button is pressed", () => {
    const handleStatusChange = jest.fn(); // Mock function to handle status change

    // Render the ResourceTable with mock resources and the status change handler
    render(
      <ResourceTable
        resources={mockResources}
        onStatusChange={handleStatusChange}
      />
    );

    // Find the approve button
    const approveButton = screen.getByRole("button", { name: /approve/i });

    // Simulate a click event on the approve button
    fireEvent.click(approveButton);

    // Assert that the status change handler was called with the correct parameters
    expect(handleStatusChange).toHaveBeenCalledWith(
      mockResources[0].id,
      "approved"
    );

    // Optionally, check if the status is updated in the UI
    // This assumes that the ResourceTable updates the UI accordingly
    const statusElement = screen.getByText("Approve"); // Adjust based on how the status is displayed
    expect(statusElement).toBeInTheDocument();

    // Make sure the button is clickable
    expect(handleStatusChange).toHaveBeenCalledTimes(1);
  });

  // Additional test case for checking status change when the reject button is pressed
  test("shows the correct status when the reject button is pressed", () => {
    const handleStatusChange = jest.fn(); // Mock function to handle status change

    // Render the ResourceTable with mock resources and the status change handler
    render(
      <ResourceTable
        resources={mockResources}
        onStatusChange={handleStatusChange}
      />
    );

    // Find the reject button
    const rejectButton = screen.getByRole("button", { name: /reject/i });

    // Simulate a click event on the reject button
    fireEvent.click(rejectButton);

    // Assert that the status change handler was called with the correct parameters
    expect(handleStatusChange).toHaveBeenCalledWith(
      mockResources[0].id,
      "rejected"
    );

    // Optionally, check if the status is updated in the UI
    const statusElement = screen.getByText("Reject"); // Adjust based on how the status is displayed
    expect(statusElement).toBeInTheDocument();

    // Make sure the button is clickable
    expect(handleStatusChange).toHaveBeenCalledTimes(1);
  });
});

describe("Resources - Edit Button", () => {
  const mockResources = [
    {
      id: 1,
      title: "Resource 1",
      category: "Category 1",
      uploader: "Uploader 1",
      status: "pending",
    },
  ];

  test("make sure the edit button can be clicked", () => {
    const handleOnEdit = jest.fn();

    // Render the ResourceTable with mock resources and the edit handler
    render(<ResourceTable resources={mockResources} onEdit={handleOnEdit} />);

    // Find the edit button
    const editButton = screen.getByRole("button", { name: /edit/i });

    // Simulate a click event on the edit button
    fireEvent.click(editButton);

    // Assert that the edit handler was called
    expect(handleOnEdit).toHaveBeenCalledTimes(1);
  });
});
