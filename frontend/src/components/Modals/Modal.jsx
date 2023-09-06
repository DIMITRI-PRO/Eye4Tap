import { useState, useEffect } from "react";
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
  withCloseButton,
  borderless,
  onValidate,
  onClose,
  onOpen,
  isOpen,
  aboveNavMenu,
}) => {
  const { t } = useTranslation();
  const [isDisplay, setIsDisplay] = useState(initialDisplay);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const modal = document.getElementById(`ninja-modal-${modalKey}`);
      if (isDisplay && !modal?.contains(event.target)) {
        if (onClose) {
          onClose();
          setIsDisplay(false);
        } else {
          setIsDisplay(false);
        }
      }
    };

    if (isOpen) {
      onOpen?.();
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDisplay, isOpen, modalKey, onClose]);

  const validateAction = () => {
    if (onValidate) {
      onValidate();
    } else {
      setIsDisplay(false);
    }
  };

  return (isDisplay || isOpen) && modalKey ? (
    <div
      id={`ninja-modal-${modalKey}-container`}
      className={`ninja modal-${customName || "default"}-background ${
        aboveNavMenu ? "above-nav" : ""
      }`}
    >
      <div
        id={`ninja-modal-${modalKey}`}
        className="ninja modal-default container"
      >
        <div className="ninja modal-default header">
          {header}
          <div className={`ninja modal-${customName || "default"} header btn`}>
            {withCloseButton && (
              <Button
                type="circle"
                onClick={() => {
                  if (onClose) {
                    onClose();
                    setIsDisplay(false);
                  } else {
                    setIsDisplay(false);
                  }
                }}
              >
                <X fontSize="1.5rem" />
              </Button>
            )}
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
  withCloseButton: PropTypes.bool,
  borderless: PropTypes.bool,
  onValidate: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  aboveNavMenu: PropTypes.bool,
};
Modal.defaultProps = {
  initialDisplay: false,
  customName: null,
  header: null,
  children: null,
  footer: null,
  withActionButtons: true,
  withCloseButton: true,
  borderless: true,
  onValidate: null,
  onOpen: null,
  onClose: null,
  isOpen: null,
  aboveNavMenu: false,
};
