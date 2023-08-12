import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../Buttons/Button";
import { Maximize, Minimize } from "../../assets/FeatherIcons";
import { enterFullscreen, exitFullscreen } from "../../utils/getFullScreen";

const ScreenButtons = ({ isFull, change }) => {
  return (
    <div className="ninja full-screen container">
      {!isFull ? (
        <Button
          onClick={() => {
            enterFullscreen();
            change(true);
          }}
          name="full-screen activated"
        >
          <Maximize />
        </Button>
      ) : (
        <Button
          onClick={() => {
            exitFullscreen();
            change(false);
          }}
          name="full-screen desactivated"
        >
          <Minimize />
        </Button>
      )}
    </div>
  );
};

ScreenButtons.propTypes = {
  isFull: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
};

export const SectionContent = ({
  pageName,
  children,
  extraContent,
  fullScreenActions,
  fullScreen,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <>
      <section
        className={`ninja section-content ${pageName} ${
          isFullScreen || fullScreen ? "full-screen" : ""
        }`}
      >
        {children}
      </section>
      {fullScreenActions && (
        <ScreenButtons isFull={isFullScreen} change={setIsFullScreen} />
      )}
      {extraContent?.()}
    </>
  );
};

SectionContent.propTypes = {
  children: PropTypes.node.isRequired,
  extraContent: PropTypes.func,
  fullScreenActions: PropTypes.bool,
  fullScreen: PropTypes.bool,
  pageName: PropTypes.string,
};
SectionContent.defaultProps = {
  extraContent: null,
  fullScreenActions: false,
  fullScreen: false,
  pageName: "",
};
