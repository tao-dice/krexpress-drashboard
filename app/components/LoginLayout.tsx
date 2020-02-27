import React, { useState, memo } from 'react';
import {
  Layout,
} from 'antd';
import styled from 'styles/styled-components';
import { useHistory } from 'react-router-dom';

const {
  Content,
} = Layout;
// language=SCSS prefix=&{ suffix=}
const CustomLayout = styled(Layout)`
    padding-top: 6em;

    &.ant-layout {
      background: #F1F1F1;
      background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
      background-repeat: no-repeat;
      background-position: center 110px;
      background-size: 100%;
    }
`;
const LoginLayout = ({ children }) => {
  const history = useHistory();
  const [collapsed, setCollapse] = useState(false);
  const toggle = () => {
    setCollapse(!collapsed);
  };
  return (
    <CustomLayout>
      {children}
    </CustomLayout>
  );
};

export default memo(LoginLayout);
