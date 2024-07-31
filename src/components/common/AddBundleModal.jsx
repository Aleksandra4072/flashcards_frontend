import { useState } from "react";
import { Modal, Form, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PrimaryButton from "../../components/common/PrimaryButton";
import DefaultButton from "../../components/common/DefaultButton";
import FormInput from "../../components/common/FormInput";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import data from "../../assets/data/forms.json";

const openNotification = (message, type) => {
  notification[type]({
    message,
  });
};

const AddBundleModal = ({ fetchBundles }) => {
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    try {
      const result = await axiosPrivate.post("/bundle", values);
      console.log(result);
      await fetchBundles();
    } catch (e) {
      console.log(e);
      openNotification(e.response.data.detail, "error");
    }
  };

  return (
    <>
      <PrimaryButton
        onClick={showModal}
        label={
          <div>
            Create
            <PlusOutlined style={{ marginLeft: "10px" }} />
          </div>
        }
      />
      <Modal
        style={{ display: "flex", justifyContent: "center" }}
        title="Add New Bundle"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={<div />}
      >
        <Form onFinish={onFinish}>
          {data.add_bundle_form.map((item) => (
            <FormInput
              key={item.id}
              name={item.name}
              label={item.label}
              rules={item.rules}
              inputType={item.inputType}
            />
          ))}
          <Form.Item>
            <PrimaryButton htmlType="submit" label="Create a bundle" />
            <DefaultButton
              style={{ marginLeft: "30px" }}
              label="Cancel"
              onClick={() => setIsModalOpen(false)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddBundleModal;
