import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image, notification } from "antd";
import { login, decodeToken } from "../../utils/auth";
import FormInput from "../common/FormInput";
import AuthContext from "../../context/AuthProvider";
import PrimaryButton from "../../components/common/PrimaryButton";
import LinkButton from "../../components/common/LinkButton";

import loginAvatar from "../../assets/images/login_avatar.svg";
import data from "../../assets/data/forms.json";
import styles from "../../css/components/login_page/LoginForm.module.css";


const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const token = await login(values);
      const response = await decodeToken(token.data.access_token);
      setAuth({
        email: response.data.token_payload.sub,
        roles: response.data.token_payload.roles,
        accessToken: token.data.access_token,
      });
      navigate("/");
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div>
      <div className={styles.img_holder}>
        <Image
          alt={"Avatar"}
          src={loginAvatar}
          width={100}
          className={styles.img}
          preview={false}
        />
      </div>
      <Form onFinish={onFinish}>
        {data.login_form.map((item) => (
          <FormInput
            key={item.id}
            name={item.name}
            label={item.label}
            rules={item.rules}
            inputType={item.inputType}
          />
        ))}
        <Form.Item>
          <PrimaryButton
            htmlType="submit"
            label="Login"
            style={{ width: "100%" }}
          />
          <LinkButton
            label="Create an account"
            onClick={() => navigate("/signup")}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
