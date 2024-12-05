import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditResourceModal from "./EditResourceModal";

describe("EditResourceModal", () => {
  test("shows onSave can be clicked", () => {
    const handleOnClose = jest.fn();

    render(<EditResourceModal onSave={handleOnClose} />);

    const onCloseButton = screen.getByRole("button", { name: /cancel/i });

    fireEvent.click(onCloseButton);

    expect(handleOnClose).toHaveBeenCalledTimes(1);
  });
});
