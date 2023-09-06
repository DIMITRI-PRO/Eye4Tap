import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { LanguageSwitch } from "../../../src/components/Buttons/LanguageSwitch";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { changeLanguage: jest.fn() } }),
}));

describe("LanguageSwitch component", () => {
  it("should change language when buttons are clicked", () => {
    const { getByText } = render(<LanguageSwitch />);

    const engButton = getByText("Eng");
    const frButton = getByText("Fr");

    fireEvent.click(engButton);

    expect(engButton).toBeInTheDocument();
    expect(frButton).toBeInTheDocument();
    expect(engButton.className).toContain("btn-language");
    expect(frButton.className).toContain("btn-language");
    expect(engButton).toHaveAttribute("type", "link");
    expect(frButton).toHaveAttribute("type", "link");

    fireEvent.click(frButton);

    expect(engButton).toBeInTheDocument();
    expect(frButton).toBeInTheDocument();
    expect(engButton.className).toContain("btn-language");
    expect(frButton.className).toContain("btn-language");
    expect(engButton).toHaveAttribute("type", "link");
    expect(frButton).toHaveAttribute("type", "link");
  });
});
