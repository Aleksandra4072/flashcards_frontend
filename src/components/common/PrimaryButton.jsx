import { Button } from "antd";

import styles from "../../css/components/common/PrimaryButton.module.css";

const PrimaryButton = ({ label, onClick, style, htmlType }) => {
  return (
    <Button
      htmlType={htmlType}
      className={styles.button}
      style={style}
      type="primary"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
