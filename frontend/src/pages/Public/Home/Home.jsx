import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Customs from "../../../components/Customs/index";
import { Modal, SectionContent, Button } from "../../../components/NinjaComp";
import { useAuthContext } from "../../../context/AuthContext";
import { ContentModal } from "./ContentModal";

const { GlitchTitle } = Customs;

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { authMemo } = useAuthContext();
  const { isLogin } = authMemo;

  return (
    <SectionContent pageName="home hive">
      <Modal
        modalKey="home"
        borderless
        initialDisplay={!isLogin}
        withActionButtons={false}
      >
        <ContentModal />
      </Modal>
      <GlitchTitle
        content={t("name-app.title")}
        subText={t("name-app.sub-title")}
        isSubGlitch
      />
      {isLogin ? (
        <Button
          name="link-game"
          onClick={() => {
            navigate("/game");
          }}
        >
          {t("pages.home.buttons.start")}
        </Button>
      ) : (
        <Button
          name="link-game"
          onClick={() => {
            navigate("/login");
          }}
        >
          {t("pages.home.buttons.login")}
        </Button>
      )}
    </SectionContent>
  );
};
