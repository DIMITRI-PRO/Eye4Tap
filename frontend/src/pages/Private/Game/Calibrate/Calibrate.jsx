import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../../../context/GameContext";
import {
  SectionContent,
  Button,
  GridCard,
  GridZone,
  LoaderSpin,
} from "../../../../components/NinjaComp";
import {
  cardCoordStep1,
  cardCoordStep2,
} from "../../../../constant/calibrationPoints";

import { CalibrateButton } from "./CalibrateButton";
import { InstructionsModal } from "./InstructionsModal";
import { FinishCalibrateModal } from "./FinishCalibrateModal";

export const Calibrate = () => {
  const { t } = useTranslation();
  const { setupEye, pauseEye, isLoading } = useGameContext();
  const [showInstruction, setShowInstruction] = useState(false);
  const [step, setStep] = useState(0);
  const [validatePoint, setValidatePoint] = useState(0);

  const handleClick = () => {
    setValidatePoint((prev) => prev + 1);
  };

  const resetAll = () => {
    setValidatePoint(0);
    setStep(0);
  };

  useEffect(() => {
    if (validatePoint === 9) setStep(2);
    else if (validatePoint === 13) setStep(3);
  }, [validatePoint]);

  useEffect(() => {
    setupEye();

    return () => {
      pauseEye();
    };
  }, []);

  return (
    <SectionContent
      pageName={`calibrate hive ${step === 0 ? "actived" : ""}`}
      fullScreen
      fullScreenActions={false}
    >
      <LoaderSpin
        name="calibrate"
        text={t("pages.game.calibrate.loaders.camera")}
        size={50}
        display={isLoading}
      />
      <InstructionsModal
        display={showInstruction}
        onClose={() => setShowInstruction(false)}
      />
      <FinishCalibrateModal isFinish={step === 3} reStart={() => resetAll()} />
      <GridZone customClass="game-calibrate" columns={7} rows={5} gap={1}>
        {step === 1 && (
          <>
            {cardCoordStep1.map((coords, index) => {
              const idGridCard = `${index + 1}`;
              return (
                <GridCard
                  key={idGridCard}
                  gridArea={coords}
                  customClass="card-calibrate"
                >
                  <CalibrateButton onClick={handleClick} />
                </GridCard>
              );
            })}
          </>
        )}
        {step === 2 && (
          <>
            {cardCoordStep2.map((coords, index) => {
              const idGridCard = `${index + 1}`;
              return (
                <GridCard
                  key={idGridCard}
                  gridArea={coords}
                  customClass="card-calibrate"
                >
                  <CalibrateButton onClick={handleClick} />
                </GridCard>
              );
            })}
          </>
        )}
      </GridZone>
      {step === 0 && !isLoading && (
        <Button
          name="calibrate"
          disabled={isLoading}
          onClick={() => {
            setShowInstruction(true);
            setStep(1);
          }}
        >
          {t("pages.game.calibrate.buttons.start")}
        </Button>
      )}
    </SectionContent>
  );
};
