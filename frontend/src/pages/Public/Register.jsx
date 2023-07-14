import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../context/MessageNotifContext";
import { useAuthContext } from "../../context/AuthContext";
import { Form, FormItem, Button } from "../../components/NinjaComp";
import { Eye, EyeOff } from "../../assets/FeatherIcons";

const Input = ({ ...props }) => {
  const [displayText, setDisplayText] = useState("text");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) setDisplayText("text");
    else setDisplayText(null);
  }, [show]);

  return (
    <div className="ninja form-item child-container">
      <input
        className={`ninja form-item child-${props?.name || ""}`}
        {...props}
        type={displayText || props?.type}
      />
      {props?.type === "password" && (
        <div
          className="ninja eye-password"
          aria-hidden="true"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? <Eye /> : <EyeOff />}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
};
Input.defaultProps = {
  name: "",
};

export const Register = () => {
  const { t } = useTranslation();
  const { responseMessage, errors } = useMessageContext();
  const navigate = useNavigate();
  const { requestAPI } = useAuthContext();

  const onSubmit = async (datas) => {
    try {
      const body = datas;
      await requestAPI("post", "register", body);
      navigate("/login");
    } catch (error) {
      responseMessage(error);
    }
  };

  return (
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
      <Button type="submit">{t("buttons.register-submit")}</Button>
    </Form>
  );
};
