import { useTranslation } from "react-i18next";
import { Github, LinkedIn } from "../../assets/FeatherIcons";

export const FooterBar = () => {
  const { t } = useTranslation();
  return (
    <footer className="ninja footer-container">
      <div className="ninja footer-main-content">
        <ul id="footer-list-url">
          <li>
            <a
              href="https://github.com/CHOUMMANIVONGDimitri/Eye4Tap-version1.0"
              target="_blank"
              rel="noreferrer"
            >
              <Github /> Github EYE4TAP
            </a>
          </li>
          <li>
            <a
              href="https://webgazer.cs.brown.edu/"
              target="_blank"
              rel="noreferrer"
            >
              WebGazerAPI
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/dimitri-choummanivong-507669228/"
              className=""
            >
              <LinkedIn /> LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/DIMITRI-PRO/Ninja-Template"
              target="_blank"
              rel="noreferrer"
            >
              <Github /> Template Repo.
            </a>
          </li>
        </ul>
      </div>
      <hr id="footer-separator" className="ninja separator" />
      <span className="ninja footer right-reserved">
        {t("footer.text-rights", {
          app: "Eye-4-Tap",
          version: "alpha 1.0",
          name: "CHOUMMANIVONG X. Dimitri",
          corp: "KUROTSUME",
        })}
      </span>
    </footer>
  );
};
