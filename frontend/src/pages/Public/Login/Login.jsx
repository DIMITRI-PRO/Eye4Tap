import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMessageContext } from "../../../context/MessageNotifContext";
import { useAuthContext } from "../../../context/AuthContext";
import {
  Form,
  FormItem,
  Button,
  Input,
  SectionContent,
} from "../../../components/NinjaComp";

export const Login = () => {
  const { t } = useTranslation();
  const { requestAPI, setIsLogin, setUser } = useAuthContext();
  const { responseMessage } = useMessageContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (datas) => {
    setIsLoading(true);
    try {
      const body = datas;
      const { data } = await requestAPI("post", "login", body);

      if (data) {
        setIsLogin(true);
        setUser(data);
        navigate("/");
      }
    } catch (e) {
      responseMessage(e);
    }
    setIsLoading(false);
  };

  return (
    <SectionContent pageName="login">
      <h1>{t("login.title")}</h1>
      <Form onSubmit={onSubmit}>
        <FormItem
          label={t("login.label.email")}
          type="email"
          dataName="email"
          required
        />
        <FormItem
          label={t("login.label.password")}
          dataName="password"
          required
        >
          <Input type="password" />
        </FormItem>
        <Button type="submit" name="link-game" isLoading={isLoading}>
          {t("buttons.login-submit")}
        </Button>
        <div className="other-links">
          <Link to="/register">{t("buttons.create-account")}</Link>
          {/* TO DO : Forgetten password */}
        </div>
      </Form>
    </SectionContent>
  );
};
