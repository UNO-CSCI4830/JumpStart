import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdviceTable from "../frontend/components/admin/AdviceTable";

// Mock data for testing
const mockAdvice = [
  {
    id: 1,
    title: "Advice 1",
    tags: ["tag1", "tag2"],
    uploader: "Uploader 1",
    status: "pending",
  },
];

describe("AdviceTable", () => {
  // Test case for rendering column headers
  test("renders column headers", () => {
    render(<AdviceTable advice={mockAdvice} />);
    // Check if each header is present in the document
    ["Title", "Tags", "Uploader", "Status", "Actions"].forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  // Test case for rendering advice data correctly
  test("renders advice data correctly", () => {
    render(<AdviceTable advice={mockAdvice} />);
    expect(screen.getByText("Advice 1")).toBeInTheDocument();
    expect(screen.getByText("tag1, tag2")).toBeInTheDocument();
    expect(screen.getByText("Uploader 1")).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  // Test case for handling approve and reject actions
  test("handles approve and reject actions", () => {
    const handleStatusChange = jest.fn();
    render(
      <AdviceTable advice={mockAdvice} onStatusChange={handleStatusChange} />
    );

    fireEvent.click(screen.getByRole("button", { name: /approve/i }));
    expect(handleStatusChange).toHaveBeenCalledWith(1, "approved");

    fireEvent.click(screen.getByRole("button", { name: /reject/i }));
    expect(handleStatusChange).toHaveBeenCalledWith(1, "rejected");
  });

  // Test case for handling edit action
  test("handles edit action", () => {
    const handleEdit = jest.fn();
    render(<AdviceTable advice={mockAdvice} onEdit={handleEdit} />);

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(handleEdit).toHaveBeenCalledWith(mockAdvice[0]);
  });

  // Test case for disabling approve button for approved advice
  test("disables approve button for approved advice", () => {
    const approvedAdvice = [{ ...mockAdvice[0], status: "approved" }];
    render(<AdviceTable advice={approvedAdvice} />);
    expect(screen.getByRole("button", { name: /approve/i })).toBeDisabled();
  });

  // Test case for disabling reject button for rejected advice
  test("disables reject button for rejected advice", () => {
    const rejectedAdvice = [{ ...mockAdvice[0], status: "rejected" }];
    render(<AdviceTable advice={rejectedAdvice} />);
    expect(screen.getByRole("button", { name: /reject/i })).toBeDisabled();
  });
});
