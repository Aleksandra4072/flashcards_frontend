import { useState } from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import PrimaryButton from "../../components/common/PrimaryButton";
import DefaultButton from "../../components/common/DefaultButton";

import styles from "../../css/components/home_page/DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log("Delete");
    setOpen(false);
  };

  return (
    <div>
      <CloseOutlined onClick={showModal} className={styles.deleteIcon} />
      <Modal
        open={open}
        title="Delete Confirmation"
        onCancel={() => setOpen(false)}
        onOk={handleOk}
        footer={[
          <DefaultButton
            key="cancel"
            label="Cancel"
            onClick={() => setOpen(false)}
          />,
          <PrimaryButton key="submit" label="Submit" onClick={handleOk} />,
        ]}
      >
        Do you really want to delete this task?
      </Modal>
    </div>
  );
};

export default DeleteConfirmationModal;
