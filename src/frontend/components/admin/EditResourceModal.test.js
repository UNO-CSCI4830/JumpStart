import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditResourceModal from "./EditResourceModal";

describe("EditResourceModal", () => {
  const mockResource = {
    title: "Test Resource",
    description: "Test Description",
    link: "https://test.com",
    category: "Academic",
  };

  // Test case for rendering the modal with resource information
  test("renders modal with resource information", () => {
    render(
      <EditResourceModal
        resource={mockResource}
        onSave={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue(mockResource.title);
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      mockResource.description
    );
    expect(screen.getByLabelText(/resource link/i)).toHaveValue(
      mockResource.link
    );
    expect(screen.getByLabelText(/category/i)).toHaveValue(
      mockResource.category
    );
  });

  // Test case for saving updated resource information
  test("calls onSave with updated resource when Save Changes is clicked", () => {
    const handleSave = jest.fn();
    render(
      <EditResourceModal
        resource={mockResource}
        onSave={handleSave}
        onClose={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Updated Title" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Updated Title" })
    );
  });

  // Test case for closing the modal when Cancel is clicked
  test("calls onClose when Cancel is clicked", () => {
    const handleClose = jest.fn();
    render(
      <EditResourceModal
        resource={mockResource}
        onSave={() => {}}
        onClose={handleClose}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
