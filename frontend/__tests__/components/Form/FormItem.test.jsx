import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { FormItem } from "../../../src/components/Form/FormItem/FormItem";
import { Input } from "../../../src/components/Form/Input/Input";

describe("FormItem component", () => {
  it("renders correctly with label and input", () => {
    const label = "Label";
    const dataName = "inputField";
    const { getByLabelText, getByPlaceholderText } = render(
      <FormItem label={label} dataName={dataName} placeholder={dataName} />
    );

    const labelElement = getByLabelText(label);
    const inputElement = getByPlaceholderText(dataName);

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it("renders correctly without label and input", () => {
    const dataName = "inputField";
    const { getByPlaceholderText } = render(
      <FormItem dataName={dataName} placeholder={dataName} />
    );

    const inputElement = getByPlaceholderText(dataName);

    expect(inputElement).toBeInTheDocument();
  });

  it("renders an error message when errorMessage prop is provided", () => {
    const dataName = "inputField";
    const errorMessage = { message: "This is an error message" };
    const { getByText } = render(
      <FormItem
        dataName={dataName}
        errorMessage={errorMessage}
        placeholder={dataName}
      />
    );

    const errorMessageElement = getByText(errorMessage.message);

    expect(errorMessageElement).toBeInTheDocument();
  });

  it("renders input with type 'password' when Input component is used with type 'password'", () => {
    const dataName = "passwordField";
    const { getAllByTestId } = render(
      <FormItem label="Password" dataName={dataName} required>
        <Input type="password" />
      </FormItem>
    );

    const inputElement = getAllByTestId("passwordField-input");

    expect(inputElement[0]).toBeInTheDocument();
    expect(inputElement[0]).toHaveAttribute("type", "password");
  });
});
