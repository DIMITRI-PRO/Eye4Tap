import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMessageContext } from "../../../context/MessageNotifContext";
import { useAuthContext } from "../../../context/AuthContext";
import {
  Form,
  FormItem,
  Button,
  SectionContent,
} from "../../../components/NinjaComp";

export const Profile = () => {
  const { t } = useTranslation();
  const { responseMessage, messageStatus } = useMessageContext();
  const { requestAPI, authMemo, setUser } = useAuthContext();
  const { id, user } = authMemo;

  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async (body) => {
    setIsLoading(true);
    try {
      const data = await requestAPI("patch", `users/${id}`, body);

      setUser((prev) => {
        return { ...prev, ...body };
      });
      messageStatus(data);
    } catch (e) {
      responseMessage(e);
    }
    setIsLoading(false);
  };

  return (
    id && (
      <SectionContent pageName="profile">
        <h1>{t("profile.title")}</h1>
        <Form onSubmit={updateUser} initialValues={user}>
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
            label={t("register.label.pseudo")}
            type="text"
            dataName="pseudo"
            required
          />
          <Button type="submit" name="link-game" isLoading={isLoading}>
            {t("buttons.save")}
          </Button>
        </Form>
      </SectionContent>
    )
  );
};
