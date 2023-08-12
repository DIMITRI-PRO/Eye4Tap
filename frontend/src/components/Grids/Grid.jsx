import { PropTypes } from "prop-types";

const GridZone = ({
  id,
  rows,
  columns,
  gap,
  gapRow,
  gapCol,
  children,
  unit,
  customClass,
}) => {
  const gridStyle = {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridColumnGap: `${gapCol || gap || 0}${unit}`,
    gridRowGap: `${gapRow || gap || 0}${unit}`,
  };

  return (
    <div
      id={id}
      className={`ninja grid-${customClass || "basic"} parent`}
      style={rows && columns ? gridStyle : null}
    >
      {children}
    </div>
  );
};

GridZone.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  rows: PropTypes.number,
  columns: PropTypes.number,
  gap: PropTypes.number,
  gapRow: PropTypes.number,
  gapCol: PropTypes.number,
  unit: PropTypes.string,
  customClass: PropTypes.string,
};
GridZone.defaultProps = {
  id: null,
  children: null,
  rows: 1,
  columns: 1,
  gap: null,
  gapRow: null,
  gapCol: null,
  unit: "rem",
  customClass: null,
};

const GridCard = ({ gridArea, children, customClass, id }) => {
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

export const Grids = {
  GridZone,
  GridCard,
};
