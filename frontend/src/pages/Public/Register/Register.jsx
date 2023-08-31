import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useMessageContext } from "../../../context/MessageNotifContext";
import { useAuthContext } from "../../../context/AuthContext";
import {
  Form,
  FormItem,
  Button,
  Input,
  SectionContent,
} from "../../../components/NinjaComp";

export const Register = () => {
  const { t } = useTranslation();
  const { responseMessage, errors } = useMessageContext();
  const navigate = useNavigate();
  const { requestAPI } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (datas) => {
    setIsLoading(true);
    try {
      const body = datas;
      await requestAPI("post", "register", body);
      navigate("/login");
    } catch (error) {
      responseMessage(error);
    }
    setIsLoading(false);
  };

  return (
    <SectionContent pageName="register">
      <h1>{t("register.title")}</h1>
      <Form onSubmit={onSubmit} errors={errors}>
        <FormItem
          label={t("register.label.lastname")}
          type="text"
          dataName="lastname"
          required
        />
        <FormItem
          label={t("register.label.firstname")}
          type="text"
          dataName="firstname"
          required
        />
        <FormItem
          label={t("register.label.email")}
          type="email"
          dataName="email"
          required
        />
        <FormItem
          label={t("register.label.pseudo")}
          type="text"
          dataName="pseudo"
          required
        />
        <FormItem
          label={t("register.label.password")}
          dataName="password"
          required
        >
          <Input type="password" />
        </FormItem>
        <Button type="submit" name="link-game" isLoading={isLoading}>
          {t("buttons.register-submit")}
        </Button>
        <Link to="/login">{t("buttons.already-account")}</Link>
      </Form>
    </SectionContent>
  );
};
