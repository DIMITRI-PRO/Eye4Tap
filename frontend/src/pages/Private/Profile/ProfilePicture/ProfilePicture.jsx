import { useState } from "react";
import PropTypes from "prop-types";
import { useMessageContext } from "../../../../context/MessageNotifContext";
import { useAuthContext } from "../../../../context/AuthContext";
import { Button } from "../../../../components/NinjaComp";
import { User, RefreshCw, X } from "../../../../assets/FeatherIcons";

export const ProfilePicture = ({ setProfilePicture, profilePicture }) => {
  const { requestAPI, authMemo } = useAuthContext();
  const { user } = authMemo;
  const { responseMessage } = useMessageContext();

  const [isPictureLoading, setIsPictureLoading] = useState(false);
  const [displayDefault, setDisplayDefault] = useState(false);

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

  return (
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
  );
};

ProfilePicture.propTypes = {
  profilePicture: PropTypes.string,
  setProfilePicture: PropTypes.func,
};
ProfilePicture.defaultProps = {
  profilePicture: null,
  setProfilePicture: () => {},
};
