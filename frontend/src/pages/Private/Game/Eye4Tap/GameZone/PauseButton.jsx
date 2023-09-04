// import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../../components/NinjaComp";
import { PauseCircle } from "../../../../../assets/FeatherIcons";

export const PauseButton = ({ isPause, onClick }) => {
  const { t } = useTranslation();

  return (
    <Button
      name={`pause ${isPause ? "hidden" : ""}`}
      disabled={isPause}
      onClick={onClick}
      icon={<PauseCircle />}
    >
      <>
        <span className="mobile">
          {t("pages.game.start.game-zone.pause-m")}
        </span>
        <span className="desktop">
          {t("pages.game.start.game-zone.pause-d")}
        </span>
      </>
    </Button>
  );
};
