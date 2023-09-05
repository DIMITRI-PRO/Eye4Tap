import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, SectionContent } from "../../../components/NinjaComp";
import Customs from "../../../components/Customs/index";
import { exitFullscreen } from "../../../utils/getFullScreen";

import { useGameContext } from "../../../context/GameContext";

const { GlitchTitle } = Customs;

export const GamePage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setShowGameMenu, isCalibrate, endEye, resumeEye, webgazer } =
    useGameContext();

  return (
    <SectionContent pageName="game hive">
      <GlitchTitle content={t("name-app.title")} />
      <ul>
        {isCalibrate && (
          <li>
            <Button
              name="link-game"
              onClick={() => {
                resumeEye();
                navigate(`${pathname}/start`);
                setShowGameMenu(false);
              }}
            >
              {t("pages.game.buttons.start-game")}
            </Button>
          </li>
        )}
        <li>
          <Button
            name="link-game"
            onClick={() => navigate(`${pathname}/calibrate`)}
          >
            {t("pages.game.buttons.calibrate")}
          </Button>
        </li>
        <li>
          <Button
            name="link-game"
            onClick={() => navigate(`${pathname}/ranking`)}
          >
            {t("pages.game.buttons.ranking")}
          </Button>
        </li>
        <li>
          <Button
            name="link-game"
            onClick={() => {
              if (isCalibrate) {
                endEye();
                navigate("/");
                webgazer.stopVideo(true);
              } else {
                navigate("/");
              }
              exitFullscreen();
            }}
          >
            {t("pages.game.buttons.exit-game")}
          </Button>
        </li>
      </ul>
    </SectionContent>
  );
};
