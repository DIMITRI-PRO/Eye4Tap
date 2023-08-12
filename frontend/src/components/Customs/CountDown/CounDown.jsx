// import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { Button } from "../../Buttons/Button";

export const CountDown = ({
  id,
  initialTime,
  trigger,
  callBack,
  timeLeftWarn,
  withStartAction,
  withResetAction,
  withFormat,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;

    if (timeLeft < 0) {
      callBack?.();
      clearInterval(interval);
      handleReset();
    } else if ((isActive || trigger) && timeLeft >= 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, trigger]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div id={id} className="ninja countdown container">
      <h1
        className={`ninja countdown child title ${
          timeLeft <= timeLeftWarn ? "warn" : ""
        }`}
      >
        {withFormat ? formatTime(timeLeft) : timeLeft}
      </h1>

      {withStartAction && (
        <Button onClick={handleStartStop}>{isActive ? "Stop" : "Start"}</Button>
      )}
      {withResetAction && <Button onClick={handleReset}>Reset</Button>}
    </div>
  );
};

CountDown.propTypes = {
  id: PropTypes.string,
  initialTime: PropTypes.number.isRequired,
  timeLeftWarn: PropTypes.number,
  trigger: PropTypes.bool,
  callBack: PropTypes.func,
  withStartAction: PropTypes.bool,
  withResetAction: PropTypes.bool,
  withFormat: PropTypes.bool,
};
CountDown.defaultProps = {
  id: null,
  trigger: true,
  timeLeftWarn: 0,
  callBack: () => {},
  withStartAction: false,
  withResetAction: false,
  withFormat: false,
};
