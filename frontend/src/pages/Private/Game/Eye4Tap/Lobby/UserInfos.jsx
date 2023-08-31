/* eslint-disable react/prop-types */
import moment from "moment";
import { useTranslation } from "react-i18next";
import { LoaderSpin } from "../../../../../components/NinjaComp";
import { User, ChevronRight } from "../../../../../assets/FeatherIcons";

export const UserInfos = ({ user, scores }) => {
  const { t } = useTranslation();

  return (
    <div id="user-infos">
      <div className="user-infos-header">
        <User width="4rem" height="4rem" />
        <h3 className="user-infos-pseudo">{user?.pseudo || "Anonymous"}</h3>
      </div>
      <div className="user-infos-hover-text">
        <ChevronRight id="user-infos-chevron" />
        <span className="text">
          {t("pages.game.start.lobby.user-card.score")}
        </span>
      </div>
      <div className="user-infos-scores">
        <h3>{t("pages.game.start.lobby.user-card.title")}</h3>
        {scores ? (
          <ul>
            {scores?.map((score) => (
              <li key={score.id}>
                {t("pages.game.start.lobby.user-card.points", {
                  score: score.value_score,
                  date: moment(score.created_at).format("DD/MM/YYYY"),
                  difficulty: t(`settings.difficulty.${score.name}`),
                })}
              </li>
            ))}
          </ul>
        ) : (
          <LoaderSpin size={25} />
        )}
      </div>
    </div>
  );
};
