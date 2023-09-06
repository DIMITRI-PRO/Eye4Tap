import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useGameContext } from "../../../../../context/GameContext";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useMessageContext } from "../../../../../context/MessageNotifContext";
import {
  Button,
  SectionContent,
  Select,
} from "../../../../../components/NinjaComp";
import { Play, CornerDownLeft } from "../../../../../assets/FeatherIcons";

import Customs from "../../../../../components/Customs";
import { UserInfos } from "./UserInfos";

const { CountDown } = Customs;

export const Lobby = ({
  setDisplayGame,
  refresh,
  setDifficulty,
  difficulty,
}) => {
  const { t } = useTranslation();
  const { authMemo, requestAPI } = useAuthContext();
  const { user, id } = authMemo;
  const { responseMessage } = useMessageContext();
  const { pauseEye } = useGameContext();
  const navigate = useNavigate();

  const [startTimer, setStartTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topScores, setTopScores] = useState();
  const [difficulties, setDifficulties] = useState();

  const getDifficulties = async () => {
    try {
      const { data } = await requestAPI("difficulties");

      setDifficulties(data);
    } catch (error) {
      responseMessage(error);
    }
  };

  const getUserTopScore = async () => {
    try {
      const { data } = await requestAPI(`scores/${id}`);
      setTopScores(data);
    } catch (error) {
      responseMessage(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUserTopScore();
      getDifficulties();
    }
  }, [id, refresh]);

  useEffect(() => {
    if (difficulties) {
      const findDifficulty = difficulties?.find(
        (el) => el?.id === difficulty?.id
      );
      if (findDifficulty) setDifficulty(findDifficulty);
      else setDifficulty(difficulties[0]);
    }
  }, [difficulties]);

  return (
    <SectionContent pageName="lobby hive">
      {!startTimer && <UserInfos user={user} scores={topScores} />}
      {startTimer ? (
        <CountDown
          initialTime={5}
          trigger={startTimer}
          callBack={() => {
            setIsLoading(false);
            setDisplayGame(true);
          }}
        />
      ) : (
        <h2 className="lobby-title">{t("pages.game.start.lobby.title")}</h2>
      )}
      {difficulties?.length && !startTimer && (
        <Select
          id="lobby-difficulty"
          label={t(`settings.difficulty.title`)}
          initialLabel={t(`settings.difficulty.${difficulty?.name}`)}
          options={difficulties.map((item) => ({
            value: item,
            label: t(`settings.difficulty.${item.name}`),
            key: item.id,
          }))}
          onChange={(selectedDifficulty) => {
            localStorage.setItem(
              "difficulty",
              JSON.stringify(selectedDifficulty)
            );
            setDifficulty(selectedDifficulty);
          }}
          noClear
        />
      )}
      <div className="ninja lobby-menu hexa">
        <Button
          name="link-game"
          icon={<Play />}
          disabled={!difficulty}
          onClick={() => {
            setIsLoading(true);
            setStartTimer(true);
          }}
          isLoading={isLoading}
        >
          {t("pages.game.buttons.start")}
        </Button>
        <Button
          disabled={isLoading}
          name="link-game"
          icon={<CornerDownLeft />}
          onClick={() => {
            pauseEye();
            navigate("/game");
          }}
        >
          {t("pages.game.buttons.back")}
        </Button>
      </div>
    </SectionContent>
  );
};

Lobby.propTypes = {
  setDisplayGame: PropTypes.func.isRequired,
  setDifficulty: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
  difficulty: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
};
Lobby.defaultProps = {
  difficulty: null,
};
