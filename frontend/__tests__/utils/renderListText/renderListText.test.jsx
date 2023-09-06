import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderListText } from "../../../src/utils/renderJsx/renderListText";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("renderListText function", () => {
  it("renders a list of text correctly", () => {
    const trad = "example.trad";
    const incrementor = "item";
    const limit = 3;
    const key = "testKey";

    render(renderListText(trad, incrementor, limit, key));

    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(limit);

    listItems.forEach((item, index) => {
      const expectedText = `example.trad.item-${index + 1}`;
      expect(item.textContent).toBe(expectedText);
      expect(item.className).toContain("ninja testKey");
    });
  });

  it("returns null when missing required arguments", () => {
    const result = renderListText();
    expect(result).toBeNull();
  });
});
