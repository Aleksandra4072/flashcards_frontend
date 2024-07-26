import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import CustomHeader from '../common/CustomHeader.jsx';
import CustomFooter from '../common/CustomFooter.jsx';

const CustomLayout = () => {
  const { Content } = Layout;
  const links = ['/', '/my_page', '/my_tasks'];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CustomHeader links={links} />
      <Content>
        <main className="App">
          <Outlet />
        </main>
      </Content>
      <CustomFooter links={links} />
    </Layout>
  );
};

export default CustomLayout;
