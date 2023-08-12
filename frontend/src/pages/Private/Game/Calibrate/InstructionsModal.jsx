import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../../components/NinjaComp";

import { renderListText } from "../../../../utils/renderJsx/renderListText";

export const InstructionsModal = ({ display, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      modalKey="instruction-game"
      borderless
      initialDisplay={false}
      isOpen={display}
      onClose={onClose}
      withActionButtons={false}
      aboveNavMenu
    >
      <h2>{t("pages.game.calibrate.modal.title")}</h2>
      <ol>
        {renderListText?.(
          "pages.game.calibrate.modal.list",
          "text",
          5,
          "pages.game"
        )}
      </ol>
      <p>{t("pages.game.calibrate.modal.message")}</p>
    </Modal>
  );
};

InstructionsModal.propTypes = {
  display: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
