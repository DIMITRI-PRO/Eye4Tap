import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useMessageContext } from "../../../../../context/MessageNotifContext";
import { useAuthContext } from "../../../../../context/AuthContext";

import { Lobby } from "../Lobby/Lobby";
import { GameZone } from "../GameZone/GameZone";
import { GameMenuModal } from "./GameMenuModal";

export const Eye4Tap = () => {
  const { responseMessage, messageStatus } = useMessageContext();
  const { t } = useTranslation();
  const { authMemo, requestAPI } = useAuthContext();
  const { id } = authMemo;

  const [displayGame, setDisplayGame] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [difficulty, setDifficulty] = useState();
  const storedDifficulty = JSON.parse(localStorage.getItem("difficulty"));

  useEffect(() => {
    setDifficulty(storedDifficulty);
  }, []);

  const postScore = async (valueScore) => {
    const body = {
      value_score: valueScore,
      id_user: id,
      id_difficulty: difficulty.id,
    };
    try {
      setDisplayGame(false);
      setRefresh(!refresh);
      const response = await requestAPI("post", `scores/${id}`, body);
      messageStatus(
        response,
        t("pages.game.messages.save-score", { score: valueScore }, 10)
      );
    } catch (error) {
      responseMessage(error);
    }
  };

  return (
    <>
      <GameMenuModal
        displayGame={displayGame}
        setDisplayGame={setDisplayGame}
      />
      {displayGame ? (
        <GameZone postScore={postScore} difficulty={difficulty} />
      ) : (
        <Lobby
          setDisplayGame={setDisplayGame}
          refresh={refresh}
          setDifficulty={setDifficulty}
          difficulty={difficulty}
        />
      )}
    </>
  );
};
