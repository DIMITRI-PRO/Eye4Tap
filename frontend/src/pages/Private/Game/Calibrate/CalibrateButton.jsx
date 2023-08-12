import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../../../../components/NinjaComp";
import { Hexagon } from "../../../../assets/FeatherIcons";

export const CalibrateButton = ({ onClick, sizePoints }) => {
  const [size, setSize] = useState(sizePoints);

  const handleClick = () => {
    if (size === 0) return;
    setSize((prev) => prev - 10);
    if (size === 10) onClick?.();
  };

  return (
    <Button onClick={handleClick} name="calibrate-point">
      <Hexagon
        width={size !== 0 ? size : sizePoints}
        height={size !== 0 ? size : sizePoints}
        style={{
          color: size === 0 ? "#2dffed" : "#17464b",
        }}
      />
    </Button>
  );
};

CalibrateButton.propTypes = {
  sizePoints: PropTypes.number,
  onClick: PropTypes.func,
};
CalibrateButton.defaultProps = {
  sizePoints: 30,
  onClick: null,
};
