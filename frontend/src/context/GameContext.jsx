import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";
import { SectionContent } from "../components/NinjaComp";

const { webgazer } = window;

export const GameContext = createContext({});

export const GameContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [switchButton, setSwitchButton] = useState(false);
  const [showGameMenu, setShowGameMenu] = useState(false);
  const [pause, setPause] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalibrate, setIsCalibrate] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });

  const handleTabEvent = (e) => e.preventDefault();

  const handleEscapeEvent = () => setShowGameMenu(true);

  const handleKeyDown = (event, callBack) => {
    if (event.key === "Tab") handleTabEvent(event);
    callBack?.(event);
  };

  const handleKeyUp = (event, callBack) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      handleEscapeEvent();
    }
    callBack?.(event);
  };

  const areaSurface = document.getElementById("area-game");

  const setupEye = async () => {
    setIsLoading(true);
    await webgazer.clearData();
    await webgazer
      .setRegression("ridge")
      .setTracker("clmtrackr")
      .showPredictionPoints(true)
      .showVideoPreview(true)
      .begin();

    setIsLoading(false);
  };

  const startEye = () => {
    webgazer.showPredictionPoints(true).showVideoPreview(false).begin();
  };

  const pauseEye = () => {
    webgazer.showPredictionPoints(false).showVideoPreview(false).pause();
  };

  const resumeEye = () => {
    webgazer
      .setGazeListener((data) => {
        if (data == null) {
          return;
        }
        setPosition({ x: data.x, y: data.y });
      })
      .showPredictionPoints(false)
      .resume();
    setPause(false);
  };

  const endEye = () => {
    webgazer.showVideoPreview(false).stopVideo().end();
    setIsCalibrate(false);
    setShowGameMenu(false);
  };

  useEffect(() => {
    if (!isCalibrate && pathname.split("/").includes("start"))
      navigate("/game");
  }, [isCalibrate, pathname]);

  return (
    <GameContext.Provider
      value={{
        setupEye,
        startEye,
        pauseEye,
        resumeEye,
        endEye,
        switchButton,
        setSwitchButton,
        areaSurface,
        showGameMenu,
        setShowGameMenu,
        pause,
        setPause,
        isLoading,
        setIsLoading,
        position,
        setPosition,
        handleKeyDown,
        handleKeyUp,
        isCalibrate,
        setIsCalibrate,
        webgazer,
      }}
    >
      <SectionContent fullScreen>{children}</SectionContent>
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useGameContext = () => useContext(GameContext);
