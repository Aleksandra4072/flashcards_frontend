import { Button } from "antd";

import styles from "../../css/components/common/LinkButton.module.css";

const LinkButton = ({ style, onClick, label }) => {
  return (
    <Button
      type="link"
      className={styles.button}
      style={style}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default LinkButton;
