import { Card, Form, Input, Button } from "antd";
import FormInput from "../common/FormInput";
import { signup } from "../../utils/auth";

import data from "../../assets/data/forms.json";
import styles from "../../css/components/signup_page/SignupCard.module.css";

const SignupCard = () => {
  const onFinish = async (values) => {
    const response = await signup({
      email: values.email,
      password: values.password,
    });
    console.log(response?.message);
  };

  return (
    <Card className={styles.card}>
      <div className={styles.title}>Registration</div>
      <Form onFinish={onFinish}>
        {data.signup_form.map((item) => (
          <FormInput
            key={item.id}
            name={item.name}
            label={item.label}
            rules={item.rules}
            inputType={item.inputType}
          />
        ))}
        <Form.Item
          name="confirmPassword"
          validateFirst
          rules={[
            {
              required: true,
              message: "This field is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input
            style={{
              border: "2px solid #6fb3b8",
              width: "300px",
              color: "#6fb3b8",
            }}
            placeholder="Confirm Password"
            type="password"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#6fb3b8",
              width: "90px",
              color: "#f6f6f2",
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignupCard;
