import PropTypes from "prop-types";

export const BasicMenuLayer = ({ children, footer, displayFooter }) => {
  return (
    <div className="ninja basic-layer">
      <main className="ninja basic-layer-children">{children}</main>
      {displayFooter && footer?.()}
    </div>
  );
};

BasicMenuLayer.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.func,
  displayFooter: PropTypes.bool,
};
BasicMenuLayer.defaultProps = {
  footer: null,
  displayFooter: true,
};
