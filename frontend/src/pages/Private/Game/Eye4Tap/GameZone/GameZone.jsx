import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import {
  GridCard,
  GridZone,
  SectionContent,
} from "../../../../../components/NinjaComp";
import Customs from "../../../../../components/Customs";
import { useGameContext } from "../../../../../context/GameContext";
import { ComboBar } from "./ComboBar";

const { CountDown } = Customs;

export const GameZone = ({ postScore, difficulty }) => {
  const { t } = useTranslation();
  const {
    position,
    setPosition,
    areaSurface,
    handleKeyUp,
    handleKeyDown,
    pause,
  } = useGameContext();
  const [currentArea, setCurrentArea] = useState(null);
  const [eyePos, setEyePos] = useState(null);
  const [press, setPress] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [errorCount, setErrorCount] = useState(5);

  const handleSpaceEvent = (event) => {
    if (
      (event.keyCode === 32 || event.code === "Space") &&
      event.type === "keyup"
    ) {
      setPress((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) =>
      setPosition({ x: e.x, y: e.y })
    );

    document.addEventListener("keydown", (e) =>
      handleKeyDown(e, handleSpaceEvent)
    );
    document.addEventListener("keyup", (e) => handleKeyUp(e, handleSpaceEvent));

    return () => {
      document.removeEventListener("keydown", (e) =>
        handleKeyDown(e, handleSpaceEvent)
      );
      document.removeEventListener("keyup", (e) =>
        handleKeyUp(e, handleSpaceEvent)
      );
    };
  }, []);

  useEffect(() => {
    let timerId = null;
    if (!pause) {
      timerId = setInterval(() => {
        setCurrentArea(() => Math.floor(Math.random() * 4) + 1);
      }, difficulty.speed * 1000);
    }
    return () => clearInterval(timerId);
  }, [pause]);

  useEffect(() => {
    const checkEyePositionOnArea = () => {
      const areaWidth = areaSurface?.clientWidth;
      const areaHeight = areaSurface?.clientHeight;

      const isTop = position.y < areaHeight / 2;
      const isLeft = position.x < areaWidth / 2;

      switch (true) {
        case isTop && isLeft:
          setEyePos(1);
          break;
        case isTop && !isLeft:
          setEyePos(2);
          break;
        case !isTop && isLeft:
          setEyePos(3);
          break;
        case !isTop && !isLeft:
          setEyePos(4);
          break;
        default:
          console.warn("Zone inconnue");
      }
    };

    checkEyePositionOnArea();
  }, [position, areaSurface]);

  const calculateCombo = (value, coef) => {
    if (score - difficulty.malus_point >= 0)
      setScore((prev) => prev - difficulty.malus_point);

    if (errorCount <= 0) {
      setScore((prev) => Number((prev + value * coef).toFixed(0)));
      setCombo(0);
      setErrorCount(5);
    } else {
      setErrorCount((prev) => prev - 1);
    }
  };

  const checkEyeWithCurrent = useCallback(
    (curr, pos) => {
      if (curr === pos) {
        setScore((prev) => prev + 1);
        setCombo((prev) => prev + 1);
      } else calculateCombo(combo, difficulty.coef_point);
    },
    [press]
  );

  useEffect(() => {
    if (!pause) checkEyeWithCurrent(currentArea, eyePos);
  }, [checkEyeWithCurrent]);

  const resultGame = () => {
    const bonus = combo * difficulty.coef_point;
    const result = score + bonus;
    postScore(result);
  };

  return (
    <SectionContent pageName="game-zone hive">
      <h2 id="game-zone-score">
        {t("pages.game.start.game-zone.score", { score })}
      </h2>
      <ComboBar
        id="game-zone"
        coef={10}
        combo={combo}
        countDisplay={5}
        vertical
      />
      <CountDown
        id="count-down-game"
        initialTime={difficulty.time}
        timeLeftWarn={5}
        trigger={!pause}
        callBack={resultGame}
        withFormat
      />
      <GridZone
        id="area-game"
        customClass="game-zone"
        columns={2}
        rows={2}
        gap={0.5}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const gridIndex = index + 1;
          return (
            <GridCard
              key={gridIndex}
              id={`card-zone-${gridIndex}`}
              customClass={`card-zone ${gridIndex} ${
                currentArea === gridIndex
                  ? `selected${eyePos === gridIndex ? "-eye" : ""}`
                  : `${eyePos === gridIndex ? "eye" : ""}`
              }`}
            />
          );
        })}
      </GridZone>
    </SectionContent>
  );
};

GameZone.propTypes = {
  postScore: PropTypes.func.isRequired,
  difficulty: PropTypes.shape({
    malus_point: PropTypes.number,
    coef_point: PropTypes.number,
    speed: PropTypes.number,
    time: PropTypes.number,
  }).isRequired,
};
