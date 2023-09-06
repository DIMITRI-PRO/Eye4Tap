import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { Select } from "../../../src/components/Form/Select/Select";

const options = [
  { key: "option1", label: "Option 1", value: { id: "option1" } },
  { key: "option2", label: "Option 2", value: { id: "option2" } },
  { key: "option3", label: "Option 3", value: { id: "option3" } },
];

describe("Select component", () => {
  it("renders a select element with options", () => {
    const { getByTestId } = render(<Select id="my-select" options={options} />);
    const selectElement = getByTestId("my-select-select");

    expect(selectElement).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <Select id="my-select" options={options} onChange={mockOnChange} />
    );
    const selectElement = getByTestId("my-select-select");

    fireEvent.change(selectElement, { target: { value: "option2" } });

    expect(mockOnChange).toHaveBeenCalledWith({ id: "option2" });
  });

  it("resets selected option and calls onChange when reset button is clicked", () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <Select
        id="my-select"
        name="mySelect"
        options={options}
        onChange={mockOnChange}
      />
    );

    const selectElement = getByTestId("my-select-select");

    fireEvent.change(selectElement, { target: { value: "option2" } });
    const resetButton = getByTestId("my-select-button");

    expect(resetButton).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: "" } });

    fireEvent.click(resetButton);

    expect(selectElement).toHaveValue("");
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it("renders a label when label prop is provided", () => {
    const { getByTestId } = render(
      <Select id="my-select" label="Select Label" />
    );
    const labelElement = getByTestId("my-select-label");

    expect(labelElement).toBeInTheDocument();
  });
});
