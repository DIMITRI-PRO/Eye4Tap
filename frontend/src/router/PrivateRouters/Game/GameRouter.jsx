import React from "react";
import { Route, Routes } from "react-router-dom";
import { GameContextProvider } from "../../../context/GameContext";
import { GamePage, NotFound } from "../../../pages/index";
import { Eye4Tap } from "../../../pages/Private/Game/Eye4Tap/Eye4tap/Eye4tap";
import { Calibrate } from "../../../pages/Private/Game/Calibrate/Calibrate";
import { Ranking } from "../../../pages/Private/Game/Ranking/Ranking";

export const GameRouter = () => {
  return (
    <GameContextProvider>
      <Routes>
        <Route path="/calibrate/*" element={<Calibrate />} />
        <Route path="/ranking/*" element={<Ranking />} />
        <Route path="/start/*" element={<Eye4Tap />} />
        <Route path="/" element={<GamePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GameContextProvider>
  );
};
