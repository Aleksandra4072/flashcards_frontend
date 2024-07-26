import { useState } from 'react';
import { Modal } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';

import styles from '../../css/components/home_page/DeleteConfirmationModal.module.css';

const TaskDetailModal = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // Delete
    setOpen(false);
  };

  return (
    <div>
      <ArrowsAltOutlined onClick={showModal} className={styles.deleteIcon} />
      <Modal
        open={open}
        title="Delete Confirmation"
        onCancel={() => setOpen(false)}
        onOk={handleOk}
      >
        Do you really want to delete this task?
      </Modal>
    </div>
  );
};

export default TaskDetailModal;