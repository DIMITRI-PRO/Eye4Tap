import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import React, { createContext, useContext, useState } from "react";

import { NotificationMessage } from "../components/NinjaComp";

export const NotifMessageContext = createContext({});

export const NotifMessageProvider = ({ children }) => {
  const { t } = useTranslation();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [type, setType] = useState("default");
  const [duration, setDuration] = useState(5);

  const messageStatus = ({ status }, contents = null, s = 5) => {
    if (contents) setContent(contents);
    else setContent(t(`message.status.${status || "default"}`));
    if (s > 1) setDuration(s);
    switch (status !== false) {
      case status.toString().startsWith("2"):
        setType("succes");
        break;
      case status.toString().startsWith("4"):
        setType("fail");
        break;

      default:
        setType("default");
        break;
    }
    return setDisplayMessage(true);
  };

  const responseMessage = ({ message, response }) => {
    const { validationErrors } = response.data;
    if (!displayMessage && message) {
      setContent(message);
      setDisplayMessage(true);
    }
    if (response?.status.toString().startsWith("4")) setType("fail");
    if (validationErrors && response?.status === 422) {
      setErrors(validationErrors);
      return response.data;
    }
    return null;
  };

  return (
    <NotifMessageContext.Provider
      value={{
        messageStatus,
        responseMessage,
        displayMessage,
        setDisplayMessage,
        content,
        setContent,
        errors,
        setErrors,
      }}
    >
      <NotificationMessage
        duration={duration}
        type={type}
        display={displayMessage}
        setDisplay={setDisplayMessage}
        content={content}
        setErrors={setErrors}
      />
      {children}
    </NotifMessageContext.Provider>
  );
};

NotifMessageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useMessageContext = () => useContext(NotifMessageContext);
