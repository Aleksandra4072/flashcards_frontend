import { notification } from "antd";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LinkButton from "../../components/common/LinkButton";

import styles from "../../css/components/common/DeletePopoverContent.module.css";

const openNotification = (message) => {
  notification.error({
    message,
  });
};

const DeletePopoverContent = ({ id, fetchBundles, hide }) => {
  const axiosPrivate = useAxiosPrivate();

  const deleteBundle = async (delete_id) => {
    try {
      const result = await axiosPrivate.delete(`/bundle/${delete_id}`);
      await fetchBundles();
    } catch (e) {
      openNotification(e.response.data.detail);
    }
  };

  return (
    <div>
      Are you sure you want to delete this bundle?
      <div className={styles.buttons}>
        <LinkButton label="Cancel" onClick={() => hide()} />
        <LinkButton label="Delete" onClick={() => deleteBundle(id)} />
      </div>
    </div>
  );
};

export default DeletePopoverContent;
