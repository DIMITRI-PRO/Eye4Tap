import PropTypes from "prop-types";
import { Button } from "../Buttons/Button";
import { ProgressBar } from "../Progress/ProgressBar";
import { X, AlertCircle, CheckCircle } from "../../assets/FeatherIcons";

export const NotificationMessage = ({
  duration,
  type,
  display,
  setDisplay,
  content,
  setErrors,
}) => {
  return (
    content &&
    display && (
      <div
        id="notif-message"
        className="ninja notif-message"
        style={{ animation: `fadeRight ${duration}s ease-out` }}
      >
        <div className="ninja notif-close">
          <Button name="circle" onClick={() => setDisplay(false)}>
            <X />
          </Button>
        </div>
        {content && (
          <div className="ninja notif-content">
            {type === "fail" && (
              <AlertCircle
                width="1.1rem"
                height="1.1rem"
                className={`ninja notif-logo ${type}`}
              />
            )}
            {type === "succes" && (
              <CheckCircle
                width="1.1rem"
                height="1.1rem"
                className={`ninja notif-logo ${type}`}
              />
            )}
            <span>{content}</span>
          </div>
        )}
        <ProgressBar
          duration={duration}
          action={() => {
            setDisplay(!display);
            setErrors([]);
          }}
        />
      </div>
    )
  );
};

NotificationMessage.propTypes = {
  display: PropTypes.bool,
  setDisplay: PropTypes.func,
  setErrors: PropTypes.func,
  content: PropTypes.string,
  type: PropTypes.string,
  duration: PropTypes.number,
};

NotificationMessage.defaultProps = {
  display: false,
  setDisplay: () => {},
  setErrors: () => {},
  content: "",
  type: "default",
  duration: 5,
};
