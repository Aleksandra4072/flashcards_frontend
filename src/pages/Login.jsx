import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import LoginForm from '../components/login_page/LoginForm.jsx';

import loginImg from '../assets/images/login.webp';
import styles from '../css/pages/Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <HomeOutlined
        onClick={() => navigate('/')}
        className={styles.home_icon}
      />
      <div className={styles.left}>
        <LoginForm />
      </div>
      <div className={styles.right}>
        <Image
          alt="Image"
          src={loginImg}
          style={{ height: '100vh' }}
          preview={false}
        />
      </div>
    </div>
  );
};

export default Login;
