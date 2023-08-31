import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "../../../assets/FeatherIcons";

export const Input = ({ ...props }) => {
  const [displayText, setDisplayText] = useState("text");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) setDisplayText("text");
    else setDisplayText(null);
  }, [show]);

  return (
    <div className="ninja form-item child-container">
      <input
        className={`ninja form-item child-${props?.name || ""}`}
        {...props}
        type={displayText || props?.type}
      />
      {props?.type === "password" && (
        <div
          className="ninja eye-password"
          aria-hidden="true"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? <EyeOff /> : <Eye />}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
};
Input.defaultProps = {
  name: "",
};
