import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  BasicMenu,
  Button,
  BasicMenuLayer,
  FooterBar,
} from "../components/NinjaComp";
import { publicRoutes } from "../constant/publicRoutes";
import { privateRoutes } from "../constant/privateRoutes";
import { PrivateRouter } from "./PrivateRouters/PrivateRouters";
import { NotFound, Home, Register, Login } from "../pages/index";
import { UserHeader } from "../components/Customs/UserHeader/UserHeader";
import { LogOut } from "../assets/FeatherIcons";

export const AuthRouter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteCookie, authMemo, displayFooter } = useAuthContext();
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
      <Button name="borderless danger" icon={<LogOut />} onClick={logOut}>
        {t("buttons.deconnexion")}
      </Button>
    ) : null;

  return (
    <>
      <BasicMenu
        userData={user}
        headers={allRoutes}
        icon={<span id="title-home-link">EYE 4 TAP</span>}
        typeMenu="only-mobile"
        extraMenuButton={renderExtraButtons(isLogin)}
        homeExtra={<UserHeader />}
      />

      <BasicMenuLayer footer={FooterBar} displayFooter={displayFooter}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {PrivateRouter()}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BasicMenuLayer>
    </>
  );
};
