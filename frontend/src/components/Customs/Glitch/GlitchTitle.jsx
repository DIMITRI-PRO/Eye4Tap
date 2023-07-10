import PropTypes from "prop-types";

export const GlitchTitle = ({ content, glitchText, subText, isSubGlitch }) => {
  return (
    <div className="wrapper">
      <h1 className="ninja glitch" data-text={glitchText || content}>
        {content}
      </h1>
      {subText && (
        <p
          className={`ninja ${isSubGlitch ? "glitch sub" : ""}`}
          data-text={subText}
        >
          {subText}
        </p>
      )}
    </div>
  );
};

GlitchTitle.propTypes = {
  content: PropTypes.string,
  subText: PropTypes.string,
  glitchText: PropTypes.string,
  isSubGlitch: PropTypes.bool,
};
GlitchTitle.defaultProps = {
  content: null,
  subText: null,
  glitchText: null,
  isSubGlitch: false,
};
