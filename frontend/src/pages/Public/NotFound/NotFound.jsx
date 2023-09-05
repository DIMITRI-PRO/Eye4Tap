import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SectionContent, Button } from "../../../components/NinjaComp";
import Customs from "../../../components/Customs/index";
import { AlertTriangle } from "../../../assets/FeatherIcons";

const { GlitchTitle } = Customs;

export const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SectionContent pageName="not-found hive">
      <AlertTriangle width="5rem" height="5rem" />
      !!! unknown page
      <GlitchTitle
        content={t("pages.not-found.title")}
        subText={t("pages.not-found.sub-title")}
        isSubGlitch
      />
      <Button
        name="link-game"
        onClick={() => {
          navigate("/");
        }}
      >
        {t("pages.not-found.buttons.home")}
      </Button>
    </SectionContent>
  );
};
