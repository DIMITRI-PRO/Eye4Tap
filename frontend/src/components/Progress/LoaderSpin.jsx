import PropTypes from "prop-types";
import { Loader } from "../../assets/FeatherIcons";

export const LoaderSpin = ({ icon, size, text, style, display, name }) => {
  return (
    <div
      style={style}
      className={`ninja loader-container-${name || "spin"} ${
        display ? "" : "hidden"
      }`}
    >
      {text && (
        <span className={`ninja loader-text ${name || ""}`}>{text}</span>
      )}
      <div className={`ninja loader-${name || "spin"}`}>
        {icon || <Loader height={size} width={size} />}
      </div>
    </div>
  );
};

LoaderSpin.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.number,
  display: PropTypes.bool,
  style: PropTypes.shape({}),
  icon: PropTypes.node,
};

LoaderSpin.defaultProps = {
  name: null,
  text: null,
  size: 10,
  display: true,
  style: null,
  icon: null,
};
