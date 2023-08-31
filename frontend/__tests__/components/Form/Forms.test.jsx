import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { Forms } from "../../../src/components/Form/index";

const { Form, FormItem } = Forms;

describe("Form component", () => {
  it("should call the onSubmit function with form data on form submission", () => {
    const handleSubmit = jest.fn();
    const initialValues = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    const { getByLabelText, getByText } = render(
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <FormItem label="Name" type="text" dataName="name" />
        <FormItem label="Email" type="email" dataName="email" />
        <button type="submit">Submit</button>
      </Form>
    );

    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
    fireEvent.change(emailInput, {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Jane Smith",
      email: "jane.smith@example.com",
    });
  });

  it("should display error messages for invalid fields", () => {
    const handleSubmit = jest.fn();
    const errors = [
      { context: { key: "name" }, message: "Name is required" },
      { context: { key: "email" }, message: "Email is invalid" },
    ];

    const { getByLabelText, getByText } = render(
      <Form onSubmit={handleSubmit} errors={errors}>
        <FormItem label="Name" type="text" dataName="name" />
        <FormItem label="Email" type="email" dataName="email" />
        <button type="submit">Submit</button>
      </Form>
    );

    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(emailInput, {
      target: { value: "" },
    });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      name: "",
      email: "",
    });

    const nameError = getByText("Name is required");
    const emailError = getByText("Email is invalid");

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
  });
});
