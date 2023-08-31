# Readme - Forms Component

The `Form` component is a React component that facilitates form creation by encapsulating submission handling logic and error management. It supports form field management, data validation, and error message handling.

## Installation

To use the `Form` component, you need to install it in your React application.

1. Copy the code of the `Form` component into your project.

2. Import the `Form` component and use it in your code:

   ```jsx
   import React from "react";
   import PropTypes from "prop-types";
   import { Form } from "path-to-file/Form";

   const MyForm = () => {
     const handleSubmit = (data) => {
       // Handle form submission
       console.log(data);
     };

     return <Form onSubmit={handleSubmit}>{/* Form content */}</Form>;
   };

   export default MyForm;
   ```

## Usage

The `Form` component supports the following features:

- Form submission: The component handles form submission by listening to the `submit` event and calling the `onSubmit` function with the form data as an argument.

- Form field management: You can include form fields inside the `Form` component using the `FormItem` component. The `FormItem` component encapsulates the rendering logic of form fields, including labels, error messages, and field types.

- Data validation: You can specify validation rules for each form field using the `required` and `readOnly` attributes of the `FormItem` component. Corresponding error messages will be displayed in case of validation failure.

- Customization: You can customize the appearance of form fields using CSS classes or by adding specific styles.

## Examples

Here's an example of using the `Form` component with form fields:

```jsx
import React from "react";
import { Form, FormItem } from "path-to-file/Form";

const MyForm = () => {
  const handleSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem label="Name" type="text" dataName="name" required />

      <FormItem label="Email" type="email" dataName="email" required />

      <FormItem label="Password" type="password" dataName="password" required />

      <button type="submit">Submit</button>
    </Form>
  );
};

export default MyForm;
```

## Props

### Form

- `onSubmit` (function): The callback function to be called when the form is submitted. The form data will be passed as an argument.

### FormItem

- `label` (string): The label of the form field.
- `type` (string): The type of form field (default: "text").
- `dataName` (string, required): The name of the form field.
- `defaultValue` (node): The default value of the form field.
- `errorMessage` (object): The object containing the error message associated with the form field.
- `required` (boolean): Indicates if the form field is required.
- `readOnly` (boolean): Indicates if the form field is read-only.

---

This is a basic guide to using the `Form` component in your React application. Feel free to adapt the code according to your specific needs. You can also refer to the propTypes of the components for more information about available props.

**Note:** Don't forget to install the `prop-types` dependency before using the `Form` component.
