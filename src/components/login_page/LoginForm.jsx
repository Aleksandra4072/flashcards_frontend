import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image, Button } from "antd";
import { login, decodeToken } from "../../utils/auth";
import FormInput from "../common/FormInput";
import AuthContext from "../../context/AuthProvider";

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
    } catch (error) {
      console.log(error);
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
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "90px",
              backgroundColor: "#6fb3b8",
              color: "#f6f6f2",
            }}
          >
            Login
          </Button>
          <Button
            type="primary"
            style={{
              marginLeft: "120px",
              width: "90px",
              backgroundColor: "#6fb3b8",
              color: "#f6f6f2",
            }}
            onClick={() => navigate("/signup")}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
