import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "../../../src/components/NinjaComp";

describe("Button component", () => {
  test("renders button with text content", () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  test("renders button with icon", () => {
    const iconSrc = "path/to/icon.png";
    const { getByAltText } = render(<Button icon={iconSrc} />);
    const icon = getByAltText("icon button");
    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute("src")).toBe(iconSrc);
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
