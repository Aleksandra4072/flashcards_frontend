import { Button } from "antd";

import styles from "../../css/components/common/DefaultButton.module.css";

const DefaultButton = ({ style, onClick, label }) => {
  return (
    <Button className={styles.button} style={style} onClick={onClick}>
      {label}
    </Button>
  );
};

export default DefaultButton;
