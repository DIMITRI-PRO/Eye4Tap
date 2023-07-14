import { useTranslation } from "react-i18next";
import Customs from "../../../components/Customs/index";
import { Modal, SectionContent } from "../../../components/NinjaComp";
import { ContentModal } from "./ContentModal";

const { GlitchTitle } = Customs;

export const Home = () => {
  const { t } = useTranslation();

  return (
    <SectionContent fullScreen>
      <Modal
        modalKey="home"
        borderless
        initialDisplay
        withActionButtons={false}
      >
        <ContentModal />
      </Modal>
      <GlitchTitle
        content={t("name-app.title")}
        subText={t("name-app.sub-title")}
        isSubGlitch
      />
    </SectionContent>
  );
};
