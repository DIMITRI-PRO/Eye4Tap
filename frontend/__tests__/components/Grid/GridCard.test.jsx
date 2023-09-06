import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { GridCard } from "../../../src/components/Grids/GridCard/GridCard";

describe("GridCard component", () => {
  const id = "grid-card-id";
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<GridCard id={id} />);
    const gridCardElement = getByTestId("grid-card-id");

    expect(gridCardElement).toBeInTheDocument();
  });

  it("renders with custom class and grid area", () => {
    const customClass = "custom";
    const gridArea = [1, 2, 3, 4];
    const { getByTestId } = render(
      <GridCard id={id} customClass={customClass} gridArea={gridArea} />
    );
    const gridCardElement = getByTestId("grid-card-id");

    expect(gridCardElement).toBeInTheDocument();
    expect(gridCardElement).toHaveClass(`grid-${customClass}`);
    expect(gridCardElement.style.gridArea).toMatch(
      /1\s*\/\s*2\s*\/\s*3\s*\/\s*4/
    );
  });

  it("renders with children", () => {
    const { getByTestId } = render(
      <GridCard id={id}>
        <div data-testid="child">Child Component</div>
      </GridCard>
    );
    const gridCardElement = getByTestId("grid-card-id");
    const childElement = getByTestId("child");

    expect(gridCardElement).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });

  it("renders with an ID", () => {
    const { getByTestId } = render(<GridCard id={id} />);
    const gridCardElement = getByTestId("grid-card-id");

    expect(gridCardElement).toBeInTheDocument();
    expect(gridCardElement).toHaveAttribute("id", id);
  });
});
