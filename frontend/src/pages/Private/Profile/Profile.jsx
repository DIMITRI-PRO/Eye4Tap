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
import { User, RefreshCw, X } from "../../../assets/FeatherIcons";

export const Profile = () => {
  const { t } = useTranslation();
  const { responseMessage, messageStatus } = useMessageContext();
  const { requestAPI, authMemo, setUser } = useAuthContext();
  const { id, user } = authMemo;

  const [isLoading, setIsLoading] = useState(false);
  const [isPictureLoading, setIsPictureLoading] = useState(false);
  const [displayDefault, setDisplayDefault] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const getAnimeApi = async () => {
    setIsPictureLoading(true);
    try {
      const { data } = await requestAPI(`anime-api/`);
      setProfilePicture(data[0]?.image);
      setDisplayDefault(false);
    } catch (e) {
      responseMessage(e);
    }
    setIsPictureLoading(false);
  };

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

  return (
    id && (
      <SectionContent pageName="profile">
        <h1>{t("profile.title")}</h1>
        <Form onSubmit={updateUser} initialValues={user}>
          <div className="formitem-profile-picture">
            <div className="profile-picture-container">
              {(profilePicture || user?.picture) && !displayDefault ? (
                <img
                  className="ninja profile-picture"
                  src={profilePicture || user.picture}
                  alt="profile"
                />
              ) : (
                <User />
              )}
            </div>
            <div className="profile-picture-actions">
              <Button
                name="circle remove"
                icon={<X />}
                onClick={() => {
                  setProfilePicture(null);
                  setDisplayDefault(true);
                }}
              />
              <Button
                name="circle reload"
                icon={<RefreshCw />}
                isLoading={isPictureLoading}
                onClick={() => getAnimeApi()}
              />
            </div>
          </div>
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
