import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import CustomMenu from './CustomMenu.jsx';

import styles from '../../css/components/common/Header.module.css';

const { Header } = Layout;

const CustomHeader = ({ links }) => {
  const navigate = useNavigate();

  const isVisible = links.includes(useLocation().pathname);
  return isVisible ? (
    <div>
      <Header className={styles.header}>
        <HomeOutlined
          onClick={() => navigate('/')}
          className={styles.home_icon}
        />
        <CustomMenu />
      </Header>
    </div>
  ) : null;
};

export default CustomHeader;