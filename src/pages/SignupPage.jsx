import { useNavigate } from 'react-router-dom';
import { LoginOutlined, HomeOutlined } from '@ant-design/icons';
import SignupCard from '../components/signup_page/SignupCard.jsx';

import styles from '../css/pages/Signup.module.css';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <LoginOutlined
        onClick={() => navigate('/login')}
        className={styles.rollback_icon}
      />
      <HomeOutlined
        onClick={() => {
          navigate('/');
        }}
        className={styles.home_icon}
      />
      <SignupCard />
    </div>
  );
};

export default Signup;