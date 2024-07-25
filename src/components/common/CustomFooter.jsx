import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import styles from '../../css/components/common/Footer.module.css';

const { Footer } = Layout;

const CustomFooter = ({ links }) => {
  const isVisible = links.includes(useLocation().pathname);
  return isVisible ? (
    <Footer className={styles.footer}>
      Footer
    </Footer>
  ) : null;
};

export default CustomFooter;