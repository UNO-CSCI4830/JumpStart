import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditAdviceModal from "../frontend/components/admin/EditAdviceModal";

describe("EditAdviceModal", () => {
  const mockAdvice = {
    title: "Test Advice",
    description: "Test Description",
    tags: ["tag1", "tag2"],
  };

  test("renders modal with advice information", () => {
    render(
      <EditAdviceModal
        advice={mockAdvice}
        onSave={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue(mockAdvice.title);
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      mockAdvice.description
    );
    expect(screen.getByLabelText(/tags/i)).toHaveValue(
      mockAdvice.tags.join(", ")
    );
  });

  test("calls onSave with updated advice when Save Changes is clicked", () => {
    const handleSave = jest.fn();
    render(
      <EditAdviceModal
        advice={mockAdvice}
        onSave={handleSave}
        onClose={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Updated Title" },
    });
    fireEvent.change(screen.getByLabelText(/tags/i), {
      target: { value: "tag1, tag2, tag3" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Updated Title",
        tags: ["tag1", "tag2", "tag3"],
      })
    );
  });

  test("calls onClose when Cancel is clicked", () => {
    const handleClose = jest.fn();
    render(
      <EditAdviceModal
        advice={mockAdvice}
        onSave={() => {}}
        onClose={handleClose}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("updates tags when input changes", () => {
    render(
      <EditAdviceModal
        advice={mockAdvice}
        onSave={() => {}}
        onClose={() => {}}
      />
    );

    const tagsInput = screen.getByLabelText(/tags/i);
    fireEvent.change(tagsInput, {
      target: { value: "tag1, tag2, tag3, tag4" },
    });

    expect(tagsInput).toHaveValue("tag1, tag2, tag3, tag4");
  });
});
