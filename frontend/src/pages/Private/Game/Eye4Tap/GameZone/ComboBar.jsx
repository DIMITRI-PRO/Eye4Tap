import { PropTypes } from "prop-types";

export const ComboBar = ({
  id,
  combo,
  coef,
  duration,
  vertical,
  color,
  countDisplay,
  errorCount,
}) => {
  const fillStyle = {
    [!vertical ? "width" : "height"]: `${combo >= 100 ? 100 : combo + coef}%`,
    [!vertical ? "height" : "width"]: "10px",
    transition: `${!vertical ? "width" : "height"} ${duration}s ease-in-out`,
  };

  if (color) fillStyle.backgroundColor = color;

  if (errorCount === 0) fillStyle.width = 0;

  return (
    <div
      id={`combo-bar-${id}`}
      className={`combo-bar-container ${vertical ? "vertical" : ""}`}
    >
      <div className="combo-bar-fill" style={fillStyle} />
      <p className="combo-bar-value">
        {combo > countDisplay ? `+${combo}` : ""}
      </p>
    </div>
  );
};

ComboBar.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  vertical: PropTypes.bool,
  duration: PropTypes.number,
  combo: PropTypes.number.isRequired,
  coef: PropTypes.number,
  countDisplay: PropTypes.number,
  errorCount: PropTypes.number,
};

ComboBar.defaultProps = {
  coef: 2,
  vertical: false,
  color: null,
  duration: 0.2,
  countDisplay: 0,
  errorCount: 5,
};
