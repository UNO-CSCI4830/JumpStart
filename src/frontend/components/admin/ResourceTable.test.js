import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResourceTable from "./ResourceTable";

const mockResources = [
  {
    id: 1,
    title: "Resource 1",
    category: "Category 1",
    uploader: "Uploader 1",
    status: "pending",
  },
];

describe("ResourceTable", () => {
  // Test case for rendering column headers
  test("renders column headers", () => {
    render(<ResourceTable resources={mockResources} />);
    // Check if each header is present in the document
    ["Title", "Category", "Uploader", "Status", "Actions"].forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  // Test case for handling approve and reject actions
  test("handles approve and reject actions", () => {
    const handleStatusChange = jest.fn();
    render(
      <ResourceTable
        resources={mockResources}
        onStatusChange={handleStatusChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /approve/i }));
    expect(handleStatusChange).toHaveBeenCalledWith(1, "approved");

    fireEvent.click(screen.getByRole("button", { name: /reject/i }));
    expect(handleStatusChange).toHaveBeenCalledWith(1, "rejected");
  });

  // Test case for handling edit action
  test("handles edit action", () => {
    const handleEdit = jest.fn();
    render(<ResourceTable resources={mockResources} onEdit={handleEdit} />);

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
