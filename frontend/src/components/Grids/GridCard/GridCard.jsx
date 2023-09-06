import React from "react";
import { PropTypes } from "prop-types";

export const GridCard = ({ gridArea, children, customClass, id }) => {
  let zone = "";

  if (gridArea) zone = gridArea.join("/");

  const divStyle = {
    gridArea: zone,
  };

  return (
    <div
      id={id}
      className={`ninja grid-${customClass || "basic"} child`}
      style={gridArea ? divStyle : null}
      data-testid={id}
    >
      {children}
    </div>
  );
};

GridCard.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  gridArea: PropTypes.arrayOf(PropTypes.number),
  customClass: PropTypes.string,
};
GridCard.defaultProps = {
  id: null,
  children: null,
  gridArea: [],
  customClass: null,
};
