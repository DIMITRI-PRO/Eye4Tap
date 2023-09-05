import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useGameContext } from "../../../../../context/GameContext";

import { Button, Modal } from "../../../../../components/NinjaComp";

export const GameMenuModal = ({ displayGame, setDisplayGame }) => {
  const navigate = useNavigate();
  const { pauseEye, resumeEye, showGameMenu, setShowGameMenu, setPause } =
    useGameContext();
  const { t } = useTranslation();

  return (
    <Modal
      modalKey="game-menu"
      initialDisplay={false}
      isOpen={showGameMenu}
      onOpen={() => {
        pauseEye();
        setPause(true);
      }}
      withCloseButton={false}
      withActionButtons={false}
      aboveNavMenu
    >
      <ul>
        <li>
          <Button
            name="link-game"
            onClick={() => {
              resumeEye();
              setPause(false);
              setShowGameMenu(false);
            }}
          >
            {t("pages.game.buttons.resume-game")}
          </Button>
        </li>
        {displayGame && (
          <li>
            <Button
              name="link-game"
              onClick={() => {
                resumeEye();
                setPause(false);
                setShowGameMenu(false);
                setDisplayGame(false);
              }}
            >
              {t("pages.game.buttons.lobby")}
            </Button>
          </li>
        )}
        <li>
          <Button
            name="link-game"
            onClick={() => {
              pauseEye();
              navigate("/game");
            }}
          >
            {t("pages.game.buttons.exit-game")}
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

GameMenuModal.propTypes = {
  displayGame: PropTypes.bool,
  setDisplayGame: PropTypes.func,
};
GameMenuModal.defaultProps = {
  displayGame: null,
  setDisplayGame: () => {},
};
