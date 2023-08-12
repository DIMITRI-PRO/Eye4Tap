import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PropTypes } from "prop-types";
import { useGameContext } from "../../../../context/GameContext";
import { Button } from "../../../../components/NinjaComp";

import Customs from "../../../../components/Customs";

const { CountDown } = Customs;

export const Lobby = ({ setDisplayGame }) => {
  const { t } = useTranslation();
  const { resumeEye } = useGameContext();
  const navigate = useNavigate();

  const [startTimer, setStartTimer] = useState(false);

  return (
    <>
      <h2 className="">{t("pages.game.start.lobby.title")}</h2>
      <CountDown
        initialTime={5}
        trigger={startTimer}
        callBack={() => setDisplayGame(true)}
      />

      <Button
        name="link-game"
        onClick={() => {
          setStartTimer(true);
          resumeEye();
        }}
      >
        {t("pages.game.start.buttons.start")}
      </Button>
      <Button
        name="link-game"
        onClick={() => {
          navigate("/game");
        }}
      >
        {t("pages.game.start.buttons.back")}
      </Button>
    </>
  );
};

Lobby.propTypes = {
  setDisplayGame: PropTypes.func.isRequired,
};
