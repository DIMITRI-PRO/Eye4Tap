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
    <SectionContent fullScreenActions>
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
      {isLogin && (
        <Button
          onClick={() => {
            navigate("/game");
          }}
        >
          {t("home.buttons.start")}
        </Button>
      )}
    </SectionContent>
  );
};
