import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";

const Form = ({ children, onSubmit, initialValues, errors }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    Array.from(formData.entries()).forEach(([name, value]) => {
      data[name] = value;
    });
    onSubmit?.(data);
  };

  const renderChildrenWithProps = (errorArray) => {
    if (!initialValues)
      return Children.map(children, (child) => {
        if (child.props.dataName) {
          const errorMessage = errorArray.find(
            (el) => el.context.key === child.props.dataName
          );
          return cloneElement(child, {
            name: child.props.dataName,
            errorMessage,
          });
        }
        return child;
      });

    return Children.map(children, (child) => {
      if (child.props.dataName && initialValues[child.props.dataName]) {
        const initialValue = initialValues[child.props.dataName];
        return cloneElement(child, {
          name: child.props.dataName,
          defaultValue: initialValue,
        });
      }
      return child;
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {renderChildrenWithProps(errors)}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  initialValues: PropTypes.shape({}),
  errors: PropTypes.arrayOf(PropTypes.shape({})),
};

Form.defaultProps = {
  onSubmit: () => {},
  children: null,
  initialValues: null,
  errors: [],
};

const FormItem = ({
  label,
  displayLabel,
  type,
  dataName,
  children,
  defaultValue,
  errorMessage,
  required,
  readOnly,
  placeholder,
}) => {
  const inputId = `${dataName}-input`;

  const childrenWithProps = Children.map(children, (child) => {
    return cloneElement(child, {
      name: dataName,
      id: inputId,
      required,
      defaultValue,
    });
  });

  return (
    <div className={`ninja form-item ${dataName}`}>
      {label && (
        <label
          className={`ninja label ${dataName} ${
            displayLabel && required ? "" : "hidden"
          }`}
          htmlFor={inputId}
        >
          {required ? (
            <>
              {label}
              <span style={{ color: "red" }}>*</span>
            </>
          ) : (
            label
          )}
        </label>
      )}
      {childrenWithProps || (
        <input
          className={`ninja input ${dataName} ${type}`}
          type={type}
          name={dataName}
          id={inputId}
          defaultValue={defaultValue}
          required={required}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      )}
      <span
        className={`ninja input-message ${
          errorMessage?.message ? "error" : ""
        }`}
      >
        {errorMessage?.message || null}
      </span>
    </div>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  dataName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  defaultValue: PropTypes.node,
  errorMessage: PropTypes.shape({ message: PropTypes.string }),
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  displayLabel: PropTypes.bool,
};

FormItem.defaultProps = {
  label: "",
  placeholder: "",
  type: "text",
  children: null,
  defaultValue: null,
  errorMessage: null,
  required: false,
  readOnly: false,
  displayLabel: true,
};

export const Forms = { Form, FormItem };
