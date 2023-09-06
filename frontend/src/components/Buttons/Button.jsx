import React from "react";
import PropTypes from "prop-types";
import { Loader } from "../../assets/FeatherIcons";

export const Button = ({
  id,
  name,
  icon,
  type,
  onClick,
  children,
  disabled,
  isLoading,
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      id={id || null}
      className={`ninja btn-${name || type || "basic"}`}
      type={type || "button"}
      onClick={onClick || null}
      data-testid={id || null}
    >
      {isLoading ? <Loader className="ninja btn-loader-spin" /> : icon && icon}
      {children}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};
Button.defaultProps = {
  id: null,
  name: null,
  type: null,
  icon: null,
  onClick: () => {},
  children: null,
  disabled: false,
  isLoading: false,
};
