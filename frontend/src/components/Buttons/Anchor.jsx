import React from "react";
import PropTypes from "prop-types";

export const Anchor = ({ key, href, content, icon }) => {
  return (
    <a
      href={href}
      className={`ninja anchor-${key || "default"}`}
      target="_blank"
      rel="noreferrer"
    >
      {icon}
      {content}
    </a>
  );
};

Anchor.propTypes = {
  key: PropTypes.string,
  href: PropTypes.string.isRequired,
  content: PropTypes.node,
  icon: PropTypes.node,
};
Anchor.defaultProps = {
  key: null,
  content: null,
  icon: null,
};
