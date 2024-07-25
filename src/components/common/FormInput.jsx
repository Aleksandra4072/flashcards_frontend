import { Form, Input } from 'antd';

import styles from '../../css/components/common/FormInput.module.css';

const FormInput = ({ name, label, rules, inputType }) => {
  return (
    <Form.Item name={name} rules={rules} validateFirst>
      <Input
        style={{ border: '2px solid #6fb3b8' }}
        placeholder={label}
        className={styles.input}
        type={inputType}
      />
    </Form.Item>
  );
};

export default FormInput;
