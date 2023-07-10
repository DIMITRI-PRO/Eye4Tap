import PropTypes from "prop-types";

export const BasicMenuLayer = ({ children, footer }) => {
  return (
    <div className="ninja basic-layer">
      <main className="ninja basic-layer-children">{children}</main>
      {footer?.()}
    </div>
  );
};

BasicMenuLayer.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.func,
};
BasicMenuLayer.defaultProps = {
  footer: null,
};
