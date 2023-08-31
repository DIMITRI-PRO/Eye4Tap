import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";

export const FormItem = ({
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
          className={`ninja label ${dataName} ${displayLabel ? "" : "hidden"}`}
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
