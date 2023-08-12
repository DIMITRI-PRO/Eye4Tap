import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { User } from "../../../assets/FeatherIcons";

export const UserHeader = () => {
  const { authMemo } = useAuthContext();
  const { user } = authMemo;

  const title = (
    <Link id="user-profile-link" to="/profile">
      {user?.picture ? (
        <img
          className="menu profile-picture"
          src={user?.picture}
          alt={user?.pseudo}
        />
      ) : (
        <User width={30} height={30} />
      )}
      {user?.pseudo}
    </Link>
  );

  if (user?.pseudo) return title;

  return null;
};
