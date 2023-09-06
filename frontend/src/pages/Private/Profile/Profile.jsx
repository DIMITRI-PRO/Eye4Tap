import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMessageContext } from "../../../context/MessageNotifContext";
import { useAuthContext } from "../../../context/AuthContext";
import {
  Form,
  FormItem,
  Button,
  SectionContent,
  Modal,
} from "../../../components/NinjaComp";
import { AlertTriangle } from "../../../assets/FeatherIcons";

import { ProfilePicture } from "./ProfilePicture/ProfilePicture";

export const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { responseMessage, messageStatus } = useMessageContext();
  const { requestAPI, authMemo, setUser, deleteCookie } = useAuthContext();
  const { id, user } = authMemo;

  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateUser = async (body) => {
    setIsLoading(true);
    try {
      const updatedData = body;
      updatedData.picture = profilePicture;
      const data = await requestAPI("patch", `users/${id}`, updatedData);

      setUser((prev) => {
        return { ...prev, ...updatedData };
      });

      messageStatus(data);
    } catch (e) {
      responseMessage(e);
    }
    setIsLoading(false);
  };

  const deleteUser = async () => {
    setIsLoading(true);
    try {
      await requestAPI("delete", `users/${id}`, {});
      navigate("/");
      deleteCookie();
    } catch (e) {
      responseMessage(e);
    }
    setIsLoading(false);
  };

  return (
    id && (
      <SectionContent pageName="profile">
        <Modal
          modalKey="profile"
          initialDisplay={false}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onValidate={() => deleteUser()}
        >
          <p>
            <AlertTriangle /> {t("profile.modal.message")}
          </p>
        </Modal>
        <h1>{t("profile.title")}</h1>
        <Form onSubmit={updateUser} initialValues={user}>
          <ProfilePicture
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
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
          <hr />
          <Button
            type="button"
            name="link-game"
            onClick={() => setIsModalOpen(true)}
            isLoading={isLoading}
          >
            {t("buttons.delete-account")}
          </Button>
        </Form>
      </SectionContent>
    )
  );
};
