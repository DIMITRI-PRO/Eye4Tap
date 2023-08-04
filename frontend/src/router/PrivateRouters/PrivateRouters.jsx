import { Route } from "react-router-dom";
import { Profile, NotFound } from "../../pages/index";
import { GameRouter } from "./Game/GameRouter";
import { useAuthContext } from "../../context/AuthContext";

export const PrivateRouter = () => {
  const { authMemo } = useAuthContext();
  const { isLogin } = authMemo;

  return (
    isLogin && (
      <>
        <Route path="/profile" element={<Profile />} />
        <Route path="/game/*" element={<GameRouter />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
};
