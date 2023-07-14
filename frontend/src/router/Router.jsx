import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { AllRoutes } from "./AllRoutes";
import { useMessageContext } from "../context/MessageNotifContext";
import { useAuthContext } from "../context/AuthContext";
import {
  BasicMenu,
  Button,
  BasicMenuLayer,
  NotificationMessage,
  FooterBar,
} from "../components/NinjaComp";
import { publicRoutes } from "../constant/publicRoutes";
import { privateRoutes } from "../constant/privateRoutes";
import { User } from "../assets/FeatherIcons";

const UserHeader = () => {
  const { authMemo } = useAuthContext();
  const { user } = authMemo;

  const title = (
    <Link to="/profile">
      {user?.picture ? (
        <img
          className="menu profile-picture"
          src={user?.picture}
          alt={user?.pseudo}
        />
      ) : (
        <User />
      )}
      {user?.pseudo}
    </Link>
  );

  if (user?.pseudo) return title;

  return null;
};

export const AuthRouter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteCookie, authMemo } = useAuthContext();
  const { displayMessage, setDisplayMessage, content, setErrors } =
    useMessageContext();
  const { isLogin, user } = authMemo;
  const [allRoutes, setAllRoutes] = useState(publicRoutes);

  useEffect(() => {
    if (isLogin) setAllRoutes([...publicRoutes, ...privateRoutes]);
    else setAllRoutes(publicRoutes);
  }, [isLogin]);

  const logOut = () => {
    deleteCookie();
    navigate("/login");
  };

  const renderExtraButtons = (isLog) =>
    isLog ? (
      <Button name="borderless danger" onClick={logOut}>
        {t("buttons.deconnexion")}
      </Button>
    ) : null;

  return (
    <>
      <BasicMenu
        userData={user}
        headers={allRoutes}
        typeMenu="only-mobile"
        extraMenuButton={renderExtraButtons(isLogin)}
        homeExtra={<UserHeader />}
      />
      <NotificationMessage
        display={displayMessage}
        setDisplay={setDisplayMessage}
        content={content}
        setErrors={setErrors}
      />
      <BasicMenuLayer footer={FooterBar}>
        <AllRoutes routes={allRoutes} />
      </BasicMenuLayer>
    </>
  );
};
