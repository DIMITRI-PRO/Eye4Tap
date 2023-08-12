import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useMessageContext } from "../../../../context/MessageNotifContext";
import { useAuthContext } from "../../../../context/AuthContext";
import { useGameContext } from "../../../../context/GameContext";

import { Button, Modal } from "../../../../components/NinjaComp";

import { Lobby } from "./Lobby";
import { GameZone } from "./GameZone";

export const Eye4Tap = () => {
  const { responseMessage } = useMessageContext();
  const navigate = useNavigate();
  const { pauseEye, resumeEye, showGameMenu, setShowGameMenu, setPause } =
    useGameContext();
  const { t } = useTranslation();
  const { authMemo, requestAPI } = useAuthContext();
  const { id } = authMemo;

  const [displayGame, setDisplayGame] = useState(false);

  const postScore = async (valueScore) => {
    const body = {
      value_score: valueScore,
      id_user: id,
    };
    try {
      await requestAPI("post", `scores/${id}`, body);
    } catch (error) {
      responseMessage(error);
    }
  };

  return (
    <>
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
              onClick={() => {
                resumeEye();
                setPause(false);
                setShowGameMenu(false);
              }}
            >
              {t("pages.game.buttons.resume-game")}
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                navigate("/game");
              }}
            >
              {t("pages.game.buttons.exit-game")}
            </Button>
          </li>
        </ul>
      </Modal>
      {displayGame ? (
        <GameZone postScore={postScore} isGameOn={displayGame} />
      ) : (
        <Lobby setDisplayGame={setDisplayGame} />
      )}
    </>
  );
};
