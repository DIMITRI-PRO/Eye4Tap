import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../../../context/GameContext";
import { Button, Modal } from "../../../../components/NinjaComp";

export const FinishCalibrateModal = ({ isFinish, reStart }) => {
  const { t } = useTranslation();
  const { setupEye, pauseEye, setIsCalibrate } = useGameContext();
  const navigate = useNavigate();
  return (
    <Modal
      modalKey="calibrage-finish"
      borderless
      initialDisplay={false}
      isOpen={isFinish}
      withActionButtons={false}
      withCloseButton={false}
      aboveNavMenu
    >
      {t("pages.game.calibrate.finish-modal.title")}
      <div>
        <Button
          name="link-game"
          onClick={() => {
            reStart();
            setIsCalibrate(false);
            setupEye();
          }}
        >
          {t("pages.game.calibrate.finish-modal.buttons.restart")}
        </Button>
        <Button
          name="link-game"
          onClick={() => {
            pauseEye();
            setIsCalibrate(true);
            navigate("/game");
          }}
        >
          {t("pages.game.calibrate.finish-modal.buttons.done")}
        </Button>
      </div>
    </Modal>
  );
};

FinishCalibrateModal.propTypes = {
  isFinish: PropTypes.bool.isRequired,
  reStart: PropTypes.func,
};
FinishCalibrateModal.defaultProps = {
  reStart: null,
};
