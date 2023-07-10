import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Button } from "../Buttons/Button";
import { X } from "../../assets/FeatherIcons";

export const Modal = ({
  children,
  initialDisplay,
  modalKey,
  header,
  footer,
  customName,
  withActionButtons,
  borderless,
  onValidate,
}) => {
  const { t } = useTranslation();
  const [isDisplay, setIsDisplay] = useState(initialDisplay || false);

  const validateAction = () => {
    if (onValidate) onValidate();
    else setIsDisplay(false);
  };

  document.addEventListener("click", (event) => {
    const modal = document.getElementById(`ninja-modal-${modalKey}`);
    if (isDisplay && !modal?.contains(event.target)) setIsDisplay(false);
  });

  return isDisplay && modalKey ? (
    <div className={`ninja modal-${customName || "default"}-background`}>
      <div
        id={`ninja-modal-${modalKey}`}
        className="ninja modal-default container"
      >
        <div className="ninja modal-default header">
          {header}
          <div className={`ninja modal-${customName || "default"} header btn`}>
            <Button type="close" icon={X} onClick={() => setIsDisplay(false)} />
          </div>
        </div>
        {!borderless && (
          <hr className={`ninja modal-${customName || "default"} separation`} />
        )}
        <div className={`ninja modal-${customName || "default"} body`}>
          {children}
        </div>
        {!borderless && (
          <hr className={`ninja modal-${customName || "default"} separation`} />
        )}
        <div className={`ninja modal-${customName || "default"} footer`}>
          {footer}
          {withActionButtons && (
            <div className={`ninja modal-${customName || "default"} buttons`}>
              <Button type="cancel" onClick={() => setIsDisplay(false)}>
                {t(`ninja.modal-default.buttons.cancel`)}
              </Button>
              <Button type="validate" onClick={validateAction}>
                {t(`ninja.modal-default.buttons.validate`)}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

Modal.propTypes = {
  modalKey: PropTypes.string.isRequired,
  customName: PropTypes.string,
  initialDisplay: PropTypes.bool,
  header: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  withActionButtons: PropTypes.bool,
  borderless: PropTypes.bool,
  onValidate: PropTypes.func,
};
Modal.defaultProps = {
  initialDisplay: false,
  customName: null,
  header: null,
  children: null,
  footer: null,
  withActionButtons: true,
  borderless: true,
  onValidate: null,
};
