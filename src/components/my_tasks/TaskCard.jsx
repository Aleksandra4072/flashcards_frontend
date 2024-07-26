import { Card } from 'antd';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import TaskDetailModal from './TaskDetailModal';

import styles from '../../css/components/home_page/TaskCard.module.css';

const TaskCard = ({ title }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        <div>{title}</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <DeleteConfirmationModal />
          <TaskDetailModal />
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;