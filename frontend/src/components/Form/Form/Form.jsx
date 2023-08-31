import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";

export const Form = ({ children, onSubmit, initialValues, errors }) => {
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
