import { useTranslation } from "react-i18next";
import { renderListText } from "../../../utils/renderJsx/renderListText";

export const ContentModal = () => {
  const { t } = useTranslation();

  return (
    <article>
      <h1>{t("pages.home.modal.title")}</h1>
      <section>
        <h2>{t("pages.home.modal.content.section-1.title")}</h2>
        <p>{t("pages.home.modal.content.section-1.content")}</p>
      </section>
      <section>
        <h2>{t("pages.home.modal.content.section-2.title")}</h2>
        <ul>
          {renderListText?.(
            "pages.home.modal.content.section-2.list",
            "text",
            7,
            "home-modal"
          )}
        </ul>
      </section>
    </article>
  );
};
