import React, { useState, Suspense } from 'react';
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Divider, Dropdown, Button,
} from 'antd';
import styled from 'styles/styled-components';
import { Link, useHistory } from 'react-router-dom';
import logoSm from './logo-nude.png';
import { useMe } from '../hooks/useUsers';
import Text from './Text';
import LoadingIndicator from './LoadingIndicator';
import SplashLoadingScreen from './SplashScreenLoading';
import store from 'store2';

const { Header, Sider, Content } = Layout;

// language=SCSS prefix=&{ suffix=}
const CustomHeader = styled(Header)`
    display: flex;
    justify-content: space-between;

    &.ant-layout-header {
      background: white;
      padding: 0 2em;
    }

    .ant-divider {
      height: 65px;
    }

    .notification {
      margin-right: 10px;
    }

    .right-content {
      display: flex;
    }

    .ant-badge {
      margin: 0 14px;
    }
`;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <Button
        type="link"
        onClick={() => {
          store.remove('jwtToken');
          window.location.href = '/login';
        }}
      >
        ออกจากระบบ
      </Button>
    </Menu.Item>
  </Menu>
);
const RightContent = () => {
  // const { data: userData } = useMe({ suspense: true });
  return (
    <div className="right-content">
      <Divider type="vertical" />
      <div className="profile">
        <Avatar style={{ backgroundColor: '#87d068', margin: '0 10px' }} icon="user" />
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            {'KR Express'}
          </a>
        </Dropdown>
      </div>
    </div>
  );
};
const DashboardLayout = ({ children }) => {
  const onError = (error) => {
    if (error.status === 401) {
      window.location.href = '/login';
    }
  };
  // const { data: userData, error } = useMe({ onError: onError });
  const userData = {
    username: 'xxx',
  };
  // console.log('error', error);
  const [collapsed, setCollapse] = useState(false);
  const toggle = () => {
    setCollapse(!collapsed);
  };
  return userData ? (
    <Layout>
      <Sider
        width="220px"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          {collapsed
            ? <img src={logoSm} className="logo-sm" width={32} />
            : <img className="logo-md" width={48} src={logoSm} />}
        </div>
        <Menu
          theme="dark"
          mode="inline"
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="code-sandbox" style={{ color: '#E5C37F' }} />
              <span>
              ภาพรวมระบบ
            </span>
            </Link>
          </Menu.Item>
          <Menu.SubMenu
            key="sub2"
            title={
              <span>
              <Icon type="box-plot" theme="filled" />
              <span>จัดการคลังสินค้า</span>
            </span>
            }
          >
            <Menu.Item key="/containers">
              <Link to="/containers">
                รายการตู้สินค้า
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <CustomHeader>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <Suspense fallback={<LoadingIndicator />}>
            <RightContent />
          </Suspense>
        </CustomHeader>
        <Content
          style={{
            padding: '1em',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  ) : <SplashLoadingScreen />;
};

export default DashboardLayout;
