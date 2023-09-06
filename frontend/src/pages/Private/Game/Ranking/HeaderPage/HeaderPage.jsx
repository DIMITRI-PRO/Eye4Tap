import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button, Select } from "../../../../../components/NinjaComp";
import { ArrowLeftCircle } from "../../../../../assets/FeatherIcons";

export const HeaderPage = ({ difficulties, setRefresh, setDifficulty }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="ranking-list header">
      <Button
        name="link"
        onClick={() => navigate("/game")}
        icon={<ArrowLeftCircle />}
      >
        {t("pages.game.buttons.back-menu")}
      </Button>
      <h1>{t("pages.game.ranking.title")}</h1>
      {difficulties?.length && (
        <Select
          id="lobby-difficulty"
          label="Difficulté : "
          initialLabel="select difficulties..."
          options={difficulties.map((item) => ({
            value: item,
            label: t(`settings.difficulty.${item.name}`),
            key: item.id,
          }))}
          onChange={(selectedDifficulty) => {
            setDifficulty(selectedDifficulty);
            setRefresh((prev) => !prev);
          }}
        />
      )}
    </div>
  );
};

HeaderPage.propTypes = {
  difficulties: PropTypes.arrayOf(PropTypes.shape({})),
  setRefresh: PropTypes.func,
  setDifficulty: PropTypes.func,
};

HeaderPage.defaultProps = {
  difficulties: [],
  setRefresh: () => {},
  setDifficulty: () => {},
};
