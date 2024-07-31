import { useState } from "react";
import { Card, Popover } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import DeletePopoverContent from "./DeletePopoverContent";

import styles from "../../css/components/common/BundleCard.module.css";

const BundleCard = ({ id, title, description, fetchBundles }) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Card
      className={styles.bundleCard}
      type="inner"
      title={title}
      extra={
        <Popover
          content={
            <DeletePopoverContent
              id={id}
              fetchBundles={fetchBundles}
              hide={hide}
            />
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <CloseOutlined className={styles.close} />
        </Popover>
      }
    >
      {description}
    </Card>
  );
};

export default BundleCard;
