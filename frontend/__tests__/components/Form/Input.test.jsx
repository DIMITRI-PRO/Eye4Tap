import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { Input } from "../../../src/components/Form/Input/Input";

describe("Input component", () => {
  it("renders an input element", () => {
    const { getByTestId } = render(<Input type="text" id="input-test" />);

    const inputElement = getByTestId("input-test");

    expect(inputElement).toBeInTheDocument();
  });

  it("renders an input element with the provided type", () => {
    const { getByTestId } = render(<Input type="password" id="input-test" />);

    const inputElement = getByTestId("input-test");

    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("toggles input type between 'text' and 'password' when clicking the eye icon", () => {
    const { getByTestId } = render(<Input type="password" id="input-test" />);
    const inputElement = getByTestId("input-test");
    const eyeIcon = getByTestId("eye-icon");

    expect(inputElement).toHaveAttribute("type", "password");

    fireEvent.click(eyeIcon);

    setTimeout(() => {
      expect(inputElement).toHaveAttribute("type", "text");

      fireEvent.click(eyeIcon);

      setTimeout(() => {
        expect(inputElement).toHaveAttribute("type", "password");
      }, 100);
    }, 100);
  });
});
